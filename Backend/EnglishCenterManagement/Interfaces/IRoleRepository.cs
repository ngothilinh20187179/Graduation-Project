using EnglishCenterManagement.Models;

namespace EnglishCenterManagement.Interfaces
{
    public interface IRoleRepository
    {
        ICollection<Role> GetMyRoles();

    }
}
