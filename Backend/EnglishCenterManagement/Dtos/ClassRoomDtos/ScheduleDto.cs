using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos.ClassRoomDtos
{
    public class ScheduleDto
    {
        public ClassPeriodType Period { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
    }
}
