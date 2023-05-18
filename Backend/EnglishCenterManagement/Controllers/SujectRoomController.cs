using AutoMapper;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.SchoolRoomDto;
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
    public class SujectRoomController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly ISchoolRepository _schoolRepository;
        public SujectRoomController(
            IMapper mapper,
            ISchoolRepository schoolRepository,
            IUserRepository userRepository
            )
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _schoolRepository = schoolRepository;
        }

        #region SUBJECT
        // GET: /subjects
        [HttpGet("subjects")]
        public ActionResult<PagedResponse> GetAllSubjects(string? search, SubjectStatusType? subjectStatus, int page = 1, int pageSize = 20)
        {
            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 || pageSize < 1 ? 20 : pageSize;

            var listSubjects = _schoolRepository.GetAllSubjects(search, subjectStatus, page, pageSize);
            var mappedListSubjects = _mapper.Map<List<SubjectDto>>(listSubjects.Data);
            listSubjects.Data = mappedListSubjects;

            return Ok(listSubjects);
        }

        // POST: /create-subject
        [HttpPost("create-subject")]
        [Authorize(Roles = "Admin, Staff")]
        public ActionResult CreateSubject([FromBody] CreateUpdateSubjectDto newSubject)
        {
            if (newSubject == null) return BadRequest(new ApiReponse(600));

            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatus.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            if (_schoolRepository.CheckSubjectExists(newSubject.SubjectName))
            {
                return Conflict(new ApiReponse(627));
            }

            if (!(Enum.IsDefined(typeof(SubjectStatusType), newSubject.SubjectStatus)))
            {
                return BadRequest(new ApiReponse(628));
            }

            var mappedSubject = _mapper.Map<SubjectModel>(newSubject);
            if (!_schoolRepository.CreateSubject(mappedSubject))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status201Created);
        }

        // PUT: /update-subject
        [HttpPut("update-subject/{id}")]
        [Authorize(Roles = "Admin, Staff")]
        public ActionResult UpdateSubject(int id, [FromBody] CreateUpdateSubjectDto updatedSubject)
        {
            if (updatedSubject == null) return BadRequest(new ApiReponse(600));

            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatus.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            var getSubjectById = _schoolRepository.GetSubjectById(id);
            if (getSubjectById == null)
            {
                return NotFound(new ApiReponse(629));
            }

            if (_schoolRepository.CheckSubjectExists(id, updatedSubject.SubjectName))
            {
                return Conflict(new ApiReponse(627));
            }

            if (!(Enum.IsDefined(typeof(SubjectStatusType), updatedSubject.SubjectStatus)))
            {
                return BadRequest(new ApiReponse(628));
            }

            var mappedSubject = _mapper.Map(updatedSubject, getSubjectById);
            if (!_schoolRepository.UpdateSubject(mappedSubject))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status204NoContent);
        }

        // DELETE: /remove-subject
        [HttpDelete("remove-subject/{id}")]
        [Authorize(Roles = "Admin, Staff")]
        public ActionResult DeleteSubject(int id)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatus.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            var getSubjectById = _schoolRepository.GetSubjectById(id);
            if (getSubjectById == null)
            {
                return NotFound(new ApiReponse(629));
            }

            // Note: Chỉ xóa được khi Subject chưa được reference tới bất kỳ Class nào
            if (_schoolRepository.CheckSubjectExistsInClass(id))
            {
                return BadRequest(new ApiReponse(630));
            }

            if (!_schoolRepository.DeleteSubject(getSubjectById))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return NoContent();
        }
        #endregion

        #region ROOM
        // GET: /rooms
        [HttpGet("rooms")]
        [Authorize(Roles = "Admin, Staff")]
        public ActionResult<PagedResponse> GetAllRooms(string? search, RoomStatusType? roomStatus, int page = 1, int pageSize = 20)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatus.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 || pageSize < 1 ? 20 : pageSize;

            var listRooms = _schoolRepository.GetAllRooms(search, roomStatus, page, pageSize);
            var mappedListRooms = _mapper.Map<List<RoomDto>>(listRooms.Data);
            listRooms.Data = mappedListRooms;

            return Ok(listRooms);
        }

        // POST: /create-room
        [HttpPost("create-room")]
        [Authorize(Roles = "Admin, Staff")]
        public ActionResult CreateRoom([FromBody]CreateUpdateRoomDto newRoom)
        {
            if (newRoom == null) return BadRequest(new ApiReponse(600));

            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatus.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            if (_schoolRepository.CheckRoomExists(newRoom.Name))
            {
                return Conflict(new ApiReponse(631));
            }

            if (!(Enum.IsDefined(typeof(RoomStatusType), newRoom.RoomStatus)))
            {
                return BadRequest(new ApiReponse(632));
            }

            var mappedRoom = _mapper.Map<RoomModel>(newRoom);
            if (!_schoolRepository.CreateRoom(mappedRoom))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return StatusCode(StatusCodes.Status201Created);
        }

        // PUT: /update-room
        [HttpPut("update-room/{id}")]
        [Authorize(Roles = "Admin, Staff")]
        public ActionResult UpdateRoom(int id, [FromBody]CreateUpdateRoomDto updatedRoom)
        {
            if (updatedRoom == null) return BadRequest(new ApiReponse(600));
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatus.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            var getRoomById = _schoolRepository.GetRoomById(id);
            if (getRoomById == null)
            {
                return NotFound(new ApiReponse(633));
            }
            if (_schoolRepository.CheckRoomExists(id, updatedRoom.Name))
            {
                return Conflict(new ApiReponse(631));
            }
            if (!(Enum.IsDefined(typeof(RoomStatusType), updatedRoom.RoomStatus)))
            {
                return BadRequest(new ApiReponse(632));
            }
            var mappedRoom = _mapper.Map(updatedRoom, getRoomById);
            if (!_schoolRepository.UpdateRoom(mappedRoom))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return StatusCode(StatusCodes.Status204NoContent);
        }

        // DELETE: /remove-room
        [HttpDelete("remove-room/{id}")]
        [Authorize(Roles = "Admin, Staff")]
        public ActionResult DeleteRoom(int id)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatus.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            var getRoomById = _schoolRepository.GetRoomById(id);
            if (getRoomById == null)
            {
                return NotFound(new ApiReponse(633));
            }

            if (_schoolRepository.IsUsedRoom(id))
            {
                return BadRequest(new ApiReponse(634));
            }

            if (!_schoolRepository.DeleteRoom(getRoomById))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return NoContent();
        }
        #endregion

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
