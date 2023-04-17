namespace EnglishCenterManagement.Models
{
    public class Token
    {
        public string Value { get; set; }
        public DateTime Expiry { get; set; }
        public int UserId { get; set; }

        // Relationship 
        public UserProfile User { get; set; }
    }
}
