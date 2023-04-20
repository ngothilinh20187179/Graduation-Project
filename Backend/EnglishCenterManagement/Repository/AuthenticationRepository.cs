using EnglishCenterManagement.Data;
using EnglishCenterManagement.Interfaces;
using EnglishCenterManagement.Models;
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
                expires: DateTime.Now.AddMinutes(15),
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
        public ClaimsPrincipal? GetPrincipalFromToken(string token)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var tokenValidationParameters = GetValidationParameters();

            try
            {
                var principal = jwtTokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);
                if (!(securityToken is JwtSecurityToken jwtSecurityToken)
                    || !jwtSecurityToken.Header.Alg.Equals
                    (SecurityAlgorithms.HmacSha256,
                    StringComparison.InvariantCultureIgnoreCase))
                {
                    return null;
                }
                return principal;
            }
            catch
            {
                return null;
            }
        }
        public TokenValidationParameters GetValidationParameters()
        {
            return new TokenValidationParameters()
            {
                ValidateLifetime = false, // Because there is no expiration in the generated token
                ValidateAudience = false, // Because there is no audiance in the generated token
                ValidateIssuer = false,   // Because there is no issuer in the generated token
                ValidIssuer = _config["Jwt:Issuer"],
                ValidAudience = _config["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"])) // The same key as the one that generate the token
            };
        }

        public bool SaveChange()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
