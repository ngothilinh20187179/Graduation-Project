using EnglishCenterManagement.Common.Models;

namespace EnglishCenterManagement.Models
{
    public class Role
    {
        public int Id { get; set; }
        public RoleType Type { get; set; }
        public string? Description { get; set; }
        public int UserId { get; set; }

        // Relationship 1User-nRoles
        public UserProfile User { get; set; }
    }
}
