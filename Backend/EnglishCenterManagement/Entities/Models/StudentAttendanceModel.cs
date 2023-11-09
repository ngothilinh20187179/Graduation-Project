using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Entities.Models
{
    public class StudentAttendanceModel
    {
        public int Id { get; set; }
        public AttendanceStatusType Status { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public string? Reason { get; set; }
        public int StudentClassId { get; set; }

        // Relationship
        public StudentClassModel StudentClass { get; set; }
    }
}
