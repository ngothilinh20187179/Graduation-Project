using EnglishCenterManagement.Common.Models;

namespace EnglishCenterManagement.Dtos
{
    public class RegisterDto
    {
        public string LoginName { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public Gender? Gender { get; set; } 
        public string? Email { get; set; } 
        public string? Location { get; set; } 
        public DateTime? DateOfBirth { get; set; } 
    }
}
