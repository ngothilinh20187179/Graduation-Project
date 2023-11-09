using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Entities.Models
{
    public class TeacherAttendanceModel
    {
        public int Id { get; set; }
        public AttendanceStatusType Status { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public string? Reason { get; set; }
        public int TeacherClassId { get; set; }

        // Relationship
        public TeacherClassModel TeacherClass { get; set; }
    }
}
