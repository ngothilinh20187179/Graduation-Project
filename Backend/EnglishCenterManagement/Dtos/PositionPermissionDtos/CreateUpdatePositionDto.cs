using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos.SubjectRoomDtos
{
    public class CreateUpdatePositionDto
    {
        public string Name { get; set; }
        public int SalaryMin { get; set; }
        public int SalaryMax { get; set; }
        public int HourlyRate { get; set; }
    }
}
