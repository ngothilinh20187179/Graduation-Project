using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos.AuthenticationDtos
{
    // Checked
    public class LoginDto
    {
        public string LoginName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public RoleType Role { get; set; }
    }
}
