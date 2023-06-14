namespace EnglishCenterManagement.Entities.Models
{
    public class StaffModel
    {
        public int Id { get; set; }
        public string GraduateAt { get; set; } = string.Empty;
        public DateOnly GraduationTime { get; set; }
        public string? Note { get; set; }

        // Relationship
        public UserInfoModel User { get; set; }
    }
}
