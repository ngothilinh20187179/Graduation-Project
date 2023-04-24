using EnglishCenterManagement.Common.Models;

namespace EnglishCenterManagement.Models
{
    public class RoomModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int? Size { get; set; }
        public RoomStatusType RoomStatus { get; set; }

        // Relationship
        public ICollection<ClassModel>? Classes { get; set; }
    }
}
