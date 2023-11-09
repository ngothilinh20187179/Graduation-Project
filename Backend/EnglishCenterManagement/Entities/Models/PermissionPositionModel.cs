namespace EnglishCenterManagement.Entities.Models
{
    public class PermissionPositionModel
    {
        public int Id { get; set; }

        // Relationship
        public int PositionId { get; set; }
        public int PermissionId { get; set; }
        public PositionModel Position { get; set; }
        public PermissionModel Permission { get; set; }
    }
}
