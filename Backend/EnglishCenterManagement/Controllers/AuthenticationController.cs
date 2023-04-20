using EnglishCenterManagement.Models;
using EnglishCenterManagement.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EnglishCenterManagement.Interfaces;
using AutoMapper;
using System.Security.Claims;
using EnglishCenterManagement.Data;
using System.IdentityModel.Tokens.Jwt;
using EnglishCenterManagement.Common.Helpers;

namespace EnglishCenterManagement.Controllers
{
    [Route("api/")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private readonly IAuthenticationRepository _authenRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _dataContext;
        public AuthenticationController(
            IAuthenticationRepository authenRepository,
            IUserRepository userRepository,
            IMapper mapper,
            DataContext dataContext
            )
        {
            _authenRepository = authenRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _dataContext = dataContext;
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
            bool checkUserExist = _userRepository.CheckUserNameExist(newUser.LoginName);
            if (checkUserExist)
            {
                return Conflict("UserName exists");
            }

            ValidateUserInfoUtils validateUserInfoUtils = new ValidateUserInfoUtils();

            // check phone number
            if (!validateUserInfoUtils.IsValidPhoneNumber(newUser.PhoneNumber))
            {
                return BadRequest("PhoneNumber Invalid");
            }

            // check pwd: Minimum eight characters, at least one uppercase & lowercase letter and one number
            if (!validateUserInfoUtils.IsValidPassword(newUser.Password))
            {
                return BadRequest("Password Invalid: Minimum eight characters, at least one uppercase & lowercase letter and one number");
            }

            // check email
            if (newUser.Email != null)
            {
                if (!validateUserInfoUtils.IsValidEmail(newUser.Email))
                {
                    return BadRequest("Email Invalid");
                }
                bool checkEmailExist = _userRepository.CheckEmailExists(newUser.Email);
                if (checkEmailExist)
                {
                    return Conflict("Email exists");
                }
            }

            // add info to database
            newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
            var userProfile = _mapper.Map<UserInfoModel>(newUser);
            if (!_userRepository.CreateUserProfile(userProfile))
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
            var user = _userRepository.GetUserByLoginName(userLogin.LoginName);
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
            var roleClaims = _dataContext.Roles
                .Where(r => r.UserId == user.Id)
                .Select(x => new Claim(ClaimTypes.Role, x.Type.ToString()));
            claims.AddRange(roleClaims);
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
            bool storeToken = _userRepository.CheckTokenExist(refreshTokenMap) ?
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

            //Check AccessToken valid format
            var principal = _authenRepository.GetPrincipalFromToken(currentToken.AccessToken);
            if (principal == null)
            {
                return BadRequest("Invalid access token");
            }

            // Check user exists
            var user = _userRepository.GetUserByLoginName(principal.Identity.Name);
            if (user == null)
            {
                return BadRequest("Invalid client request");
            }

            // Check AccessToken expire, neu chua het han thi ko cho refresh
            var expClaim = principal.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp).Value;
            if (expClaim == null)
            {
                return BadRequest("Invalid client request");
            }
            ConvertDateUtils utils = new ConvertDateUtils();
            DateTime expAccessToken = utils.ConvertUnixTimeToDateTime(long.Parse(expClaim));
            if (expAccessToken > DateTime.Now)
            {
                return BadRequest("Access token has not yet expired");
            }

            // Check Refresh Token va expired cua Refresh Token
            var token = _authenRepository.GetTokenById(user.Id);
            if (!token.RefreshToken.Equals(currentToken.RefreshToken))
            {
                return Unauthorized("Invalid Refresh Token."); // => Ma Refresh Token ko khop voi database
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
