namespace EnglishCenterManagement.Models
{
    public class Avatar
    {
        public int Id { get; set; }
        public string MediaType { get; set; }
        public byte[] Data { get; set; }

        // Relationship 1User - 1Avatar
        public UserProfile User { get; set; } 
    }
}
