using EnglishCenterManagement.Dtos.UserInfoDto;

namespace EnglishCenterManagement.Dtos.SchoolDto
{
    public class ClassRoomDetailDto : BasicClassRoomInfoDto
    {
        public SubjectDto Subject { get; set; }
        public RoomDto? Room { get; set; }
        public ICollection<BasicUserInfoDto>? Teachers { get; set; }
    }
}
