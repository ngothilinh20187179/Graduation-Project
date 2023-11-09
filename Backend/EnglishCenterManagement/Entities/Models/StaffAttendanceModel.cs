using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Entities.Models
{
    public class StaffAttendanceModel
    {
        public int Id { get; set; }
        public AttendanceStatusType Status { get; set; }
        public string? Reason { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public DateOnly Date { get; set; }
        public double HoursWorked { get; set; }
        public bool IsOverTime { get; set; }

        // Relationship
        public int StaffId { get; set; }
        public StaffModel Staff { get; set; }
    }
}
