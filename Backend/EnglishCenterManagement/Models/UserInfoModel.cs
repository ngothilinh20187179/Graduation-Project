using EnglishCenterManagement.Common.Models;

namespace EnglishCenterManagement.Models
{
    public class UserInfoModel
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
        public ICollection<RoleModel> Roles { get; set; }
        public AvatarModel? Avatar { get; set; }
        public CredentialModel Credential { get; set; }
        public TokenModel Token { get; set; }
    }
}
