using EnglishCenterManagement.Dtos.UserInfoDtos;

namespace EnglishCenterManagement.Dtos.TeacherStudentStaffDtos
{
    public class EditStaffDto : EditUserInfo
    {
        public string GraduateAt { get; set; } = string.Empty;
        public DateOnly GraduationTime { get; set; }
        public DateOnly HireDate { get; set; }
        public int YearsOfWorking { get; set; }
        public string? Note { get; set; }
    }
}
