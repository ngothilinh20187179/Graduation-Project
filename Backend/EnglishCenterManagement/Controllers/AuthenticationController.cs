using EnglishCenterManagement.Models;
using EnglishCenterManagement.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EnglishCenterManagement.Interfaces;
using AutoMapper;
using System.Text.RegularExpressions;

namespace EnglishCenterManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private readonly IAuthenticationRepository _authenRepository;
        private readonly IMapper _mapper;
        public AuthenticationController(
            IAuthenticationRepository authenRepository,
            IMapper mapper
            )
        {
            _authenRepository = authenRepository;
            _mapper = mapper;
        }

        // POST: /Authentication/register
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult> Register([FromBody] RegisterDto newUser)
        {
            if (newUser == null)
            {
                return BadRequest();
            }
            // check login name
            bool checkUserExist = _authenRepository.CheckUserNameExist(newUser.LoginName);
            if(checkUserExist)
            {
                return Conflict("UserName exists");
            }
            // check phone number
            Regex regexPhoneNumber = new Regex("^[0-9]+$");
            if (!regexPhoneNumber.IsMatch(newUser.PhoneNumber))
            {
                return BadRequest("PhoneNumber Invalid");
            }
            // check pwd: Minimum eight characters, at least one uppercase & lowercase letter and one number
            Regex regexPassword = new Regex("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
            if (!regexPassword.IsMatch(newUser.Password))
            {
                return BadRequest("Password Invalid: Minimum eight characters, at least one uppercase & lowercase letter and one number");
            }

            // add info to database
            var userProfile = _mapper.Map<UserInfoModel>(newUser);
            _authenRepository.CreateUserProfile(userProfile);
            var credential = _mapper.Map<CredentialModel>(newUser);
            credential.Id = userProfile.Id;
            credential.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
            _authenRepository.CreateCredential(credential);

            return StatusCode(StatusCodes.Status201Created);
        }

        // POST: /Authentication/login
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<TokensResult>> Login([FromBody] LoginDto userLogin)
        {
            if (userLogin == null)
            {
                return BadRequest();
            }
            // check user exist and get user by loginname
            var credential = _authenRepository.GetCredentialByLoginName(userLogin.LoginName);
            if (credential == null)
            {
                return Conflict("UserName not exists");
            }
            // check pwd 
            bool checkPassword = BCrypt.Net.BCrypt.Verify(userLogin.Password, credential.Password);
            if (!checkPassword)
            {
                return BadRequest("Wrong Password");
            }
            // generate token
            var token = _authenRepository.GenerateToken(userLogin);

            var tokensResult = new TokensResult()
            {
                UserId = credential.Id,
                AccessToken = token,
            };

            // TODO: add token to db

            return tokensResult;
        }
    }
}
