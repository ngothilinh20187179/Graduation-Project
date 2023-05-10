using EnglishCenterManagement.Dtos.UserInfoDto;

namespace EnglishCenterManagement.Dtos.AuthenticationDtos
{
    public class RegisterDto : BasicUserInfoDto
    {
        public string Password { get; set; } = string.Empty;
    }
}
