using AutoMapper;
using EnglishCenterManagement.Dtos;
using EnglishCenterManagement.Models;
using System.Diagnostics.Metrics;

namespace EnglishCenterManagement.MappingProfiles
{
    public class DefaultMapping : Profile
    {
        public DefaultMapping()
        {
            CreateMap<RegisterDto, UserInfoModel>();
            CreateMap<RegisterDto, CredentialModel>();
            CreateMap<RoleModel, RoleDto>();
        }
    }
}
