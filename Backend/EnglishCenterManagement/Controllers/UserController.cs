using AutoMapper;
using EnglishCenterManagement.Common.Helpers;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Dtos;
using EnglishCenterManagement.Interfaces;
using EnglishCenterManagement.Models;
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

        // GET: /profile-me
        [HttpGet("myprofile")]
        //[Authorize]
        public ActionResult<UserInfoDto> GetMyProfile()
        {
            return Ok(new ApiReponse(1000));
        }

        // GET: /profile/5
        [HttpGet("profile/{id}")]
        [AllowAnonymous]
        public ActionResult GetUserProfile()
        {
            return Ok();
        }

        // PUT: /change-information
        [HttpPut("change-information")]
        [Authorize]
        public ActionResult ChangeInformation([FromBody] UserInfoDto updatedProfile)
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
