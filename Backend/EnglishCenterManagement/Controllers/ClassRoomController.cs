using AutoMapper;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.ClassRoomDto;
using EnglishCenterManagement.Dtos.SchoolRoomDto;
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
    public class ClassRoomController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IClassRoomRepository _classRoomRepository;
        private readonly ISubjectRoomRepository _subjectRoomRepository;
        private readonly ITeacherStudentRepository _teacherStudentRepository;
        public ClassRoomController(
            IMapper mapper,
            IClassRoomRepository classRoomRepository,
            ISubjectRoomRepository subjectRoomRepository,
            IUserRepository userRepository,
            ITeacherStudentRepository teacherStudentRepository
            )
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _classRoomRepository = classRoomRepository;
            _subjectRoomRepository = subjectRoomRepository;
            _teacherStudentRepository = teacherStudentRepository;
        }

        #region CLASS
        // GET: /classes
        [HttpGet("classes")]
        public ActionResult<PagedResponse> GetAllClasses(string? search, int page = 1, int pageSize = 20)
        {
            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 || pageSize < 1 ? 20 : pageSize;

            var listClasses = _classRoomRepository.GetAllClasses(search, page, pageSize);
            var mappedListClasses = _mapper.Map<List<BasicClassRoomInfoDto>>(listClasses.Data);
            listClasses.Data = mappedListClasses;

            return Ok(listClasses);
        }

        // GET: /classes/5
        [HttpGet("classes/{id}")]
        public ActionResult<ClassRoomDetailDto> GetClassById(int id)
        {
            var getClassById = _classRoomRepository.GetClassById(id);
            if (getClassById == null)
            {
                return NotFound(new ApiReponse(626));
            }

            var mappedClassDetailInfo = _mapper.Map<ClassRoomDetailDto>(getClassById);

            // Subject of class
            var getSubjectById = _subjectRoomRepository.GetSubjectById(getClassById.SubjectId);
            var mappedSubject = _mapper.Map<SubjectDto>(getSubjectById);
            mappedClassDetailInfo.Subject = mappedSubject;

            // Schedules
            var getListSchedulesOfClass = _classRoomRepository.GetAllSchedulesOfClass(id);
            var mappedListSchedulesOfClass = _mapper.Map<List<ClassScheduleDto>>(getListSchedulesOfClass);
            mappedListSchedulesOfClass.ForEach((item) =>
            {
                var room = _subjectRoomRepository.GetRoomById(item.RoomId);
                item.RoomName = room.Name;
            });
            mappedClassDetailInfo.ClassSchedules = mappedListSchedulesOfClass;

            // Teachers of class
            var getListTeachersInClass = _teacherStudentRepository.GetAllTeachersInClass(id);
            var mappedTeachersInClass = _mapper.Map<List<BasicUserInfoDto>>(getListTeachersInClass);
            mappedClassDetailInfo.Teachers = mappedTeachersInClass;

            return Ok(new ApiReponse(mappedClassDetailInfo));
        }

        // GET: /subjects/5/classes
        [HttpGet("subject/{id}/classes")]
        public ActionResult<PagedResponse> GetAllClassesBySubject(string? search, int id, int page = 1, int pageSize = 20)
        {
            if (_subjectRoomRepository.GetSubjectById(id) == null)
            {
                return NotFound(new ApiReponse(629));
            }

            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 || pageSize < 1 ? 20 : pageSize;

            var listClassesBySubject = _classRoomRepository.GetAllClassesBySubject(search, id, page, pageSize);
            var mappedListClasses = _mapper.Map<List<BasicClassRoomInfoDto>>(listClassesBySubject.Data);
            listClassesBySubject.Data = mappedListClasses;

            return Ok(listClassesBySubject);
        }

        // GET: /student/5/classes
        [HttpGet("student/{id}/classes")]
        [Authorize(Roles = "Admin, Staff, Student")]
        public ActionResult<PagedResponse> GetAllClassesOfStudent(string? search, int id, int page = 1, int pageSize = 20)
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

            var getStudentById = _teacherStudentRepository.GetStudentById(id);
            if (getStudentById == null)
            {
                return NotFound(new ApiReponse(635));
            }

            if (user.Role == RoleType.Student && (!_teacherStudentRepository.CheckStudentClassExists(id, user.Id)))
            {
                return Unauthorized(new ApiReponse(1000));
            }

            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 || pageSize < 1 ? 20 : pageSize;

            var listClassesOfStudent = _classRoomRepository.GetAllClassesOfStudent(search, id, page, pageSize);
            var mappedListClasses = _mapper.Map<List<BasicClassRoomInfoDto>>(listClassesOfStudent.Data);
            listClassesOfStudent.Data = mappedListClasses;

            return Ok(new ApiReponse(listClassesOfStudent));
        }

        // GET: /teacher/5/classes
        [HttpGet("teacher/{id}/classes")]
        [Authorize(Roles = "Admin, Staff, Teacher")]
        public ActionResult<PagedResponse> GetAllClassesOfTeacher(int id, string? search, int page = 1, int pageSize = 20)
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

            var getTeacherById = _teacherStudentRepository.GetTeacherById(id);
            if (getTeacherById == null)
            {
                return NotFound(new ApiReponse(636));
            }

            if (user.Role == RoleType.Teacher && (!_teacherStudentRepository.CheckTeacherClassExists(id, user.Id)))
            {
                return Unauthorized(new ApiReponse(1000));
            }

            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 || pageSize < 1 ? 20 : pageSize;

            var listClassesOfTeacher = _classRoomRepository.GetAllClassesOfTeacher(search, id, page, pageSize);
            var mappedListClasses = _mapper.Map<List<BasicClassRoomInfoDto>>(listClassesOfTeacher.Data);
            listClassesOfTeacher.Data = mappedListClasses;

            return Ok(new ApiReponse(listClassesOfTeacher));
        }

        // TODO POST: /create-class
        // Tạo thông tin lớp học, tạo lịch học, gán phòng học
        // => cần check phòng đó vào giờ đó ngày đó có lớp nào đang học ko => thêm API get list room trống
        // => cần set status cho class đó (đã kết thúc/chưa kết thúc/tạm dừng)
        [HttpPost("create-class")]
        [Authorize(Roles = "Admin, Staff")]
        #endregion

        #region CLASS - REFERENCE
        // TODO POST: /add-teacher-class
        // TODO DELETE: /remove-student/5 => chỉ cho xóa khi class chưa bđ (status)
        // TODO POST: /add-student-class
        // cần check xem student/teacher đó có class khác trùng lịch ko
        // TODO POST: /create-new-student-class
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
