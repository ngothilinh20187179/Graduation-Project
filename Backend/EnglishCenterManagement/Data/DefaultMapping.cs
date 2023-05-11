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

            CreateMap<UserInfoDto, UserInfoModel>();
            CreateMap<UserInfoModel, UserInfoDto>();

            CreateMap<RoleDto, UserInfoModel>();
            CreateMap<UserInfoModel, RoleDto>();

            CreateMap<UserInfoModel, BasicUserInfoDto>();
            CreateMap<UserInfoModel, UserProfileDetailDto>();

            CreateMap<RoomModel, RoomDto>();
            CreateMap<CreateUpdateRoomDto, RoomDto>();
            CreateMap<SubjectModel, SubjectDto>();
            CreateMap<CreateUpdateSubjectDto, SubjectModel>();

            CreateMap<ClassModel, BasicClassRoomInfoDto>();
            CreateMap<ClassModel, ClassRoomDetailDto>();
        }
    }
}
