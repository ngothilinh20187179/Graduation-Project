using EnglishCenterManagement.Models;
using System.Security.Claims;

namespace EnglishCenterManagement.Interfaces
{
    public interface IAuthenticationRepository
    {
        bool CheckUserNameExist(string userName);
        bool CheckEmailExists(string email);
        bool CheckTokenExist(RefreshTokenModel token);
        UserInfoModel GetUserByLoginName(string loginName);
        bool CreateUserProfile(UserInfoModel user);

        RefreshTokenModel GetTokenById(int userId);
        string GenerateAccessToken(IEnumerable<Claim> claims);
        string GenerateRefreshToken();
        bool CreateNewUserToken(RefreshTokenModel token);
        bool UpdateCurrentUserToken(RefreshTokenModel token);
        bool DeleteCurrentToken(RefreshTokenModel token);
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);

        bool SaveChange();
    }
}
