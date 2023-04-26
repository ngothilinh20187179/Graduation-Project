using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Data;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Interfaces;

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
        public bool CheckAvatarExists(int id)
        {
            return _context.Avatars.Any(c => c.Id == id);
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

        public AvatarModel GetUserAvatar(int id)
        {
            return _context.Avatars.Where(a => a.Id == id).FirstOrDefault();
        }
        public bool AddAvatar(AvatarModel avatar)
        {
            _context.Add(avatar);
            return SaveChange();
        }
        public bool UpdateAvatar(AvatarModel avatar)
        {
            _context.Update(avatar);
            return SaveChange();
        }
        public bool DeleteAvatar(AvatarModel avatar)
        {
            _context.Remove(avatar);
            return SaveChange();
        }

        public bool DeleteUser(UserInfoModel user)
        {
            _context.Remove(user);
            return SaveChange();
        }
        public PagedResponse GetAllUsers(string? search, RoleType? role, int page, int pageSize)
        {
            var allUsers = _context.Users.AsQueryable();
            var totalUsers = _context.Users.Count();

            #region Filtering
            if (!String.IsNullOrEmpty(search))
            {
                allUsers = allUsers.Where(u => u.FirstName.Contains(search));
            }
            if (role.HasValue)
            {
                allUsers = allUsers.Where(u => u.Role == role);
            }
            #endregion

            #region Sorting
            allUsers = allUsers.OrderByDescending(u => u.Created);
            #endregion

            #region Paginated
            var data = allUsers.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            #endregion

            return new PagedResponse(data, totalUsers, page, pageSize);
        }

        public bool SaveChange()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
