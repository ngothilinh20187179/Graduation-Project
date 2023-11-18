namespace EnglishCenterManagement.Dtos.AuthenticationDtos
{
    // checked
    public class RefreshTokenDto
    {
        public int Id { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
    }
}
