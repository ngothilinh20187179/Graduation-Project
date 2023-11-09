namespace EnglishCenterManagement.Entities.Models
{
    public class StaffModel
    {
        public int Id { get; set; }
        public string GraduateAt { get; set; } = string.Empty;
        public DateOnly GraduationTime { get; set; }
        public DateOnly HireDate { get; set; }
        public int YearsOfWorking { get; set; }
        public string? Note { get; set; }

        // Relationship
        public int PositionId { get; set; }
        public PositionModel Position { get; set; }
        public UserInfoModel User { get; set; }
        public ICollection<StaffAttendanceModel>? StaffAttendances { get; set; }
        public ICollection<StaffSalaryModel>? StaffSalaries { get; set; }
        public ICollection<SpendingModel>? Spendings { get; set; }

    }
}
