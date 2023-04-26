using AutoMapper;
using EnglishCenterManagement.Common.Constants;
using EnglishCenterManagement.Common.Helpers;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Dtos;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
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

        // DELETE: /remove-myavatar
        [HttpDelete("remove-myavatar")]
        [Authorize]
        public ActionResult DeleteAvatar()
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return BadRequest();
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

        // PUT: /change-avatar
        // TODO: limit formfile 
        // Hiện đang lôi nếu > 30.000.000 bytes (< 30.000.000 bytes và > 1.048.576 bytes mới trả về lỗi ở API)
        // Failed to read the request form. Request body too large. The max request body size is 30.000.000 bytes.
        [HttpPut("change-avatar")]
        [Authorize]
        public ActionResult UpdateAvatar(IFormFile formFile)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return BadRequest();
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

        // GET: /myprofile
        [HttpGet("myprofile")]
        [Authorize]
        public ActionResult<UserProfileHasAvatarDto> GetMyProfile()
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return BadRequest();
            }
            var userProfileMap = _mapper.Map<UserProfileHasAvatarDto>(user);

            return Ok(new ApiReponse(userProfileMap));
        }

        // PUT: /change-information
        [HttpPut("change-information")]
        [Authorize]
        public ActionResult ChangeInformation([FromBody] BasicUserInfoDto updatedProfile)
        {
            // Get User by Claims
            var user = GetUserByClaim();
            if (user == null)
            {
                return BadRequest();
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

        // PUT: /change-password
        [HttpPut("change-password")]
        [Authorize]
        public ActionResult ChangePassword([FromBody] ChangePasswordDto passwordDto)
        {
            // Get User by Claims
            var user = GetUserByClaim();
            if (user == null)
            {
                return BadRequest();
            }
            //
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
