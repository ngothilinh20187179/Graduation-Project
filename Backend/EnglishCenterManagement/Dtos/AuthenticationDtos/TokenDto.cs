﻿namespace EnglishCenterManagement.Dtos.AuthenticationDtos
{
    public class TokenDto
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
    }
}
