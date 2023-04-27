using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos
{
    public class UserProfileHasAvatarDto : BasicUserInfoDto
    {
        public DateTime Created { get; set; }
        public RoleType Role { get; set; }
        public AvatarDto? Avatar { get; set; }
    }
}
