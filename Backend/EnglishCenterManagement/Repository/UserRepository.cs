using EnglishCenterManagement.Data;
using EnglishCenterManagement.Interfaces;
using EnglishCenterManagement.Models;

namespace EnglishCenterManagement.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
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
        public UserInfoModel GetUserByUserId(int userId)
        {
            return _context.Users.Where(p => p.Id == userId).FirstOrDefault();
        }
        public UserInfoModel GetUserHasSameEmail(int userId, string email)
        {
            return _context.Users.Where(p => p.Email == email && p.Id != userId).FirstOrDefault();
        }
        public UserInfoModel GetUserHasSameLoginName(int userId, string loginName)
        {
            return _context.Users.Where(p => p.LoginName == loginName && p.Id != userId).FirstOrDefault();
        }
        public bool CreateUserProfile(UserInfoModel user)
        {
            _context.Add(user);
            return SaveChange();
        }
        public bool UpdateUserProfile(UserInfoModel user)
        {
            _context.Update(user);
            return SaveChange();
        }
        public bool SaveChange()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
