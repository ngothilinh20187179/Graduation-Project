namespace EnglishCenterManagement.Models
{
    public class AvatarModel
    {
        public int Id { get; set; }
        public string MediaType { get; set; } = string.Empty;
        public byte[] Data { get; set; }

        // Relationship 1User - 1Avatar
        public UserInfoModel User { get; set; } 
    }
}
