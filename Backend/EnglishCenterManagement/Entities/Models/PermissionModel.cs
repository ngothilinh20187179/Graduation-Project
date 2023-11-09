namespace EnglishCenterManagement.Entities.Models
{
    public class PermissionModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;

        // Relationship
        public ICollection<PermissionPositionModel>? PermissionPositions { get; set; }
    }
}
