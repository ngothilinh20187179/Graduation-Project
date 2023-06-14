using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Entities.Models
{
    public class ClassScheduleModel
    {
        public int Id { get; set; }
        public ClassPeriodType Period { get; set; }
        public DayOfWeek DayOfWeek { get; set; }

        // relationship
        public int ClassId { get; set; }
        public int RoomId { get; set; }
        public RoomModel Room { get; set; }
        public ClassModel Class { get; set; }

    }
}
