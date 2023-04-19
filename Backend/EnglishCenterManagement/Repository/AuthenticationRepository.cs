using EnglishCenterManagement.Data;
using EnglishCenterManagement.Dtos;
using EnglishCenterManagement.Interfaces;
using EnglishCenterManagement.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace EnglishCenterManagement.Repository
{
    public class AuthenticationRepository : IAuthenticationRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        public AuthenticationRepository(
            DataContext context, 
            IConfiguration config)
        {
            _context = context;
            _config = config;
        }
        public bool CheckUserNameExist(string userName)
        {
            return _context.Users.Any(c => c.LoginName == userName);
        }
        public bool CheckEmailExists(string email)
        {
            return _context.Users.Any(c => c.Email == email);
        }
        public bool CheckTokenExist(RefreshTokenModel token)
        {
            return _context.Tokens.Any(c => c.Id == token.Id);
        }
        public UserInfoModel GetUserByLoginName(string loginName)
        {
            return _context.Users.Where(p => p.LoginName == loginName).FirstOrDefault();
        }
        public bool CreateUserProfile(UserInfoModel user)
        {
            _context.Add(user);
            return SaveChange();
        }

        public RefreshTokenModel GetTokenById(int userId)
        {
            return _context.Tokens.Where(c => c.Id == userId).SingleOrDefault();
        }
        public string GenerateAccessToken(IEnumerable<Claim> claims)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var signinCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return tokenString;
        }
        public string GenerateRefreshToken()
        {
            var random = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(random);
                return Convert.ToBase64String(random);
            }
        }
        public bool CreateNewUserToken(RefreshTokenModel token)
        {
            _context.Add(token);
            return SaveChange();
        }
        public bool UpdateCurrentUserToken(RefreshTokenModel token)
        {
            _context.Update(token);
            return SaveChange();
        }
        public bool DeleteCurrentToken(RefreshTokenModel token)
        {
            _context.Remove(token);
            return SaveChange();
        }
        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var secretKeyBytes = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(secretKeyBytes),
                ValidateLifetime = false
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");
            return principal;
        }

        public bool SaveChange()
        {
            return _context.SaveChanges() > 0;
        }
        
        //public TokenDto GenerateToken(CredentialModel credential)
        //{
        //    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        //    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        //    var tokenDescription = new SecurityTokenDescriptor
        //    {
        //        Subject = new ClaimsIdentity(new[] {
        //            new Claim("UserName", credential.LoginName),
        //            new Claim("UserId", credential.Id.ToString()),
        //        }),
        //        Expires = DateTime.UtcNow.AddMinutes(20), // Thoi gian het han cua AccessToken
        //        SigningCredentials = credentials
        //    };

        //    var jwtTokenHandler = new JwtSecurityTokenHandler();
        //    var token = jwtTokenHandler.CreateToken(tokenDescription);
        //    var accessToken = jwtTokenHandler.WriteToken(token);
        //    var refreshToken = GenerateRefreshToken();
        //    
        //    var tokenEntity = new TokenModel
        //    {
        //        AccessToken = accessToken,
        //        RefreshToken = refreshToken,
        //        ExpiredAt = DateTime.UtcNow.AddDays(1), // Thoi gian het han cua RefreshToken
        //        IssuedAt = DateTime.UtcNow,
        //        IsUsed = false,
        //        IsRevoked = false,
        //        Id = credential.Id,
        //    };
        // thêm điều kiện thêm token khi chưa tồn tại, cập nhật token khi token-user đã tồn tại
        //    return new TokenDto()
        //    {
        //        AccessToken = accessToken,
        //        RefreshToken = refreshToken,
        //    };
        //}
    }
}
