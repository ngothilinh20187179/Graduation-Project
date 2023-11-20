using EnglishCenterManagement.Dtos.UserInfoDtos;
using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos.NotificationsDtos
{
    public class UserNotificationDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public RoleType Role { get; set; }
        public AvatarDto? Avatar { get; set; }
    }
}
