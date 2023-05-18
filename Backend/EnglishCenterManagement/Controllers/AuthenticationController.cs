using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EnglishCenterManagement.Interfaces;
using AutoMapper;
using System.Security.Claims;
using EnglishCenterManagement.Data;
using System.IdentityModel.Tokens.Jwt;
using EnglishCenterManagement.Common.Helpers;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Dtos.AuthenticationDtos;
using System;

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

        // POST: /register => role = 0 (chỉ phục vụ thu thập ttin)
        // TODO: check birthday
        [HttpPost("register")]
        [AllowAnonymous]
        public ActionResult Register([FromBody] RegisterDto newUser)
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

            //if (newUser.DateOfBirth != null)
            //{
            //    if ((DateTime.Now.Date).CompareTo(newUser.DateOfBirth) < 0)
            //    {
            //        return BadRequest(new ApiReponse(637));
            //    }
            //}

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
                return BadRequest(new ApiReponse(600));
            }

            // get user by loginname
            var user = _userRepository.GetUserByLoginName(userLogin.LoginName);
            if (user == null)
            {
                return NotFound(new ApiReponse(606));
            }

            // check status user
            if (user.UserStatus == UserStatus.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }

            // check pwd 
            bool checkPassword = BCrypt.Net.BCrypt.Verify(userLogin.Password, user.Password);
            if (!checkPassword)
            {
                return BadRequest(new ApiReponse(610));
            }

            // generate token
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userLogin.LoginName),
                new Claim("UserId", user.Id.ToString()),
            };
            var roleClaims = _dataContext.Users.Where(r => r.Id == user.Id).Select(x => new Claim(ClaimTypes.Role, x.Role.ToString()));
            claims.AddRange(roleClaims);
            // when 1 user has many roles
            //var roleClaims = _dataContext.Roles
            //    .Where(r => r.UserId == user.Id)
            //    .Select(x => new Claim(ClaimTypes.Role, x.Type.ToString()));
            //claims.AddRange(roleClaims);
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

            return Ok(new ApiReponse(new TokenDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            }));
        }

        // POST: /refreshToken
        [HttpPost("refresh-token")]
        [AllowAnonymous]
        public ActionResult RefreshToken([FromBody] TokenDto currentToken)
        {
            if (currentToken == null)
            {
                return BadRequest(new ApiReponse(600));
            }

            //Check AccessToken valid format
            var principal = _authenRepository.GetPrincipalFromToken(currentToken.AccessToken);
            if (principal == null)
            {
                return BadRequest(new ApiReponse(601));
            }

            // Check user exists
            var user = _userRepository.GetUserByLoginName(principal.Identity.Name);
            if (user == null)
            {
                return BadRequest(new ApiReponse(601));
            }

            // check status user
            if (user.UserStatus == UserStatus.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }

            // Check AccessToken expire, neu chua het han thi ko cho refresh
            var expClaim = principal.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp).Value;
            if (expClaim == null)
            {
                return BadRequest(new ApiReponse(601));
            }
            ConvertDateUtils utils = new ConvertDateUtils();
            DateTime expAccessToken = utils.ConvertUnixTimeToDateTime(long.Parse(expClaim));
            if (expAccessToken > DateTime.Now)
            {
                return BadRequest(new ApiReponse(602));
            }

            // Check Refresh Token va expired cua Refresh Token
            var token = _authenRepository.GetTokenById(user.Id);
            if (!token.RefreshToken.Equals(currentToken.RefreshToken))
            {
                return Unauthorized(new ApiReponse(604)); ; // => Ma Refresh Token ko khop voi database
            }
            if (token.ExpiredAt < DateTime.Now)
            {
                return Unauthorized(new ApiReponse(605)); // => Phai dang nhap lai
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
            
            return Ok(new ApiReponse(new TokenDto
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            }));
        }

        // POST: /logout
        [HttpPost("logout")]
        [Authorize]
        public ActionResult Logout()
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }

            // mới xóa refresh token còn vđ về access token

            // Khi login sẽ cấp bộ access token và refresh token
            // - access hết hạn sẽ gọi refesh, BE đối chiếu mã refresh trùng nhau thì cấp bộ access refresh token mới
            // - nếu refresh token cx hết hạn thì phải đăng nhập lại 

            // Khi logout thì bản chất là xóa refresh token của người dùng đó đi chứ ko thể revoke đc access token nên nếu:
            // - logout trước khi access token hết hạn, bên client chỉ xóa bộ access vs refresh khỏi store bản chất chúng vẫn tồn tại và còn hạn nên
            // vẫn có thể dùng access token đó để gọi API nếu lưu chúng chỗ khác -> lý do access token chỉ có thời gian ngắn
            // (Bản chất của token là mã hóa thông tin, khi có request thì server sẽ giải mã nó nên ko revoke đc)
            // -> chỉ tới khi access token hết hạn, client lấy mã refresh token để request thì mới ko đc

            var token = _authenRepository.GetTokenById(user.Id);
            if (token  == null)
            {
                return NotFound(new ApiReponse(603));
            }

            _authenRepository.DeleteCurrentToken(token);

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
