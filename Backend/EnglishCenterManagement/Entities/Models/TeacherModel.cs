namespace EnglishCenterManagement.Entities.Models
{
    public class TeacherModel
    {
        public int Id { get; set; }
        public string GraduateAt { get; set; } = string.Empty;
        public DateOnly GraduationTime { get; set; }
        public string? Note { get; set; }
        public int HourlySalary { get; set; }

        // Relationship
        public ICollection<TeacherClassModel>? TeacherClasses { get; set; }
        public UserInfoModel User { get; set; }
        public ICollection<QuizModel>? Quizzes { get; set; }
        public ICollection<TeacherSalaryModel>? TeacherSalaries { get; set; }
    }
}
