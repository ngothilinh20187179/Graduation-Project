using AutoMapper;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.PositionPermissionDtos;
using EnglishCenterManagement.Dtos.SubjectRoomDtos;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Interfaces;
using EnglishCenterManagement.Repository;
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

        // GET: /position/5
        [HttpGet("position/{id}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult<PositionInfoDto> GetPositionById(int id)
        {
            var getPositionById = _positionPermissionRepository.GetPositionById(id);
            if (getPositionById == null)
            {
                return NotFound(new ApiReponse(650));
            }

            var positionMap = _mapper.Map<PositionInfoDto>(getPositionById);

            return Ok(new ApiReponse(positionMap));
        }



        // POST: /create-position
        [HttpPost("create-position")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult CreatePosition([FromBody] CreateUpdatePositionDto newPosition)
        {
            if (newPosition == null) return BadRequest(new ApiReponse(600));

            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            if (_positionPermissionRepository.CheckPositionNameExists(newPosition.Name))
            {
                return Conflict(new ApiReponse(651));
            }

            var mappedPosition = _mapper.Map<PositionModel>(newPosition);
            if (!_positionPermissionRepository.CreatePosition(mappedPosition))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status201Created);
        }

        // PUT: /update-position
        [HttpPut("update-position/{id}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult UpdatePosition(int id, [FromBody] CreateUpdatePositionDto updatedPosition)
        {
            if (updatedPosition == null) return BadRequest(new ApiReponse(600));

            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            var getPositionById = _positionPermissionRepository.GetPositionById(id);
            if (getPositionById == null)
            {
                return NotFound(new ApiReponse(650));
            }

            if (_positionPermissionRepository.CheckPositionNameExists(id, updatedPosition.Name))
            {
                return Conflict(new ApiReponse(651));
            }

            var mappedPosition = _mapper.Map(updatedPosition, getPositionById);
            if (!_positionPermissionRepository.UpdatePosition(mappedPosition))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status204NoContent);
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
