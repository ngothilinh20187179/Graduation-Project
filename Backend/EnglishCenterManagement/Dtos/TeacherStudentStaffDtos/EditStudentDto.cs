using EnglishCenterManagement.Dtos.UserInfoDtos;

namespace EnglishCenterManagement.Dtos.TeacherStudentStaffDtos
{
    public class EditStudentDto : EditUserInfo
    {
        public string? ParentsName { get; set; }
        public string? ParentPhoneNumber { get; set; }
        public string? Note { get; set; }
    }
}
