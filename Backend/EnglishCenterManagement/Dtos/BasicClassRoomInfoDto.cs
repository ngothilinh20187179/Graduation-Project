using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Dtos
{
    public class BasicClassRoomInfoDto
    {
        public int Id { get; set; }
        public string ClassTitle { get; set; } = string.Empty;
        public DateOnly ClassStartDate { get; set; }
        public DateOnly ClassEndDate { get; set; }
        public TimeOnly? PeriodStart { get; set; }
        public TimeOnly? PeriodEnd { get; set; }
        public double Credit { get; set; }
        public int Number { get; set; }
        public string? Note { get; set; }
    }
}
