namespace EnglishCenterManagement.Models
{
    public class RefreshTokenModel
    {
        public int Id { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime ExpiredAt { get; set; } = DateTime.UtcNow.AddDays(1);
        public DateTime IssuedAt { get; set; } = DateTime.UtcNow;

        // Relationship 
        public UserInfoModel User { get; set; }
    }
}
