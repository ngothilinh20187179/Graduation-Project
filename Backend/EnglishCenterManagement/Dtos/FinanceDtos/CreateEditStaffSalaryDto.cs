using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Entities.FinanceDtos
{
    public class CreateEditStaffSalaryDto
    {
        public int Month { get; set; }
        public int WorkDaysInMonth { get; set; }
        public int TotalDaysWorked { get; set; }
        public double TotalHoursWorked { get; set; }
        public int Bonus { get; set; }
        public int Total { get; set; }
        public bool IsPaid { get; set; }
        public int StaffId { get; set; }
        public string? Note { get; set; }
    }
}
