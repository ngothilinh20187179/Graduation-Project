namespace EnglishCenterManagement.Entities.Models
{
    public class TeacherModel
    {
        public int Id { get; set; }
        public string GraduateAt { get; set; } = string.Empty;
        public DateTime GraduationTime { get; set; }
        public string? Note { get; set; }

        // Relationship
        public ICollection<TeacherClassModel>? TeacherClasses { get; set; }
        public UserInfoModel User { get; set; }
    }
}
