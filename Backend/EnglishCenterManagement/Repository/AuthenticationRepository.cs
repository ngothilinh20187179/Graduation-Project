using EnglishCenterManagement.Data;
using EnglishCenterManagement.Dtos;
using EnglishCenterManagement.Interfaces;
using EnglishCenterManagement.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EnglishCenterManagement.Repository
{
    public class AuthenticationRepository : IAuthenticationRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        public AuthenticationRepository(DataContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }
        public bool CheckUserNameExist(string userName)
        {
            return _context.Credentials.Any(c => c.LoginName == userName);
        }

        public bool CreateCredential(CredentialModel credential)
        {
            _context.Add(credential);
            return SaveChange();
        }

        public bool CreateUserProfile(UserInfoModel user)
        {
            _context.Add(user);
            return SaveChange();
        }

        public CredentialModel GetCredentialByLoginName(string loginName)
        {
            return _context.Credentials.Where(p => p.LoginName == loginName).FirstOrDefault();
        }
        public string GenerateToken(LoginDto user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.LoginName)
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);

        }
        public bool SaveChange()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
