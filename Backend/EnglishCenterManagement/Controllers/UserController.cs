using AutoMapper;
using EnglishCenterManagement.Common.Constants;
using EnglishCenterManagement.Common.Helpers;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.UserInfoDto;
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
    public class UserController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        public UserController(
            IMapper mapper,
            IUserRepository userRepository
            )
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        // GET: /user-role/5
        [HttpGet("user-role/{id}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult<RoleDto> GetUserRole(int id)
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

        // PUT: /control-access/5
        // TODO: solve problem => bỏ API control access (set role)
        //[HttpPut("allow-access/{id}")]
        //[Authorize(Roles = nameof(RoleType.Admin))]
        //public ActionResult SetRoleForNewRegister(int id, [FromBody] RoleDto updateRole)
        //{
        //    var user = GetUserByClaim();
        //    if (user == null)
        //    {
        //        return Unauthorized();
        //    }


        //    if (user.Id == id)
        //    {
        //        return BadRequest(new ApiReponse(621));
        //    }

        //    var getUserById = _userRepository.GetUserByUserId(id);
        //    if (getUserById == null)
        //    {
        //        return NotFound(new ApiReponse(606));
        //    }

        //    // Change role -> anh huong toi cac bang student, teacher, staff,... ?
        //    // => set role cho user register (co role = RestrictedRole)
        //    if (getUserById.Role != RoleType.RestrictedRole)
        //    {
        //        return Conflict(new ApiReponse(622));
        //    }

        //    if (!Enum.IsDefined(typeof(RoleType), updateRole.Role))
        //    {
        //        return BadRequest(new ApiReponse(619));
        //    }

        //    // TODO: update role UserTable va add user vao bang tuong ung
        //    // Vấn đề: mỗi role có info riêng require
        //    var updatedUserRole = _mapper.Map(updateRole, getUserById);
        //    if (!_userRepository.UpdateUserProfile(updatedUserRole))
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError);
        //    }

        //    return StatusCode(StatusCodes.Status204NoContent);
        //}

        // TODO: PUT: /restricted-user/{id}
        // Khóa/mở khóa tài khoản user                                                                                      

        // checked
        // PUT: /restricted-user/5
        [HttpPut("restricted-user/{id}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult RestrictedAccount([FromBody] UserStatusType userStatusType, int id)
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
            if (user.Id == id)
            {
                return BadRequest(new ApiReponse(644));
            }
            if (!Enum.IsDefined(typeof(UserStatusType), userStatusType))
            {
                return BadRequest();
            }
            var account = _userRepository.GetUserByUserId(id);
            if (account == null)
            {
                return NotFound(new ApiReponse(606));
            }
            account.UserStatus = userStatusType;
            _userRepository.UpdateUserProfile(account);

            return StatusCode(StatusCodes.Status204NoContent);
        }

        // DELETE: /delete-user/5
        // TODO
        [HttpDelete("delete-user/{id}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult DeleteUser(int id)
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
            // TODO: xóa đc admin, staff; nếu user là (student, teacher) tham gia vao class nao do (=> Thay vi delete co the set status cho user do)
            // TODO: check user exist, get role (vd role = student => check table StudentClass xem co studentId hay ko)

            if (!_userRepository.DeleteUser(deletedUser))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status204NoContent);
        }

        // checked
        // GET: /myprofile
        [HttpGet("myprofile")]
        [Authorize]
        public ActionResult<UserProfileDetailDto> GetMyProfile()
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
            var userProfileMap = _mapper.Map<UserProfileDetailDto>(user);

            var avatar = _userRepository.GetUserAvatar(user.Id);
            var mappedAvatar = _mapper.Map<AvatarDto>(avatar);

            userProfileMap.Avatar = mappedAvatar;

            return Ok(new ApiReponse(userProfileMap));
        }

        // checked
        // GET: /myavatar
        [HttpGet("myavatar")]
        [Authorize]
        public ActionResult<AvatarDto> GetMyAvatar()
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

            var avatar = _userRepository.GetUserAvatar(user.Id);
            var mappedAvatar = _mapper.Map<AvatarDto>(avatar);

            return Ok(new ApiReponse(mappedAvatar));
        }

        // checked
        // PUT: /change-information
        [HttpPut("change-information")]
        [Authorize]
        public ActionResult ChangeInformation([FromBody] UserInfoDto updatedProfile)
        {
            // Get User by Claims
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            // 
            if (updatedProfile == null)
            {
                return BadRequest();
            }

            // Check login name exist except current user's login name (get user by name and userid != current userId)
            if (_userRepository.GetUserHasSameLoginName(user.Id, updatedProfile.LoginName) != null)
            {
                return Conflict(new ApiReponse(607));
            }

            Validation validateUserInfoUtils = new Validation();

            // Valid Phonenumber
            if (!validateUserInfoUtils.IsValidPhoneNumber(updatedProfile.PhoneNumber))
            {
                return BadRequest(new ApiReponse(614));
            }

            // Check email exists except current user's email (get user by email and userid != current userId)
            if (updatedProfile.Email != null)
            {
                if (!validateUserInfoUtils.IsValidEmail(updatedProfile.Email))
                {
                    return BadRequest(new ApiReponse(615));
                }
                if (_userRepository.GetUserHasSameEmail(user.Id, updatedProfile.Email) != null)
                {
                    return Conflict(new ApiReponse(616));
                }
            }

            var updatedProfileMap = _mapper.Map(updatedProfile, user);
            if (!_userRepository.UpdateUserProfile(updatedProfileMap))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status204NoContent);
        }

        // checked
        // PUT: /change-password
        [HttpPut("change-password")]
        [Authorize]
        public ActionResult ChangePassword([FromBody] ChangePasswordDto passwordDto)
        {
            // Get User by Claims
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            if (passwordDto == null)
            {
                return BadRequest();
            }
            // Check old pwd
            bool checkPassword = BCrypt.Net.BCrypt.Verify(passwordDto.OldPassword, user.Password);
            if (!checkPassword)
            {
                return BadRequest(new ApiReponse(610));
            }
            //Check password old = new ?
            if (passwordDto.Password.Equals(passwordDto.OldPassword))
            {
                return BadRequest(new ApiReponse(613));
            }
            // Valid new password
            Validation validateUserInfoUtils = new Validation();
            if (!validateUserInfoUtils.IsValidPassword(passwordDto.Password))
            {
                return BadRequest(new ApiReponse(611));
            }
            // Check new password = confirm password ?
            if (!passwordDto.Password.Equals(passwordDto.ConfirmPassword))
            {
                return BadRequest(new ApiReponse(612));
            }
            // Store db
            var hashedPwd = BCrypt.Net.BCrypt.HashPassword(passwordDto.Password);
            user.Password = hashedPwd;
            if (!_userRepository.UpdateUserProfile(user))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status204NoContent);
        }
        
        // checked
        // PUT: /change-avatar
        // The max request body size is 30.000.000 bytes.
        [HttpPut("change-avatar")]
        [Authorize]
        public ActionResult UpdateAvatar(IFormFile formFile)
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
            // Check size image > 1MB = 1024KB = 1048576 bytes ?
            if (formFile.Length > 1048576)
            {
                return BadRequest(new ApiReponse(624));
            }

            // check extension is image extension ?
            var extension = Path.GetExtension(formFile.FileName).ToLowerInvariant();
            var mediaType = FormFileContants.Extension.GetValueOrDefault(extension);
            if (mediaType == null)
            {
                return BadRequest(new ApiReponse(623));
            }

            // image -> text
            using var memoryStream = new MemoryStream();
            formFile.CopyToAsync(memoryStream);
            var data = memoryStream.ToArray();

            // exists => update
            // not exists => post
            var avatar = new AvatarModel
            {
                MediaType = mediaType,
                Data = data,
                Id = user.Id
            };

            bool uploadImage = _userRepository.CheckAvatarExists(user.Id) ?
                _userRepository.UpdateAvatar(avatar) :
                _userRepository.AddAvatar(avatar);

            if (!uploadImage)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return NoContent();
        }

        // checked
        // DELETE: /remove-myavatar
        [HttpDelete("remove-myavatar")]
        [Authorize]
        public ActionResult DeleteAvatar()
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
            var avatar = _userRepository.GetUserAvatar(user.Id);
            if (avatar == null)
            {
                return BadRequest(new ApiReponse(625));
            }

            if (!_userRepository.DeleteAvatar(avatar))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return NoContent();
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
