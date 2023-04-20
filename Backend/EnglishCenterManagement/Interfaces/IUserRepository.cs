using EnglishCenterManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace EnglishCenterManagement.Interfaces
{
    public interface IUserRepository
    {
        bool CheckUserNameExist(string userName);
        bool CheckEmailExists(string email);
        bool CheckTokenExist(RefreshTokenModel token);
        UserInfoModel GetUserByLoginName(string loginName);
        UserInfoModel GetUserByUserId(int userId);
        UserInfoModel GetUserHasSameEmail(int userId, string email);
        UserInfoModel GetUserHasSameLoginName(int userId, string loginName);
        bool CreateUserProfile(UserInfoModel user);
        bool UpdateUserProfile(UserInfoModel user);
        bool SaveChange();
    }
}
