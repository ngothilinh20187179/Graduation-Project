namespace EnglishCenterManagement.Dtos.SchoolDto
{
    public class BasicClassRoomInfoDto
    {
        public int Id { get; set; }
        public string ClassTitle { get; set; } = string.Empty;
        public DateOnly ClassStartDate { get; set; }
        public DateOnly ClassEndDate { get; set; }
        public TimeOnly? PeriodStart { get; set; }
        public TimeOnly? PeriodEnd { get; set; }
    }
}
