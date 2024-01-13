using EnglishCenterManagement.Dtos.ClassRoomDtos;

namespace EnglishCenterManagement.Dtos.TeacherStudentStaffDtos
{
    public class TeachingScheduleDto
    {
        public int Id { get; set; }
        public string ClassName { get; set; } = string.Empty;
        public ICollection<ClassScheduleDto> Schedules { get; set; }
    }
}
