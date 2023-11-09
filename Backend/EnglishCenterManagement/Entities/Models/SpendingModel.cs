using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Entities.Models
{
    public class SpendingModel
    {
        public int Id { get; set; }
        public string SpendOn { get; set; }
        public int Budget { get; set; }
        public string? Description { get; set; }
        public SpendingStatusType Status { get; set; } = SpendingStatusType.Pending;
        public DateTime CreatedOn { get; set; } = DateTime.Now;

        // Relationship
        public int StaffId { get; set; }
        public StaffModel Staff { get; set; }
    }
}
