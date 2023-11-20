using EnglishCenterManagement.Entities.Enumerations;
namespace EnglishCenterManagement.Dtos.NotificationsDtos
{
    public class ReceiversNotificationDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public RoleType Role { get; set; }
    }
}
