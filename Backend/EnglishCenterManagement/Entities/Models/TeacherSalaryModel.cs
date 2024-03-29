﻿namespace EnglishCenterManagement.Entities.Models
{
    public class TeacherSalaryModel
    {
        public int Id { get; set; }
        public int Month { get; set; }
        public double TotalHoursWorked { get; set; }
        public int Bonus { get; set;}
        public int Total { get; set; }
        public bool IsPaid { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public string? Note { get; set; }
        public int TeacherId { get; set; }

        // Relationship
        public TeacherModel Teacher { get; set; }
    }
}
