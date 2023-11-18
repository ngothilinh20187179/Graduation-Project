using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos.UserInfoDto
{
    // checked
    public class EditUserInfo
    {
        public string LoginName { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;

        public string? Password { get; set; }
        public string? Email { get; set; }
        public GenderType? Gender { get; set; }
        public string? Location { get; set; }
        public DateOnly? DateOfBirth { get; set; }
    }
}
