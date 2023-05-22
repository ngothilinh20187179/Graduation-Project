using EnglishCenterManagement.Dtos.AuthenticationDtos;

namespace EnglishCenterManagement.Dtos.TeacherStudentStaffDto
{
    public class CreateStaffDto : RegisterDto
    {
        public string GraduateAt { get; set; } = string.Empty;
        public DateOnly GraduationTime { get; set; }
        public string? Note { get; set; }
    }
}
