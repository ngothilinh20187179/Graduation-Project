﻿namespace EnglishCenterManagement.Entities.Models
{
    public class StaffSalaryModel
    {
        public int Id { get; set; }
        public int Month { get; set; }
        public int WorkDaysInMonth { get; set; }
        public int TotalDaysWorked { get; set; }
        public double TotalHoursWorked { get; set; }
        public int Bonus { get; set; }
        public int Total { get; set; }
        public bool IsPaid { get; set; }
        public DateTime CreateOn { get; set; } = DateTime.Now;
        public string? Note { get; set; }

        // Relationship
        public int StaffId { get; set; }
        public StaffModel Staff { get; set; }
    }
}
