using EnglishCenterManagement.Data;
using EnglishCenterManagement.Interfaces;
using EnglishCenterManagement.Models;

namespace EnglishCenterManagement.Repository
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _context;
        public RoleRepository(DataContext context)
        {
            _context = context;
        }
        public ICollection<RoleModel> GetMyRoles()
        {
            return _context.Roles.Where(c => c.UserId == 7).ToList();
        }
    }
}
