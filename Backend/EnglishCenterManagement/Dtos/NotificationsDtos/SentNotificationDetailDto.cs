namespace EnglishCenterManagement.Dtos.NotificationsDtos
{
    public class SentNotificationDetailDto : SentNotificationDto
    {
        public UserNotificationDto Receiver { get; set; }
    }
}
