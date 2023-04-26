using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;
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
        bool DeleteUser(UserInfoModel user);
        PagedResponse GetAllUsers(string? search, RoleType? role, int page, int pageSize);
        bool SaveChange();
    }
}
