using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos
{
    public class UserProfileDto : BasicUserInfoDto
    {
        public DateTime Created { get; set; }
        public RoleType Role { get; set; }
    }
}
