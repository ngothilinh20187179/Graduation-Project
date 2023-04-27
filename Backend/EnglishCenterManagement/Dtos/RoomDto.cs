using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos
{
    public class RoomDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int? Size { get; set; }
        public RoomStatusType RoomStatus { get; set; }
        public string? Note { get; set; }
    }
}
