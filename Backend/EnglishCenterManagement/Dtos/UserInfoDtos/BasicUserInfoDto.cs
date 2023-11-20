using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos.UserInfoDtos
{
    // checked
    public class BasicUserInfoDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;

        public GenderType? Gender { get; set; }
        public DateOnly? DateOfBirth { get; set; }
        public AvatarDto? Avatar { get; set; }
        public UserStatusType UserStatus { get; set; }
    }
}
