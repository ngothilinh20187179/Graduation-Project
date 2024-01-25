using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos.ClassRoomDtos
{
    public class StudentAttendanceDto
    {
        public AttendanceStatusType Status { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public string? Reason { get; set; }
        public int StudentClassId { get; set; }
    }
}
