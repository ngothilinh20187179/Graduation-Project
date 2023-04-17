using EnglishCenterManagement.Common.Models;

namespace EnglishCenterManagement.Models
{
    public class RoleModel
    {
        public int Id { get; set; }
        public RoleType Type { get; set; }
        public string? Description { get; set; }

        // Relationship 1User - nRoles
        public int UserId { get; set; }
        public UserInfoModel User { get; set; }
    }
}
