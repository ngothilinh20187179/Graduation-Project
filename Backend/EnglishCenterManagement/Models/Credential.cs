using EnglishCenterManagement.Common.Models;

namespace EnglishCenterManagement.Models
{
    public class Credential
    {
        public int Id { get; set; }
        public string LoginName { get; set; }
        public string Password { get; set; }

        // Relationship
        public UserProfile User { get; set; }
    }
}
