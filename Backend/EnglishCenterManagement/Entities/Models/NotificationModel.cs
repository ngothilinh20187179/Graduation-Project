using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Entities.Models
{
    public class NotificationModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreateOn { get; set; } = DateTime.Now;
        public ReadStatusType Status { get; set; }
        public bool IsMarkedSenderNoti { get; set; } = false;
        public bool IsMarkedReceiverNoti { get; set; } = false;
        public DateTime? IsSenderDeleteNoti { get; set; }
        public DateTime? IsReceiverDeleteNoti { get; set; }
        public int SenderId { get; set; }

        // Relationship
        public int ReceiverId { get; set; }
        public UserInfoModel Receiver { get; set; }
    }
}
