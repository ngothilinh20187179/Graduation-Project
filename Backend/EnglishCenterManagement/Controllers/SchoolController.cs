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
using System.Data;
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
            var mappedListStudents = _mapper.Map<List<BasicStudentTeacherInfoDto>>(listStudents.Data);
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
            var mappedListTeachers = _mapper.Map<List<BasicStudentTeacherInfoDto>>(listTeachers.Data);
            listTeachers.Data = mappedListTeachers;

            return Ok(listTeachers);
        }

        // GET: /class-detail/5
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
            return Ok(new ApiReponse(mappedClassDetailInfo));
        }

        // GET teachers and students in class


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
