using EnglishCenterManagement.Dtos;
using EnglishCenterManagement.Models;

namespace EnglishCenterManagement.Interfaces
{
    public interface IAuthenticationRepository
    {
        string GenerateToken(LoginDto user);
        CredentialModel GetCredentialByLoginName(string loginName);
        bool CheckUserNameExist(string userName);
        bool CreateUserProfile(UserInfoModel user);
        bool CreateCredential(CredentialModel credential);
        bool SaveChange();
    }
}
