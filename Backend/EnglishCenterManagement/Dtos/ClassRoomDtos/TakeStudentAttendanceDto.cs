using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos.ClassRoomDtos
{
    public class TakeStudentAttendanceDto
    {
        public int ClassId { get; set; }
        public List<StudentAttendance> Data { get; set; }
        public record StudentAttendance
        {
            public int Id { get; set; }
            public AttendanceStatusType Status { get; set; }
            public string? Reason { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
        }
    }
}
