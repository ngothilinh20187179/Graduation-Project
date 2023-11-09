using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Entities.Models
{
    public class ClassModel
    {
        public int Id { get; set; }
        public string ClassName { get; set; } = string.Empty;
        public DateOnly ClassStartDate { get; set; }
        public DateOnly? ClassEndDate { get; set; }
        public int NumberOfStudents { get; set; }
        public int NumberOfSessions { get; set; }
        public double Credit { get; set; }
        public string? Note { get; set; }
        public ClassStatusType ClassStatus { get; set; } = ClassStatusType.NotStart;

        // relationship
        public int SubjectId { get; set; }
        public SubjectModel Subject { get; set; }
        public ICollection<ClassScheduleModel> ClassSchedules { get; set; }
        public ICollection<StudentClassModel>? StudentClasses { get; set; }
        public ICollection<TeacherClassModel>? TeacherClasses { get; set; }
        public ICollection<QuizClassModel>? QuizzClasses { get; set; }
    }
}
