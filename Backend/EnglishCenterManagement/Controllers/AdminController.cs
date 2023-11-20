using AutoMapper;
using EnglishCenterManagement.Common.Helpers;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.AuthenticationDtos;
using EnglishCenterManagement.Dtos.UserInfoDtos;
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
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public AdminController(
            IUserRepository userRepository,
            IMapper mapper
            )
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        // GET: /admins
        [HttpGet("admins")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult<PagedResponse> GetAllAdmins(string? search, int page = 1, int pageSize = 20)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 || pageSize < 1 ? 20 : pageSize;

            var listAdmins = _userRepository.GetAllAdmins(search, page, pageSize);
            var mappedListAdmins = _mapper.Map<List<BasicUserInfoDto>>(listAdmins.Data);
            mappedListAdmins.ForEach((item) =>
            {
                var avatar = _userRepository.GetUserAvatar(item.Id);
                item.Avatar = _mapper.Map<AvatarDto>(avatar);
            });
            listAdmins.Data = mappedListAdmins;

            return Ok(listAdmins);
        }

        // GET: /admin/5
        [HttpGet("admin/{id}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult<UserProfileDetailDto> GetAdminDetail(int id)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            var getUserById = _userRepository.GetUserByUserId(id);
            if (getUserById == null || getUserById.Role != RoleType.Admin)
            {
                return NotFound(new ApiReponse(647));
            }
            var adminProfileMap = _mapper.Map<UserProfileDetailDto>(getUserById);

            var avatar = _userRepository.GetUserAvatar(id);
            var mappedAvatar = _mapper.Map<AvatarDto>(avatar);

            adminProfileMap.Avatar = mappedAvatar;

            return Ok(new ApiReponse(adminProfileMap));
        }

        // POST: /create-admin
        [HttpPost("create-admin")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult CreateAdmin([FromBody] RegisterDto newUser)
        {
            if (newUser == null)
            {
                return BadRequest(new ApiReponse(600));
            }

            // check login name = pwd ?
            if (newUser.Password == newUser.LoginName)
            {
                return BadRequest(new ApiReponse(609));
            }

            // check login name
            bool checkUserExist = _userRepository.CheckUserNameExist(newUser.LoginName);
            if (checkUserExist)
            {
                return Conflict(new ApiReponse(607));
            }

            Validation validateUserInfoUtils = new Validation();

            // check phone number
            if (!validateUserInfoUtils.IsValidPhoneNumber(newUser.PhoneNumber))
            {
                return BadRequest(new ApiReponse(614));
            }

            // check pwd: Minimum eight characters, at least one uppercase & lowercase letter and one number
            if (!validateUserInfoUtils.IsValidPassword(newUser.Password))
            {
                return BadRequest(new ApiReponse(610));
            }

            // check gender
            if (!(newUser.Gender == GenderType.Male | newUser.Gender == GenderType.Female | newUser.Gender == null))
            {
                return BadRequest(new ApiReponse(617));
            }

            // check email
            if (newUser.Email != null)
            {
                if (!validateUserInfoUtils.IsValidEmail(newUser.Email))
                {
                    return BadRequest(new ApiReponse(615));
                }
                bool checkEmailExist = _userRepository.CheckEmailExists(newUser.Email);
                if (checkEmailExist)
                {
                    return Conflict(new ApiReponse(616));
                }
            }

            // add info to database
            newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
            var userProfile = _mapper.Map<UserInfoModel>(newUser);
            userProfile.Role = RoleType.Admin;
            if (!_userRepository.CreateUserProfile(userProfile))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status201Created);
        }

        // PUT: /edit-admin/5
        [HttpPut("edit-admin/{id}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult UpdateAdmin([FromBody] EditUserInfo updatedAdmin, int id)
        {
            var user = GetUserByClaim();
            if (user == null) return Unauthorized();
            if (user.UserStatus == UserStatusType.Lock) return Unauthorized(new ApiReponse(999));

            if (updatedAdmin == null) return BadRequest(new ApiReponse(600));

            var getUserById = _userRepository.GetUserByUserId(id);
            if (getUserById == null) return NotFound(new ApiReponse(647));
           
            // Check login name exist except current user's login name (get user by name and userid != current userId)
            if (_userRepository.GetUserHasSameLoginName(id, updatedAdmin.LoginName) != null)
            {
                return Conflict(new ApiReponse(607));
            }

            Validation validateUserInfoUtils = new Validation();

            if (updatedAdmin.Password == null)
            {
                updatedAdmin.Password = getUserById.Password;
            }
            else {
                // check login name = pwd ?
                if (updatedAdmin.Password == updatedAdmin.LoginName)
                {
                    return BadRequest(new ApiReponse(609));
                }

                // check pwd: Minimum eight characters, at least one uppercase & lowercase letter and one number
                if (!validateUserInfoUtils.IsValidPassword(updatedAdmin.Password))
                {
                    return BadRequest(new ApiReponse(610));
                }

                updatedAdmin.Password = BCrypt.Net.BCrypt.HashPassword(updatedAdmin.Password);
            }

            // check phone number
            if (!validateUserInfoUtils.IsValidPhoneNumber(updatedAdmin.PhoneNumber))
            {
                return BadRequest(new ApiReponse(614));
            }

            // check gender
            if (!(updatedAdmin.Gender == GenderType.Male | updatedAdmin.Gender == GenderType.Female | updatedAdmin.Gender == null))
            {
                return BadRequest(new ApiReponse(617));
            }

            // Check email exists except current user's email (get user by email and userid != current userId)
            if (updatedAdmin.Email != null)
            {
                if (!validateUserInfoUtils.IsValidEmail(updatedAdmin.Email))
                {
                    return BadRequest(new ApiReponse(615));
                }
                if (_userRepository.GetUserHasSameEmail(id, updatedAdmin.Email) != null)
                {
                    return Conflict(new ApiReponse(616));
                }
            }

            // add info to database
            var updatedAdminMap = _mapper.Map(updatedAdmin, getUserById);
            if (!_userRepository.UpdateUserProfile(updatedAdminMap))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status201Created);
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
