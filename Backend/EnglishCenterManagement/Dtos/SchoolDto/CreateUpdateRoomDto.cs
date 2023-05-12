using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos.SchoolDto
{
    public class CreateUpdateRoomDto
    {
        public string Name { get; set; } = string.Empty;
        public int? Size { get; set; }
        public RoomStatusType RoomStatus { get; set; }
        public string? Note { get; set; }
    }
}
