using EnglishCenterManagement.Dtos.AuthenticationDtos;

namespace EnglishCenterManagement.Dtos.TeacherStudentStaffDtos
{
    public class CreateStaffDto : RegisterDto
    {
        public string GraduateAt { get; set; } = string.Empty;
        public DateOnly GraduationTime { get; set; }
        public DateOnly HireDate { get; set; }
        public int YearsOfWorking { get; set; }
        public string? Note { get; set; }
        public int PositionId { get; set; }
    }
}
