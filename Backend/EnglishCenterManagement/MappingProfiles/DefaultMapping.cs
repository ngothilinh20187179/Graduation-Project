using AutoMapper;
using EnglishCenterManagement.Dtos;
using EnglishCenterManagement.Models;

namespace EnglishCenterManagement.MappingProfiles
{
    public class DefaultMapping : Profile
    {
        public DefaultMapping()
        {
            CreateMap<RegisterDto, UserInfoModel>();
            CreateMap<RefreshTokenDto, RefreshTokenModel>();
            CreateMap<RoleModel, RoleDto>();
            CreateMap<ChangePasswordDto, UserInfoModel>();
            CreateMap<UserInfoDto, UserInfoModel>();
        }
    }
}
