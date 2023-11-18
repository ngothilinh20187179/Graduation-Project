using EnglishCenterManagement.Entities.Enumerations;
namespace EnglishCenterManagement.Dtos.ReceivedNotificationDto
{
    public class ReceivedNotificationDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreateOn { get; set; } = DateTime.Now;
        public ReadStatusType Status { get; set; }
        public bool IsMarkedReceiverNoti { get; set; } = false;
    }
}
