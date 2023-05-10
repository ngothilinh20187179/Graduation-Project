using AutoMapper;
using EnglishCenterManagement.Dtos.AuthenticationDtos;
using EnglishCenterManagement.Dtos.SchoolDto;
using EnglishCenterManagement.Dtos.UserInfoDto;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Data
{
    public class DefaultMapping : Profile
    {
        public DefaultMapping()
        {
            CreateMap<RegisterDto, UserInfoModel>();
            CreateMap<RefreshTokenDto, RefreshTokenModel>();
            CreateMap<ChangePasswordDto, UserInfoModel>();
            CreateMap<AvatarModel, AvatarDto>();

            CreateMap<BasicUserInfoDto, UserInfoModel>();
            CreateMap<UserInfoModel, BasicUserInfoDto>();

            CreateMap<RoleDto, UserInfoModel>();
            CreateMap<UserInfoModel, RoleDto>();

            CreateMap<UserInfoModel, BasicStudentTeacherInfoDto>();

            CreateMap<UserInfoModel, UserProfileHasAvatarDto>();

            CreateMap<RoomModel, RoomDto>();
            CreateMap<SubjectModel, SubjectDto>();

            CreateMap<ClassModel, BasicClassRoomInfoDto>();
            CreateMap<ClassModel, ClassRoomDetailDto>();
        }
    }
}
