namespace EnglishCenterManagement.Dtos.SchoolDto
{
    public class ClassScheduleDto
    {
        public int Id { get; set; }
        public TimeOnly PeriodStart { get; set; }
        public TimeOnly PeriodEnd { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public int RoomId { get; set; }
        public string RoomName { get; set; }
    }
}
