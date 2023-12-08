using AutoMapper;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.PositionPermissionDtos;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EnglishCenterManagement.Controllers
{
    [Route("api/")]
    [ApiController]
    public class PositionPermissionController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IPositionPermissionRepository _positionPermissionRepository;
        public PositionPermissionController(
            IMapper mapper,
            IUserRepository userRepository,
            IPositionPermissionRepository positionPermissionRepository
            )
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _positionPermissionRepository = positionPermissionRepository;
        }
        // GET: /positions
        [HttpGet("positions")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult<PagedResponse> GetAllPositions(string? search, int page = 1, int pageSize = 20)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }

            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 || pageSize < 1 ? 20 : pageSize;

            var listPositions = _positionPermissionRepository.GetAllPositions(search, page, pageSize);
            var mappedListPositions = _mapper.Map<List<PositionInfoDto>>(listPositions.Data);
            listPositions.Data = mappedListPositions;


            return Ok(new ApiReponse(listPositions));
        }
        private UserInfoModel? GetUserByClaim()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userId = identity?.Claims.FirstOrDefault(x => x.Type == "UserId")?.Value;
            if (userId != null)
            {
                return _userRepository.GetUserByUserId(int.Parse(userId));
            }
            return null;
        }
    }
}
