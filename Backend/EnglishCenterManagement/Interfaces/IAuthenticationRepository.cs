using EnglishCenterManagement.Dtos;
using EnglishCenterManagement.Models;

namespace EnglishCenterManagement.Interfaces
{
    public interface IAuthenticationRepository
    {
        string GenerateToken(LoginDto user);
        Credential GetCredentialByLoginName(string loginName);
        bool CheckUserNameExist(string userName);
        bool CreateUserProfile(UserProfile user);
        bool CreateCredential(Credential credential);
        bool SaveChange();
    }
}
