using EnglishCenterManagement.Dtos.UserInfoDtos;

namespace EnglishCenterManagement.Dtos.TeacherStudentStaffDtos
{
    public class StaffProfileDetailDto : BasicUserInfoDto
    {
        public string GraduateAt { get; set; } = string.Empty;
        public DateOnly GraduationTime { get; set; }
        public string? Note { get; set; }
    }
}
