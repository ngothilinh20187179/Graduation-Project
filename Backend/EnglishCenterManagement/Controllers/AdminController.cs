using AutoMapper;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EnglishCenterManagement.Controllers
{
    [Route("api/")]
    [ApiController]
    public class AdminController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        public AdminController(
            IMapper mapper,
            IUserRepository userRepository
            )
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        // GET: /users
        [HttpGet("users")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult<PagedResponse> GetAllUsers(string? search, RoleType? role, int page = 1, int pageSize = 20)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return BadRequest();
            }

            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 ? 20 : pageSize;

            var listUsers = _userRepository.GetAllUsers(search, role, page, pageSize);
            var mappedListUsers = _mapper.Map<List<UserProfileHasAvatarDto>>(listUsers.Data);
            listUsers.Data = mappedListUsers;

            return Ok(listUsers);
        }

        // PUT: /control-access/5
        [HttpPut("allow-access/{id}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult SetRoleForNewRegister(int id, [FromBody] RoleDto updateRole)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return BadRequest();
            }

            if (user.Id == id)
            {
                return BadRequest(new ApiReponse(621));
            }

            var getUserById = _userRepository.GetUserByUserId(id);
            if (getUserById == null)
            {
                return NotFound(new ApiReponse(606));
            }

            // Change role -> anh huong toi cac bang student, teacher, staff,... ?
            // => set role cho user register (co role = RestrictedRole)
            if (getUserById.Role != RoleType.RestrictedRole)
            {
                return Conflict(new ApiReponse(622));
            }

            if (!Enum.IsDefined(typeof(RoleType), updateRole.Role))
            {
                return BadRequest(new ApiReponse(619));
            }

            var updatedUserRole = _mapper.Map(updateRole, getUserById);
            if (!_userRepository.UpdateUserProfile(updatedUserRole))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status204NoContent);
        }

        // GET: /user-role/5
        [HttpGet("user-role/{id}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult<RoleDto> GetUserRole(int id)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return BadRequest();
            }

            if (user.Id == id)
            {
                return Ok(new ApiReponse(new RoleDto
                {
                    Role = user.Role
                }));
            }

            var getUserById = _userRepository.GetUserByUserId(id);
            if (getUserById == null)
            {
                return NotFound(new ApiReponse(606));
            }

            var userRoleMap = _mapper.Map<RoleDto>(getUserById);

            return Ok(new ApiReponse(userRoleMap));
        }

        // GET: /profile/5
        [HttpGet("profile/{id}")]
        [Authorize(Roles = "Admin, Staff, Teacher")]
        public ActionResult<UserProfileDto> GetUserProfile(int id)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return BadRequest();
            }
            var getUserById = _userRepository.GetUserByUserId(id);
            if (getUserById == null)
            {
                return NotFound(new ApiReponse(606));
            }
            var userProfileMap = _mapper.Map<UserProfileDto>(getUserById);

            return Ok(new ApiReponse(userProfileMap));
        }

        // DELETE: /delete-user/5
        [HttpDelete("delete-user/{id}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult DeleteUser(int id)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return BadRequest();
            }

            if (user.Id == id)
            {
                return BadRequest(new ApiReponse(620));
            }

            var deletedUser = _userRepository.GetUserByUserId(id);
            if (deletedUser == null)
            {
                return NotFound(new ApiReponse(606));
            }

            // TODO: conditions
            // TODO: chi xoa duoc user (student, teacher,...) chua tham gia vao class nao (=> Thay vi delete co the set status cho user do)
            // TODO: check user exist, get role (vd role = student => check table StudentClass xem co studentId hay ko)

            if (!_userRepository.DeleteUser(deletedUser))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status204NoContent);
        }

        private UserInfoModel? GetUserByClaim()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userId = identity?.Claims.FirstOrDefault(x => x.Type == "UserId")?.Value;
            if (userId != null)
            {
                return _userRepository.GetUserByUserId(int.Parse(userId));
            }
            return null;
        }
    }
}
