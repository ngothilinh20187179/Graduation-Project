using EnglishCenterManagement.Dtos.SubjectRoomDtos;
using EnglishCenterManagement.Dtos.UserInfoDtos;
using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos.ClassRoomDtos
{
    public class ClassRoomDetailDto : BasicClassRoomInfoDto
    {
        public string? Note { get; set; }
        public ClassStatusType ClassStatus { get; set; }
        public SubjectDto Subject { get; set; }
        public ICollection<ClassScheduleDto> ClassSchedules { get; set; }
        public ICollection<BasicUserInfoDto>? Teachers { get; set; }
    }
}
