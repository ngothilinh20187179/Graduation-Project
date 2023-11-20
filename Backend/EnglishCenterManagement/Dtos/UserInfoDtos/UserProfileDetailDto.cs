using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos.UserInfoDtos
{
    // checked
    public class UserProfileDetailDto : UserInfoDto
    {
        public DateTime CreatedOn { get; set; }
        public RoleType Role { get; set; }
        public AvatarDto? Avatar { get; set; }
    }
}
