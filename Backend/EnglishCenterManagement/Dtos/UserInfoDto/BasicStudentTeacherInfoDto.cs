using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos.UserInfoDto
{
    public class BasicStudentTeacherInfoDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;

        public GenderType? Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public AvatarDto? Avatar { get; set; }
    }
}
