using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos
{
    public class RegisterDto : BasicUserInfoDto
    {
        public string Password { get; set; } = string.Empty;
    }
}
