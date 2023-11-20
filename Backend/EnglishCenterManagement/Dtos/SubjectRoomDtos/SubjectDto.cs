using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos.SubjectRoomDtos
{
    public class SubjectDto
    {
        public int Id { get; set; }
        public string SubjectName { get; set; } = string.Empty;
        public string SubjectDescription { get; set; } = string.Empty;
        public SubjectStatusType SubjectStatus { get; set; }
        public string? Note { get; set; }
    }
}
