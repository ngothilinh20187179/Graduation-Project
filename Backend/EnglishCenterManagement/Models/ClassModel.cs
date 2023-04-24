using EnglishCenterManagement.Common.Models;

namespace EnglishCenterManagement.Models
{
    public class ClassModel
    {
        public int Id { get; set; }
        public string ClassTitle { get; set; } = string.Empty;
        public DateOnly ClassStartDate { get; set; }
        public DateOnly ClassEndDate { get; set; }
        public TimeOnly? PeriodStart { get; set; }
        public TimeOnly? PeriodEnd { get; set; }
        public double Credit { get; set; }
        public int Number { get; set; }
        public ClassStatusType ClassStatus { get; set; }

        // Relationship
        public SubjectModel Subject { get; set; }
        public RoomModel? Room { get; set; }
        public ICollection<StudentClassModel>? StudentClasses { get; set; }
        public ICollection<TeacherClassModel>? TeacherClasses { get; set; }
    }
}
