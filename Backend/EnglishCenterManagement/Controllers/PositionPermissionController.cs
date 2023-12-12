using AutoMapper;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.PositionPermissionDtos;
using EnglishCenterManagement.Dtos.SubjectRoomDtos;
using EnglishCenterManagement.Dtos.TeacherStudentStaffDtos;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Interfaces;
using EnglishCenterManagement.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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

        // GET: /position_list
        [HttpGet("position_list")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult<ICollection<PositionModel>> GetBasicPositionList()
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

            var positionList = _positionPermissionRepository.GetBasicPositionList();
            var mapPositionList = _mapper.Map<List<BasicPositionDto>>(positionList);

            return Ok(new ApiReponse(mapPositionList));
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

        // GET: /permissions
        [HttpGet("permissions")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult<ICollection<BasicPermissionDto>> GetAllPermissions()
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

            var listPermissions = _positionPermissionRepository.GetAllPermissions();
            var mappedListPermissions = _mapper.Map<List<BasicPermissionDto>>(listPermissions);

            return Ok(new ApiReponse(mappedListPermissions));
        }

        // PUT: /decentralize-authority/5
        [HttpPut("decentralize-authority/{id}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult DecentralizeAuthority([FromBody] int[] listPermissionId, int id)
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
            var getPositionById = _positionPermissionRepository.GetPositionById(id);
            if (getPositionById == null)
            {
                return NotFound(new ApiReponse(650));
            }
            if (listPermissionId.IsNullOrEmpty())
            {
                return BadRequest(new ApiReponse(600));
            }
            else
            {
                foreach (var item in listPermissionId)
                {
                    if (_positionPermissionRepository.GetPermissionById(item) == null)
                    {
                        return BadRequest(new ApiReponse(652));
                    }
                }

                var listPermissionPosition = _positionPermissionRepository.GetPermissionPositionByPositionId(id);
                if (!listPermissionPosition.IsNullOrEmpty())
                {
                    foreach (var item in listPermissionPosition)
                    {
                        _positionPermissionRepository.DeletePositionPermission(item);
                    }
                }

                PermissionPositionDto permissionPosition = new()
                {
                    PositionId = id
                };
                foreach (var item in listPermissionId)
                {
                    permissionPosition.PermissionId = item;
                    var mappedPermissionPosition = _mapper.Map<PermissionPositionModel>(permissionPosition);
                    if (!_positionPermissionRepository.CreatePositionPermission(mappedPermissionPosition))
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError);
                    }
                }
            }

            return StatusCode(StatusCodes.Status204NoContent);
        }

        // GET: /permissionIds-by-positionId/5
        [HttpGet("permissionIds-by-positionId/{id}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult<ICollection<int>> GetPermissionIdsByPositionId(int id)
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
            var getPositionById = _positionPermissionRepository.GetPositionById(id);
            if (getPositionById == null)
            {
                return NotFound(new ApiReponse(650));
            }
            List<int> permissionIdList = new();
            var getPermissionPositionByPositionId = _positionPermissionRepository.GetPermissionPositionByPositionId(id);
            if(!getPermissionPositionByPositionId.IsNullOrEmpty())
            {
                foreach (var item in getPermissionPositionByPositionId)
                {
                    permissionIdList.Add(item.PermissionId);
                }
            }
            int[] permissionIdArray = permissionIdList.ToArray();

            return Ok(new ApiReponse(permissionIdArray));
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
