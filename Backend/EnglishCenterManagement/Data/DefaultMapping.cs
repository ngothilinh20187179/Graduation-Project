using AutoMapper;
using EnglishCenterManagement.Dtos;
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
            CreateMap<BasicUserInfoDto, UserInfoModel>();
            CreateMap<UserInfoModel, BasicUserInfoDto>();
            CreateMap<UserInfoModel, UserProfileDto>();
            CreateMap<RoleDto, UserInfoModel>();
            CreateMap<UserInfoModel, RoleDto>();
            CreateMap<UserInfoModel, UserProfileHasAvatarDto>();
        }
    }
}
