namespace EnglishCenterManagement.Common.Constants
{
    public static class FormFileContants
    {
        public static IReadOnlyDictionary<string, string> Extension => new Dictionary<string, string>()
            {
                { ".png", "image/png" },
                { ".jpg", "image/jpeg" },
                { ".jpeg", "image/jpeg" },

                { ".jfif", "image/jpeg" },
                { ".pjpeg", "image/jpeg" },
                { ".pjp", "image/jpeg" },
                { ".webp", "image/webp" }
            };
    }
}
