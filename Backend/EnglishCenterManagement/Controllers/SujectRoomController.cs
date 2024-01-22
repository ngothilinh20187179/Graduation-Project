using AutoMapper;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.SubjectRoomDtos;
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
        private readonly ISubjectRoomRepository _subjectRoomRepository;
        public SujectRoomController(
            IMapper mapper,
            ISubjectRoomRepository subjectRoomRepository,
            IUserRepository userRepository
            )
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _subjectRoomRepository = subjectRoomRepository;
        }

        #region SUBJECT
        // GET: /subjects
        [HttpGet("subjects")]
        public ActionResult<PagedResponse> GetAllSubjects(string? search, SubjectStatusType? subjectStatus, int page = 1, int pageSize = 20)
        {
            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 || pageSize < 1 ? 20 : pageSize;

            var listSubjects = _subjectRoomRepository.GetAllSubjects(search, subjectStatus, page, pageSize);
            var mappedListSubjects = _mapper.Map<List<SubjectDto>>(listSubjects.Data);
            listSubjects.Data = mappedListSubjects;

            return Ok(new ApiReponse(listSubjects));
        }

        // GET: /open-subjects
        [HttpGet("open-subjects")]
        public ActionResult<ICollection<BasicSubjectDto>> GetOpenSubjects()
        {
            var listSubjects = _subjectRoomRepository.GetOpenSubjects();
            var mappedListSubjects = _mapper.Map<List<BasicSubjectDto>>(listSubjects);

            return Ok(new ApiReponse(mappedListSubjects));
        }

        // GET: /subject/5
        [HttpGet("subject/{id}")]
        public ActionResult<SubjectDto> GetSubjectById(int id)
        {
            var getSubjectById = _subjectRoomRepository.GetSubjectById(id);
            if (getSubjectById == null)
            {
                return NotFound(new ApiReponse(629));
            }

            var subjectMap = _mapper.Map<SubjectDto>(getSubjectById);

            return Ok(new ApiReponse(subjectMap));
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
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            if (_subjectRoomRepository.CheckSubjectExists(newSubject.SubjectName))
            {
                return Conflict(new ApiReponse(627));
            }

            if (!(Enum.IsDefined(typeof(SubjectStatusType), newSubject.SubjectStatus)))
            {
                return BadRequest(new ApiReponse(628));
            }

            var mappedSubject = _mapper.Map<SubjectModel>(newSubject);
            if (!_subjectRoomRepository.CreateSubject(mappedSubject))
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
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            var getSubjectById = _subjectRoomRepository.GetSubjectById(id);
            if (getSubjectById == null)
            {
                return NotFound(new ApiReponse(629));
            }

            if (_subjectRoomRepository.CheckSubjectExists(id, updatedSubject.SubjectName))
            {
                return Conflict(new ApiReponse(627));
            }

            if (!(Enum.IsDefined(typeof(SubjectStatusType), updatedSubject.SubjectStatus)))
            {
                return BadRequest(new ApiReponse(628));
            }

            var mappedSubject = _mapper.Map(updatedSubject, getSubjectById);
            if (!_subjectRoomRepository.UpdateSubject(mappedSubject))
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
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            var getSubjectById = _subjectRoomRepository.GetSubjectById(id);
            if (getSubjectById == null)
            {
                return NotFound(new ApiReponse(629));
            }

            // Note: Chỉ xóa được khi Subject chưa được reference tới bất kỳ Class nào
            if (_subjectRoomRepository.CheckSubjectExistsInClass(id))
            {
                return BadRequest(new ApiReponse(630));
            }

            if (!_subjectRoomRepository.DeleteSubject(getSubjectById))
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
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 || pageSize < 1 ? 20 : pageSize;

            var listRooms = _subjectRoomRepository.GetAllRooms(search, roomStatus, page, pageSize);
            var mappedListRooms = _mapper.Map<List<RoomDto>>(listRooms.Data);
            listRooms.Data = mappedListRooms;

            return Ok(new ApiReponse(listRooms));
        }

        // GET: /open-rooms
        [HttpGet("open-rooms")]
        public ActionResult<ICollection<RoomDto>> GetOpenRooms()
        {
            var listRooms = _subjectRoomRepository.GetOpenRooms();
            var mappedListRooms = _mapper.Map<List<RoomDto>>(listRooms);

            return Ok(new ApiReponse(mappedListRooms));
        }

        [HttpGet("room/{id}")]
        [Authorize(Roles = "Admin, Staff")]
        public ActionResult<RoomDto> GetRoomById(int id)
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
            var getRoomById = _subjectRoomRepository.GetRoomById(id);
            if (getRoomById == null)
            {
                return NotFound(new ApiReponse(633));
            }
            var roomMap = _mapper.Map<RoomDto>(getRoomById);

            return Ok(new ApiReponse(roomMap));
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
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            if (_subjectRoomRepository.CheckRoomExists(newRoom.Name))
            {
                return Conflict(new ApiReponse(631));
            }

            if (!(Enum.IsDefined(typeof(RoomStatusType), newRoom.RoomStatus)))
            {
                return BadRequest(new ApiReponse(632));
            }

            var mappedRoom = _mapper.Map<RoomModel>(newRoom);
            if (!_subjectRoomRepository.CreateRoom(mappedRoom))
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
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            var getRoomById = _subjectRoomRepository.GetRoomById(id);
            if (getRoomById == null)
            {
                return NotFound(new ApiReponse(633));
            }
            if (_subjectRoomRepository.CheckRoomExists(id, updatedRoom.Name))
            {
                return Conflict(new ApiReponse(631));
            }
            if (!(Enum.IsDefined(typeof(RoomStatusType), updatedRoom.RoomStatus)))
            {
                return BadRequest(new ApiReponse(632));
            }
            var mappedRoom = _mapper.Map(updatedRoom, getRoomById);
            if (!_subjectRoomRepository.UpdateRoom(mappedRoom))
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
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            var getRoomById = _subjectRoomRepository.GetRoomById(id);
            if (getRoomById == null)
            {
                return NotFound(new ApiReponse(633));
            }

            if (_subjectRoomRepository.IsUsedRoom(id))
            {
                return BadRequest(new ApiReponse(634));
            }

            if (!_subjectRoomRepository.DeleteRoom(getRoomById))
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
