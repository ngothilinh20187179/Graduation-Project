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
            CreateMap<RegisterDto, UserProfile>();
            CreateMap<RegisterDto, Credential>();
            CreateMap<Role, RoleDto>();
        }
    }
}
