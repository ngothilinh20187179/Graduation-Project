using EnglishCenterManagement.Dtos.AuthenticationDtos;

namespace EnglishCenterManagement.Dtos.TeacherStudentStaffDtos
{
    public class CreateTeacherDto : RegisterDto
    {
        public string GraduateAt { get; set; } = string.Empty;
        public DateOnly GraduationTime { get; set; }
        public string? Note { get; set; }
        public int HourlySalary { get; set; }

    }
}
