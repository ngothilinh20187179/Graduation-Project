using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos.ClassRoomDto
{
    public class CreateClassDto
    {
        public string ClassName { get; set; } = string.Empty;
        public DateOnly ClassStartDate { get; set; }
        public DateOnly? ClassEndDate { get; set; }
        public int NumberOfStudents { get; set; }
        public double Credit { get; set; }
        public string? Note { get; set; }
        public ClassStatusType ClassStatus { get; set; } = ClassStatusType.NotStart;
        public int SubjectId { get; set; }
        public List<CreateClassScheduleDto> ClassSchedules { get; set; }
    }
}
