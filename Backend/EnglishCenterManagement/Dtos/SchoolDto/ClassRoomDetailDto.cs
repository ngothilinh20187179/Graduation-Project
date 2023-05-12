using EnglishCenterManagement.Dtos.UserInfoDto;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Dtos.SchoolDto
{
    public class ClassRoomDetailDto : BasicClassRoomInfoDto
    {
        public SubjectDto Subject { get; set; }
        public ICollection<ClassScheduleDto> ClassSchedules { get; set; }
        public ICollection<BasicUserInfoDto>? Teachers { get; set; }
    }
}
