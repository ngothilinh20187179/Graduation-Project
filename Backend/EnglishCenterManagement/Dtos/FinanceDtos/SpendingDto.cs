using EnglishCenterManagement.Dtos.TeacherStudentStaffDtos;
using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos.FinanceDtos
{
    public class SpendingDto
    {
        public int Id { get; set; }
        public string SpendOn { get; set; }
        public int Budget { get; set; }
        public string? Description { get; set; }
        public SpendingStatusType Status { get; set; } = SpendingStatusType.Pending;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int StaffId { get; set; }
        public string Author { get; set; }
    }
}
