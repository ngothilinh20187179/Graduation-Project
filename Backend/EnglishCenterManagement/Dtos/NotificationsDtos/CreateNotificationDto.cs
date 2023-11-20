namespace EnglishCenterManagement.Dtos.NotificationsDtos
{
    public class CreateNotificationDto
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public int[] Receivers { get; set; }
    }
}
