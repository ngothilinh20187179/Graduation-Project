using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Entities.Models
{
    public class ClassModel
    {
        public int Id { get; set; }
        public string ClassTitle { get; set; } = string.Empty;

        // thiếu lịch học (thứ ?)
        public DateOnly ClassStartDate { get; set; }
        public DateOnly ClassEndDate { get; set; }
        public TimeOnly? PeriodStart { get; set; }
        public TimeOnly? PeriodEnd { get; set; }

        public double Credit { get; set; }
        public int Number { get; set; }
        public string? Note { get; set; }


        // Relationship
        public int SubjectId { get; set; }
        public SubjectModel Subject { get; set; }

        public int RoomId { get; set; }
        public RoomModel? Room { get; set; }

        public ICollection<StudentClassModel>? StudentClasses { get; set; }
        public ICollection<TeacherClassModel>? TeacherClasses { get; set; }
    }
}
