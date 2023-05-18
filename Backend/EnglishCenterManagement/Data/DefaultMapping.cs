using AutoMapper;
using EnglishCenterManagement.Dtos.AuthenticationDtos;
using EnglishCenterManagement.Dtos.ClassRoomDto;
using EnglishCenterManagement.Dtos.SchoolDto;
using EnglishCenterManagement.Dtos.SchoolRoomDto;
using EnglishCenterManagement.Dtos.TeacherStudentStaffDto;
using EnglishCenterManagement.Dtos.UserInfoDto;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Data
{
    public class DefaultMapping : Profile
    {
        public DefaultMapping()
        {
            CreateMap<RefreshTokenDto, RefreshTokenModel>();

            CreateMap<ChangePasswordDto, UserInfoModel>();

            CreateMap<AvatarModel, AvatarDto>();

            CreateMap<RegisterDto, UserInfoModel>();

            CreateMap<CreateStudentDto, StudentModel>();

            CreateMap<StudentModel, StudentProfileDetailDto>().ReverseMap();

            CreateMap<UserInfoModel, StudentProfileDetailDto>().ReverseMap();

            CreateMap<TeacherModel, TeacherProfileDetailDto>().ReverseMap();

            CreateMap<UserInfoModel, TeacherProfileDetailDto>().ReverseMap();

            CreateMap<StaffModel, StaffProfileDetailDto>().ReverseMap();

            CreateMap<UserInfoModel, StaffProfileDetailDto>().ReverseMap();

            CreateMap<CreateTeacherDto, TeacherModel>();

            CreateMap<UserInfoDto, UserInfoModel>();

            CreateMap<UserInfoModel, UserInfoDto>();

            CreateMap<RoleDto, UserInfoModel>();

            CreateMap<UserInfoModel, RoleDto>();

            CreateMap<UserInfoModel, BasicUserInfoDto>();

            CreateMap<UserInfoModel, UserProfileDetailDto>();

            CreateMap<RoomModel, RoomDto>();

            CreateMap<CreateUpdateRoomDto, RoomModel>();

            CreateMap<SubjectModel, SubjectDto>();

            CreateMap<CreateUpdateSubjectDto, SubjectModel>();

            CreateMap<ClassModel, BasicClassRoomInfoDto>();

            CreateMap<ClassModel, ClassRoomDetailDto>();

            CreateMap<ClassScheduleModel, ClassScheduleDto>();
        }
    }
}
