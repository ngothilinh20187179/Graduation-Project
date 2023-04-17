using EnglishCenterManagement.Common.Models;

namespace EnglishCenterManagement.Models
{
    public class CredentialModel
    {
        public int Id { get; set; }
        public string LoginName { get; set; }
        public string Password { get; set; }

        // Relationship 1User - 1Credential
        public UserInfoModel User { get; set; }
    }
}
