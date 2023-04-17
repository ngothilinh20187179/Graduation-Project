namespace EnglishCenterManagement.Models
{
    public class TokenModel
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public DateTime ExpiredAt { get; set; }
        public DateTime IssuedAt { get; set; }
        public bool IsUsed { get; set; }
        public bool IsRevoked { get; set; }

        // Relationship 
        public int Id { get; set; }
        public UserInfoModel User { get; set; }
    }
}
