using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos.UserInfoDto
{
    public class UserProfileDetailDto : UserInfoDto
    {
        public DateTime Created { get; set; }
        public RoleType Role { get; set; }
        public AvatarDto? Avatar { get; set; }
    }
}
