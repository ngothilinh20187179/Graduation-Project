namespace EnglishCenterManagement.Entities.FinanceDtos
{
    public class CreateEditTeacherSalaryDto
    {
        public int Month { get; set; }
        public double TotalHoursWorked { get; set; }
        public int Bonus { get; set;}
        public int Total { get; set; }
        public bool IsPaid { get; set; }
        public int teacherId { get; set; }
        public string? Note { get; set; }
    }
}
