using AutoMapper;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.SchoolDto;
using EnglishCenterManagement.Dtos.UserInfoDto;
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
    public class SchoolController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly ISchoolRepository _schoolRepository;
        public SchoolController(
            IMapper mapper,
            ISchoolRepository schoolRepository,
            IUserRepository userRepository
            )
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _schoolRepository = schoolRepository;
        }

        // GET: /subjects
        [HttpGet("subjects")]
        [Authorize(Roles = "Admin, Staff")]
        public ActionResult<PagedResponse> GetAllSubjects(string? search, SubjectStatusType? subjectStatus, int page = 1, int pageSize = 20)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }

            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 ? 20 : pageSize;

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

            var getSubjectById = _schoolRepository.GetSubjectById(id);
            if (getSubjectById == null)
            {
                return NotFound(new ApiReponse(629));
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

            return StatusCode(StatusCodes.Status201Created);
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

            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 ? 20 : pageSize;

            var listRooms = _schoolRepository.GetAllRooms(search, roomStatus, page, pageSize);
            var mappedListRooms = _mapper.Map<List<RoomDto>>(listRooms.Data);
            listRooms.Data = mappedListRooms;

            return Ok(listRooms);
        }

        // POST: /create-room

        // PUT: /update-room

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

            var getRoomById = _schoolRepository.GetRoomById(id);
            if (getRoomById == null)
            {
                return NotFound(new ApiReponse(633));
            }

            // Note: Chỉ xóa được khi Room chưa được reference tới bất kỳ Class nào
            if (_schoolRepository.CheckRoomExistsInClass(id))
            {
                return BadRequest(new ApiReponse(634));
            }

            if (!_schoolRepository.DeleteRoom(getRoomById))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return NoContent();
        }

        // GET: /students
        // Note: Bên admin đã có API get all users by role nên admin ko cần get all teachers và get all students nữa
        [HttpGet("students")]
        [Authorize(Roles = nameof(RoleType.Staff))]
        public ActionResult<PagedResponse> GetAllStudents(string? search, int page = 1, int pageSize = 20)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }

            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 ? 20 : pageSize;

            var listStudents = _schoolRepository.GetAllStudents(search, page, pageSize);
            var mappedListStudents = _mapper.Map<List<BasicUserInfoDto>>(listStudents.Data);
            mappedListStudents.ForEach((item) =>
            {
                var avatar = _userRepository.GetUserAvatar(item.Id);
                item.Avatar = _mapper.Map<AvatarDto>(avatar);
            });
            listStudents.Data = mappedListStudents;

            return Ok(listStudents);
        }

        // GET: /teachers
        [HttpGet("teachers")]
        [Authorize(Roles = nameof(RoleType.Staff))]
        public ActionResult<PagedResponse> GetAllTeachers(string? search, int page = 1, int pageSize = 20)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }

            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 ? 20 : pageSize;

            var listTeachers = _schoolRepository.GetAllTeachers(search, page, pageSize);
            var mappedListTeachers = _mapper.Map<List<BasicUserInfoDto>>(listTeachers.Data);
            mappedListTeachers.ForEach((item) =>
            {
                var avatar = _userRepository.GetUserAvatar(item.Id);
                item.Avatar = _mapper.Map<AvatarDto>(avatar);
            });
            listTeachers.Data = mappedListTeachers;

            return Ok(listTeachers);
        }


        // TODO: sua lai DateTime ??? cua Class
        // GET: /classes
        [HttpGet("classes")]
        [Authorize]
        public ActionResult<PagedResponse> GetAllClasses(string? search, int page = 1, int pageSize = 20)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }

            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 ? 20 : pageSize;

            var listClasses = _schoolRepository.GetAllClasses(search, page, pageSize);
            var mappedListClasses = _mapper.Map<List<BasicClassRoomInfoDto>>(listClasses.Data);
            listClasses.Data = mappedListClasses;

            return Ok(listClasses);
        }

        // GET: /classes/5
        [HttpGet("classes/{id}")]
        [Authorize]
        public ActionResult<ClassRoomDetailDto> GetClassById(int id)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }

            var getClassById = _schoolRepository.GetClassById(id);
            if (getClassById == null)
            {
                return NotFound(new ApiReponse(626));
            }

            var mappedClassDetailInfo = _mapper.Map<ClassRoomDetailDto>(getClassById);

            // Subject of class
            var getSubjectById = _schoolRepository.GetSubjectById(getClassById.SubjectId);
            var mappedSubject = _mapper.Map<SubjectDto>(getSubjectById);
            mappedClassDetailInfo.Subject = mappedSubject;

            // Room of class
            var getRoomById = _schoolRepository.GetRoomById(getClassById.RoomId);
            var mappedRoomById = _mapper.Map<RoomDto>(getRoomById);
            mappedClassDetailInfo.Room = mappedRoomById;

            // Teachers of class
            var getListTeachersInClass = _schoolRepository.GetAllTeachersInClass(id);
            var mappedTeachersInClass = _mapper.Map<List<BasicUserInfoDto>>(getListTeachersInClass);
            mappedClassDetailInfo.Teachers = mappedTeachersInClass;

            return Ok(new ApiReponse(mappedClassDetailInfo));
        }

        // GET: /classes/5/students
        [HttpGet("classes/{id}/students")]
        [Authorize]
        public ActionResult<PagedResponse> GetAllStudentsInClass(int id, string? search, int page = 1, int pageSize = 20)
        {
            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }

            var getClassById = _schoolRepository.GetClassById(id);
            if (getClassById == null)
            {
                return NotFound(new ApiReponse(626));
            }

            // Học sinh hoặc giáo viên ngoài lớp đó không xem được danh sách lớp
            if (user.Role == RoleType.RestrictedRole || 
                (user.Role == RoleType.Student && (!_schoolRepository.CheckStudentClassExists(id, user.Id))) || 
                (user.Role == RoleType.Teacher && (!_schoolRepository.CheckTeacherClassExists(id, user.Id))))
            {
                return Unauthorized(new ApiReponse(1000));
            }

            // Students of Class
            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 ? 20 : pageSize;

            var getListStudentsInClass = _schoolRepository.GetAllStudentsInClass(id, search, page, pageSize);
            var mappedStudentsInClass = _mapper.Map<List<BasicUserInfoDto>>(getListStudentsInClass.Data);
            mappedStudentsInClass.ForEach((item) =>
            {
                var avatar = _userRepository.GetUserAvatar(item.Id);
                item.Avatar = _mapper.Map<AvatarDto>(avatar);
            });
            getListStudentsInClass.Data = mappedStudentsInClass;

            return Ok(new ApiReponse(getListStudentsInClass));
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
