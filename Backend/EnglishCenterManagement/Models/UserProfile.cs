using EnglishCenterManagement.Common.Models;

namespace EnglishCenterManagement.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string? Email { get; set; }
        public DateTime Created { get; set; }
        public Gender? Gender { get; set; }
        public string? Location { get; set; }
        public DateTime? DateOfBirth { get; set; }

        // Relationship
        public ICollection<Role> Roles { get; set; }
        public Avatar? Avatar { get; set; }
        public Credential Credential { get; set; }
    }
}
