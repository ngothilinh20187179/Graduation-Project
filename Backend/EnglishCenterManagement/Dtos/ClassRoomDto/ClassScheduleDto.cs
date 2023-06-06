using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos.ClassRoomDto
{
    public class ClassScheduleDto
    {
        public int Id { get; set; }
        //public TimeOnly PeriodStart { get; set; }
        //public TimeOnly PeriodEnd { get; set; }
        public ClassPeriodType Period { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public int RoomId { get; set; }
        public string RoomName { get; set; }
    }
}
