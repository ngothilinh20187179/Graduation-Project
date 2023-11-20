namespace EnglishCenterManagement.Dtos.NotificationsDtos
{
    public class ReceivedNotificationDetailDto : ReceivedNotificationDto
    {
        public UserNotificationDto Sender { get; set; }
    }
}
