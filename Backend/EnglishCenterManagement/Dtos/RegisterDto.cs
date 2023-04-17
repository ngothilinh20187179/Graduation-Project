using EnglishCenterManagement.Common.Models;
using EnglishCenterManagement.Models;

namespace EnglishCenterManagement.Dtos
{
    public class RegisterDto
    {
        public string LoginName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public Gender? Gender { get; set; }
        public string? Email { get; set; }
        public string? Location { get; set; }
        public DateTime? DateOfBirth { get; set; }
    }
}
