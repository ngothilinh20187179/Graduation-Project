namespace EnglishCenterManagement.Entities.Models
{
    public class PositionModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SalaryMin { get; set; }
        public int SalaryMax { get; set; }
        public int HourlyRate { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;

        // Relationship
        public ICollection<StaffModel>? Staffs { get; set; }
        public ICollection<PermissionPositionModel>? PermissionPositions { get; set; }
    }
}
