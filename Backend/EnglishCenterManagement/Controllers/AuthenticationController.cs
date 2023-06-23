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
                return BadRequest(new ApiReponse(606));
            }

            // check pwd 
            bool checkPassword = BCrypt.Net.BCrypt.Verify(userLogin.Password, user.Password);
            if (!checkPassword)
            {
                return BadRequest(new ApiReponse(610));
            }

            if (user.Role != userLogin.Role)
            {
                return BadRequest(new ApiReponse(1000));
            }

            // check status user
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
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

            var tokenInfo = new
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                user.Role,
            };

            return Ok(new ApiReponse(tokenInfo));
        }

        // POST: /refreshToken
        // TODO: Client gửi RT lên Server để lấy AT mới và RT mới (nhưng thời gian hết hạn của RT mới vẫn như RT cũ )
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
            if (user.UserStatus == UserStatusType.Lock)
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
                return BadRequest(new ApiReponse(604)); ; // => Ma Refresh Token ko khop voi database
            }
            if (token.ExpiredAt < DateTime.Now)
            {
                return BadRequest(new ApiReponse(605)); // => Phai dang nhap lai
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

            //1) Simply remove the token from the client
            //2) Create a token blocklist => solve problem
            //3) Just keep token expiry times short and rotate them often
            //4) Session ???

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
