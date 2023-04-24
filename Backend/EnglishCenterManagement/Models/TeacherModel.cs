namespace EnglishCenterManagement.Models
{
    public class TeacherModel
    {
        public int Id { get; set; }
        public string GraduateAt { get; set; } = string.Empty;
        public DateOnly GraduationTime { get; set; }
        public string Note { get; set; } = string.Empty;

        // Relationship
        public ICollection<TeacherClassModel>? TeacherClasses { get; set; }
        public UserInfoModel User { get; set; }
    }
}
