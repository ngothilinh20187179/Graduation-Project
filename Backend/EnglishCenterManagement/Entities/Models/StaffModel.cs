namespace EnglishCenterManagement.Entities.Models
{
    public class StaffModel
    {
        public int Id { get; set; }
        public string GraduateAt { get; set; } = string.Empty;
        public DateTime GraduationTime { get; set; }
        public string? Note { get; set; }

        // Permissions: ngoài những permission chung cho staff, mỗi staff sẽ có permissions riêng
        //public bool CanDoSomeThing = false;

        // Relationship
        public UserInfoModel User { get; set; }
    }
}
