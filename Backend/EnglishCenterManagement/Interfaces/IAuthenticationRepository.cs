using EnglishCenterManagement.Models;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace EnglishCenterManagement.Interfaces
{
    public interface IAuthenticationRepository
    {
        RefreshTokenModel GetTokenById(int userId);
        string GenerateAccessToken(IEnumerable<Claim> claims);
        string GenerateRefreshToken();
        bool CreateNewUserToken(RefreshTokenModel token);
        bool UpdateCurrentUserToken(RefreshTokenModel token);
        bool DeleteCurrentToken(RefreshTokenModel token);
        ClaimsPrincipal? GetPrincipalFromToken(string token);
        TokenValidationParameters GetValidationParameters();
        bool SaveChange();
    }
}
