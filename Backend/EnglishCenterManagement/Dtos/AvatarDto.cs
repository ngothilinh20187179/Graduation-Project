namespace EnglishCenterManagement.Dtos
{
    public class AvatarDto
    {
        public int Id { get; set; }
        public string MediaType { get; set; } = string.Empty;
        public byte[] Data { get; set; }
    }
}
