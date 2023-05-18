using EnglishCenterManagement.Dtos.SchoolRoomDto;
using EnglishCenterManagement.Dtos.UserInfoDto;

namespace EnglishCenterManagement.Dtos.ClassRoomDto
{
    public class ClassRoomDetailDto : BasicClassRoomInfoDto
    {
        public SubjectDto Subject { get; set; }
        public ICollection<ClassScheduleDto> ClassSchedules { get; set; }
        public ICollection<BasicUserInfoDto>? Teachers { get; set; }
    }
}
