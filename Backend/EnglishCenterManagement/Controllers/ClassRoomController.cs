using AutoMapper;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.ClassRoomDtos;
using EnglishCenterManagement.Dtos.ExaminationDtos;
using EnglishCenterManagement.Dtos.SubjectRoomDtos;
using EnglishCenterManagement.Dtos.UserInfoDtos;
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

            return Ok(new ApiReponse(listClasses));
        }

        // GET: /class/5
        [HttpGet("class/{id}")]
        [Authorize]
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
        
        // GET: /my-classes
        [HttpGet("my-classes")]
        [Authorize(Roles = nameof(RoleType.Student))]
        public ActionResult<PagedResponse> GetMyClasses(string? search, int page = 1, int pageSize = 20)
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

            var listClassesOfStudent = _classRoomRepository.GetAllClassesOfStudent(search, user.Id, page, pageSize);
            var mappedListClasses = _mapper.Map<List<BasicClassRoomInfoDto>>(listClassesOfStudent.Data);
            listClassesOfStudent.Data = mappedListClasses;

            return Ok(new ApiReponse(listClassesOfStudent));
        }


        // GET: /teacher-classes
        [HttpGet("teacher-classes")]
        [Authorize(Roles = nameof(RoleType.Teacher))]
        public ActionResult<PagedResponse> GetTeacherClasses(string? search, int page = 1, int pageSize = 20)
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

            var listClassesOfTeacher = _classRoomRepository.GetAllClassesOfTeacher(search, user.Id, page, pageSize);
            var mappedListClasses = _mapper.Map<List<BasicClassRoomInfoDto>>(listClassesOfTeacher.Data);
            listClassesOfTeacher.Data = mappedListClasses;

            return Ok(new ApiReponse(listClassesOfTeacher));
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

        // POST: /create-class
        [HttpPost("create-class")]
        [Authorize(Roles = "Admin, Staff")]
        public ActionResult CreateNewClass([FromBody] CreateClassDto createClassDto)
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
            var subject = _subjectRoomRepository.GetSubjectById(createClassDto.SubjectId);
            if (subject == null)
            {
                return NotFound(new ApiReponse(629));
            }
            if (_classRoomRepository.CheckClassNameExists(createClassDto.ClassName))
            {
                return Conflict(new ApiReponse(645));
            }

            var mappedClass = _mapper.Map<ClassModel>(createClassDto);
           
            // check room + period + dayofweek có bị trùng với class nào đó có status NotStart || InProgress (nếu status là Stop/End thì ok
            var mappedSchedule = _mapper.Map<List<ClassScheduleModel>>(createClassDto.ClassSchedules);
            
            for ( var i = 0; i < mappedSchedule.Count; i++)
            {
                if (_classRoomRepository.CheckIsSameSchedule(mappedSchedule[i]))
                {
                    return Conflict(new ApiReponse(646));
                }
            }

            mappedSchedule.ForEach(item =>
            {
                item.ClassId = mappedClass.Id;
            });

            _classRoomRepository.CreateClass(mappedClass);

            return StatusCode(StatusCodes.Status201Created);
        }

        // TODO PUT: edit-class/id

        // DELETE: /remove-class/5
        [HttpDelete("remove-class/{id}")]
        [Authorize(Roles = "Admin, Staff")]
        public ActionResult DeleteDelete(int id)
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

            var getClassById = _classRoomRepository.GetClassById(id);
            if (getClassById == null)
            {
                return NotFound(new ApiReponse(626));
            }

            if (getClassById.ClassStatus != ClassStatusType.NotStart)
            {
                return BadRequest(new ApiReponse(656));
            }

            if (!_classRoomRepository.DeleteClass(getClassById))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return NoContent();
        }
        #endregion

        #region CLASS - REFERENCE

        // TODO: CHECK SCHEDULE // add thủ công
        [HttpPost("add-teacher-to-class")]
        [Authorize(Roles = nameof(RoleType.Staff))]
        public ActionResult AddTeacherToClass([FromBody] AddTeacherClassDto addTeacherClassDto)
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

            var getClassById = _classRoomRepository.GetClassById(addTeacherClassDto.ClassId);
            if (getClassById == null)
            {
                return NotFound(new ApiReponse(626));
            }

            bool checkTeacherIds = _teacherStudentRepository.TeacherNotExist(addTeacherClassDto.TeacherId);
            if (checkTeacherIds)
            {
                return NotFound(new ApiReponse(636));
            }

            // TODO: check schedule của lớp đó có trùng lịch của giáo viên đó ở lớp khác ko

            var allTeachetClasses = _teacherStudentRepository.GetTeacherClassByClassId(addTeacherClassDto.ClassId);
            allTeachetClasses?.ToList().ForEach(x =>
                {
                    _teacherStudentRepository.DeleteTeacherInClass(x);
                });

            TeacherClassModel teacherClass = new TeacherClassModel();
            teacherClass.ClassId = addTeacherClassDto.ClassId;
            addTeacherClassDto.TeacherId.ForEach(x =>
            {
                teacherClass.TeacherId = x;
                _teacherStudentRepository.AddTeacherClass(teacherClass);
            });

            return StatusCode(StatusCodes.Status201Created);
        }

        // TODO: sắp xếp tkb
        // TODO DELETE: /remove-student/5
        // TODO POST: /add-student-class


        [HttpPost("take-student-attendance")]
        [Authorize(Roles = nameof(RoleType.Teacher))]
        public ActionResult EnterTranscript([FromBody] TakeStudentAttendanceDto takeStudentAttendanceDto)
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

            var getClassById = _classRoomRepository.GetClassById(takeStudentAttendanceDto.ClassId);
            if (getClassById == null)
            {
                return NotFound(new ApiReponse(626));
            }

            takeStudentAttendanceDto.Data.ForEach(x =>
            {
                var studentClassId = _teacherStudentRepository.GetStudentClassId(takeStudentAttendanceDto.ClassId, x.Id);
                var studentAttendance = new StudentAttendanceDto
                {
                    Status = x.Status,
                    Reason = x.Reason,
                    StudentClassId = studentClassId.Id
                };
                var mappedstudentAttendance = _mapper.Map<StudentAttendanceModel>(studentAttendance);
                _teacherStudentRepository.CreateStudentAttendance(mappedstudentAttendance);
            });

            return StatusCode(StatusCodes.Status201Created);
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
