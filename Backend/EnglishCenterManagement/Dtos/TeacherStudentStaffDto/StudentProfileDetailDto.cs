using EnglishCenterManagement.Dtos.UserInfoDto;

namespace EnglishCenterManagement.Dtos.SchoolDto
{
    public class StudentProfileDetailDto : BasicUserInfoDto
    {
        public string? Location { get; set; }
        public string? ParentsName { get; set; }
        public string? ParentPhoneNumber { get; set; }
        public string? Note { get; set; }
    }
}
