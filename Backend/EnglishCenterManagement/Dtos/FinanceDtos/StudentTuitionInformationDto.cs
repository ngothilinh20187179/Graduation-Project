using EnglishCenterManagement.Dtos.ClassRoomDtos;
using EnglishCenterManagement.Dtos.UserInfoDtos;

namespace EnglishCenterManagement.Dtos.FinanceDtos
{
    public class StudentTuitionInformationDto
    {
        public int Id { get; set; }
        public bool IsPaidTuition { get; set; } = false;
        public string? Note { get; set; }
        public int StudentId { get; set; }
        public int ClassId { get; set; }
        public BasicUserInfoDto StudentInfo { get; set; } 
        public BasicClassRoomInfoDto ClassInfo { get; set; }

    }
}
