namespace EnglishCenterManagement.Entities.Models
{
    public class NotificationModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreateOn { get; set; } = DateTime.Now;
        public int SenderId { get; set; }

        // Relationship
        public int ReceiverId { get; set; }
        public UserInfoModel Receiver { get; set; }
    }
}
