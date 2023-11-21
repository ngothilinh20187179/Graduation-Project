using EnglishCenterManagement.Dtos.UserInfoDtos;
using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos.TeacherStudentStaffDtos
{
    // checked
    public class BasicStaffInfoDto: BasicUserInfoDto
    {
        public string PositionName { get; set; }
    }
}
