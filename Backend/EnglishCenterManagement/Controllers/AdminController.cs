using AutoMapper;
using EnglishCenterManagement.Common.Helpers;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Dtos.AuthenticationDtos;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

    }
}
