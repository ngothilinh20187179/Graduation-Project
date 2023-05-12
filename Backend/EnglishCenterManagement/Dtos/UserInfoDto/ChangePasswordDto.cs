namespace EnglishCenterManagement.Dtos.UserInfoDto
{
    public class ChangePasswordDto
    {
        public string OldPassword { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
