using AutoMapper;
using EnglishCenterManagement.Dtos;
using EnglishCenterManagement.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;

namespace EnglishCenterManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : Controller
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IMapper _mapper;
        public RoleController(
            IRoleRepository roleRepository,
            IMapper mapper
            )
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
        }

        // GET: /roles/me
        [HttpGet("me")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<RoleDto>>> GetMyRoles()
        {
            var myRoles = _mapper.Map<List<RoleDto>>(_roleRepository.GetMyRoles());
            return Ok(myRoles);
        }

    }
}
