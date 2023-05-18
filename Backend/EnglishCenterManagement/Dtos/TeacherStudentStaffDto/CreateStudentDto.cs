using EnglishCenterManagement.Dtos.AuthenticationDtos;

namespace EnglishCenterManagement.Dtos.SchoolDto
{
    public class CreateStudentDto : RegisterDto
    {
        public string? ParentsName { get; set; }
        public string? ParentPhoneNumber { get; set; }
        public string? Note { get; set; }

    }
}
