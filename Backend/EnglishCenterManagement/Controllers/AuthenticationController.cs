using EnglishCenterManagement.Models;
using EnglishCenterManagement.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EnglishCenterManagement.Interfaces;
using AutoMapper;
using System.Text.RegularExpressions;
using System.Security.Claims;

namespace EnglishCenterManagement.Controllers
{
    [Route("api/")]
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

        // POST: /register
        [HttpPost("register")]
        [AllowAnonymous]
        public ActionResult Register([FromBody] RegisterDto newUser)
        {
            if (newUser == null)
            {
                return BadRequest();
            }
            // check login name = pwd ?
            if (newUser.Password == newUser.LoginName)
            {
                return BadRequest("Password and username cannot be the same");
            }
            // check login name
            bool checkUserExist = _authenRepository.CheckUserNameExist(newUser.LoginName);
            if (checkUserExist)
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
            // check email
            if (newUser.Email != null)
            {
                Regex regexEmail = new Regex("^\\S+@\\S+\\.\\S+$");
                if (!regexEmail.IsMatch(newUser.Email))
                {
                    return BadRequest("Email Invalid");
                }
                bool checkEmailExist = _authenRepository.CheckEmailExists(newUser.Email);
                if (checkEmailExist)
                {
                    return Conflict("Email exists");
                }
            }
            // add info to database
            newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
            var userProfile = _mapper.Map<UserInfoModel>(newUser);
            if (!_authenRepository.CreateUserProfile(userProfile))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status201Created);
        }

        // POST: /login
        [HttpPost("login")]
        [AllowAnonymous]
        public ActionResult Login([FromBody] LoginDto userLogin)
        {
            if (userLogin == null)
            {
                return BadRequest("Invalid client request");
            }
            // check username exist and get user by loginname
            var user = _authenRepository.GetUserByLoginName(userLogin.LoginName);
            if (user == null)
            {
                return Conflict("UserName not exists");
            }
            // check pwd 
            bool checkPassword = BCrypt.Net.BCrypt.Verify(userLogin.Password, user.Password);
            if (!checkPassword)
            {
                return BadRequest("Wrong Password");
            }
            // generate token
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userLogin.LoginName),
                new Claim("UserId", user.Id.ToString())
            };
            var accessToken = _authenRepository.GenerateAccessToken(claims);
            // generate refresh token
            var refreshToken = _authenRepository.GenerateRefreshToken();
            // add or update DB
            var refreshTokenDto = new RefreshTokenDto
            {
                RefreshToken = refreshToken,
                Id = user.Id,
            };
            var refreshTokenMap = _mapper.Map<RefreshTokenModel>(refreshTokenDto);
            bool storeToken = _authenRepository.CheckTokenExist(refreshTokenMap) ?
                _authenRepository.UpdateCurrentUserToken(refreshTokenMap) :
                _authenRepository.CreateNewUserToken(refreshTokenMap);
            if (!storeToken)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok(new TokenDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            });
        }

        // POST: /refreshToken
        [HttpPost("refresh-token")]
        [AllowAnonymous]
        public ActionResult RefreshToken([FromBody] TokenDto currentToken)
        {
            if (currentToken == null)
            {
                return BadRequest("Invalid client request");
            }
            var principal = _authenRepository.GetPrincipalFromExpiredToken(currentToken.AccessToken);

            // Check user exists
            var user = _authenRepository.GetUserByLoginName(principal.Identity.Name);
            if (user == null)
            {
                return BadRequest("Invalid client request");
            }
            // Check Refresh Token va expired cua Refresh Token
            var token = _authenRepository.GetTokenById(user.Id);
            if (!token.RefreshToken.Equals(currentToken.RefreshToken))
            {
                return Unauthorized("Invalid Refresh Token."); // => Ma Refresh Token ko khop
            }
            if (token.ExpiredAt < DateTime.Now)
            {
                return Unauthorized("Refresh Token expired."); // => Phai dang nhap lai
            }
            // Update Token
            var newAccessToken = _authenRepository.GenerateAccessToken(principal.Claims);
            var newRefreshToken = _authenRepository.GenerateRefreshToken();
            var refreshTokenDto = new RefreshTokenDto
            {
                RefreshToken = newRefreshToken,
                Id = token.Id,
            };
            _authenRepository.DeleteCurrentToken(token);
            var refreshTokenMap = _mapper.Map<RefreshTokenModel>(refreshTokenDto);
            if (!_authenRepository.CreateNewUserToken(refreshTokenMap))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(new TokenDto
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            });
        }
    }
}
