using EnglishCenterManagement.Common.Models;

namespace EnglishCenterManagement.Models
{
    public class UserInfoModel
    {
        public int Id { get; set; }

        public string LoginName { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;

        public string? Email { get; set; }
        public Gender? Gender { get; set; }
        public string? Location { get; set; } 
        public DateTime? DateOfBirth { get; set; }

        public RoleType Role { get; set; } = RoleType.RestrictedRole;
        public string Password { get; set; } = string.Empty;
        public DateTime Created { get; set; } = DateTime.Now;

        // Relationship
        public AvatarModel? Avatar { get; set; }
        public RefreshTokenModel? Token { get; set; }
    }
}
