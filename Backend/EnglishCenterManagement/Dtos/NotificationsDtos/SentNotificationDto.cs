namespace EnglishCenterManagement.Dtos.NotificationsDtos
{
    public class SentNotificationDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreateOn { get; set; } = DateTime.Now;
        public bool IsMarkedSenderNoti { get; set; } = false;
    }
}
