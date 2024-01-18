using AutoMapper;
using EnglishCenterManagement.Common.Helpers;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.ClassRoomDtos;
using EnglishCenterManagement.Dtos.TeacherStudentStaffDtos;
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
    public class TeacherController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly ITeacherStudentRepository _teacherStudentRepository;
        private readonly IClassRoomRepository _classRoomRepository;
        private readonly ISubjectRoomRepository _subjectRoomRepository;
        public TeacherController(
            IMapper mapper,
            IUserRepository userRepository,
            ITeacherStudentRepository teacherStudentRepository,
            IClassRoomRepository classRoomRepository,
            ISubjectRoomRepository subjectRoomRepository
            )
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _teacherStudentRepository = teacherStudentRepository;
            _subjectRoomRepository = subjectRoomRepository;
            _classRoomRepository = classRoomRepository;
        }

        #region TEACHER
        // GET: /teachers
        // Note: Bên admin đã có API get all users by role nên admin ko cần get all teachers và get all students nữa
        [HttpGet("teachers")]
        [Authorize(Roles = "Student, Teacher, Staff, Admin")]
        public ActionResult<PagedResponse> GetAllTeachers(string? search, int page = 1, int pageSize = 20)
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

            var listTeachers = _teacherStudentRepository.GetAllTeachers(search, page, pageSize);
            var mappedListTeachers = _mapper.Map<List<BasicUserInfoDto>>(listTeachers.Data);
            mappedListTeachers.ForEach((item) =>
            {
                var avatar = _userRepository.GetUserAvatar(item.Id);
                item.Avatar = _mapper.Map<AvatarDto>(avatar);
            });
            listTeachers.Data = mappedListTeachers;

            return Ok(new ApiReponse(listTeachers));
        }

        // GET: /teacher-list
        [HttpGet("teacher-list")]
        [Authorize(Roles = nameof(RoleType.Staff))]
        public ActionResult<ICollection<UserNameAndIdDto>> GetBasicTeacherList()
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

            var teacherList = _teacherStudentRepository.GetAllTeachers();
            var mapTeacherList = _mapper.Map<List<UserNameAndIdDto>>(teacherList);

            return Ok(new ApiReponse(mapTeacherList));
        }

        // GET: /teacher/5
        [HttpGet("teacher/{id}")]
        [Authorize(Roles = "Student, Teacher, Staff, Admin")]
        public ActionResult<TeacherProfileDetailDto> GetTeacherInfoDetail(int id)
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
            var getUserById = _userRepository.GetUserByUserId(id);
            if (getTeacherById == null || getUserById == null)
            {
                return NotFound(new ApiReponse(636));
            }

            var userMap = _mapper.Map<TeacherProfileDetailDto>(getTeacherById);
            userMap = _mapper.Map<UserInfoModel, TeacherProfileDetailDto>(getUserById, userMap);
            var avatar = _userRepository.GetUserAvatar(id);
            userMap.Avatar = _mapper.Map<AvatarDto>(avatar);

            return Ok(new ApiReponse(userMap));
        }

        // POST: /create-teacher
        // TODO: check date of birth > current
        [HttpPost("create-teacher")]
        [Authorize(Roles = "Admin, Staff")]
        public ActionResult CreateTeacher([FromBody] CreateTeacherDto newTeacher)
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
            if (newTeacher == null)
            {
                return BadRequest(new ApiReponse(600));
            }

            // check login name = pwd ?
            if (newTeacher.Password == newTeacher.LoginName)
            {
                return BadRequest(new ApiReponse(609));
            }

            // check login name
            bool checkUserExist = _userRepository.CheckUserNameExist(newTeacher.LoginName);
            if (checkUserExist)
            {
                return Conflict(new ApiReponse(607));
            }

            Validation validateUserInfoUtils = new Validation();

            // check phone number
            if (!validateUserInfoUtils.IsValidPhoneNumber(newTeacher.PhoneNumber))
            {
                return BadRequest(new ApiReponse(614));
            }

            // check pwd: Minimum eight characters, at least one uppercase & lowercase letter and one number
            if (!validateUserInfoUtils.IsValidPassword(newTeacher.Password))
            {
                return BadRequest(new ApiReponse(610));
            }

            // check gender
            if (!(newTeacher.Gender == GenderType.Male | newTeacher.Gender == GenderType.Female | newTeacher.Gender == null))
            {
                return BadRequest(new ApiReponse(617));
            }

            // check email
            if (newTeacher.Email != null)
            {
                if (!validateUserInfoUtils.IsValidEmail(newTeacher.Email))
                {
                    return BadRequest(new ApiReponse(615));
                }
                bool checkEmailExist = _userRepository.CheckEmailExists(newTeacher.Email);
                if (checkEmailExist)
                {
                    return Conflict(new ApiReponse(616));
                }
            }

            // TODO: check datetime

            newTeacher.Password = BCrypt.Net.BCrypt.HashPassword(newTeacher.Password);
            var userProfile = _mapper.Map<UserInfoModel>(newTeacher);
            userProfile.Role = RoleType.Teacher;

            if (!_userRepository.CreateUserProfile(userProfile))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            var teacherInfo = _mapper.Map<TeacherModel>(newTeacher);
            teacherInfo.Id = userProfile.Id;

            if (!_teacherStudentRepository.CreateTeacherProfile(teacherInfo))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status201Created);
        }

        // PUT: /edit-teacher/5
        // TODO: check datetime
        [HttpPut("edit-teacher/{id}")]
        [Authorize(Roles = "Admin, Staff")]
        public ActionResult UpdateStaff([FromBody] EditTeacherDto updateTeacher, int id)
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
            if (updateTeacher == null)
            {
                return BadRequest(new ApiReponse(600));
            }
            var getTeacherById = _teacherStudentRepository.GetTeacherById(id);
            var getUserById = _userRepository.GetUserByUserId(id);
            if (getTeacherById == null || getUserById == null)
            {
                return NotFound(new ApiReponse(638));
            }

            // Check login name exist except current user's login name (get user by name and userid != current userId)
            if (_userRepository.GetUserHasSameLoginName(getUserById.Id, updateTeacher.LoginName) != null)
            {
                return Conflict(new ApiReponse(607));
            }

            Validation validateUserInfoUtils = new Validation();

            if (updateTeacher.Password == null)
            {
                updateTeacher.Password = getUserById.Password;
            }
            else
            {
                // check login name = pwd ?
                if (updateTeacher.Password == updateTeacher.LoginName)
                {
                    return BadRequest(new ApiReponse(609));
                }

                // check pwd: Minimum eight characters, at least one uppercase & lowercase letter and one number
                if (!validateUserInfoUtils.IsValidPassword(updateTeacher.Password))
                {
                    return BadRequest(new ApiReponse(610));
                }

                updateTeacher.Password = BCrypt.Net.BCrypt.HashPassword(updateTeacher.Password);
            }

            // Valid Phonenumber
            if (!validateUserInfoUtils.IsValidPhoneNumber(updateTeacher.PhoneNumber))
            {
                return BadRequest(new ApiReponse(614));
            }

            // check gender
            if (!(updateTeacher.Gender == GenderType.Male | updateTeacher.Gender == GenderType.Female | updateTeacher.Gender == null))
            {
                return BadRequest(new ApiReponse(617));
            }

            // Check email exists except current user's email (get user by email and userid != current userId)
            if (updateTeacher.Email != null)
            {
                if (!validateUserInfoUtils.IsValidEmail(updateTeacher.Email))
                {
                    return BadRequest(new ApiReponse(615));
                }
                if (_userRepository.GetUserHasSameEmail(id, updateTeacher.Email) != null)
                {
                    return Conflict(new ApiReponse(616));
                }
            }

            updateTeacher.Password = BCrypt.Net.BCrypt.HashPassword(updateTeacher.Password);
            var updatedUserProfileMap = _mapper.Map(updateTeacher, getUserById);
            var updatedTeacherProfileMap = _mapper.Map(updateTeacher, getTeacherById);
            _userRepository.UpdateUserProfile(updatedUserProfileMap);
            _teacherStudentRepository.UpdateTeacherProfile(updatedTeacherProfileMap);

            return StatusCode(StatusCodes.Status204NoContent);
        }

        // GET: /my-teaching-schedule
        [HttpGet("my-teaching-schedule")]
        [Authorize(Roles = nameof(RoleType.Teacher))]
        public ActionResult<ICollection<TeachingScheduleDto>> GetMyTeachingSchedule()
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

            var allClassInProgress = _teacherStudentRepository.GetAllClassOfTeacherByStatus(ClassStatusType.InProgress, user.Id);
            var mappedListClass = _mapper.Map<List<TeachingScheduleDto>>(allClassInProgress);
            mappedListClass.ForEach((x) =>
            {
                var schedules = _classRoomRepository.GetAllSchedulesOfClass(x.Id);
                var scheduleList = _mapper.Map<List<ClassScheduleDto>>(schedules);
                x.Schedules = scheduleList;
                scheduleList.ForEach((y) =>
                {
                    var room = _subjectRoomRepository.GetRoomById(y.RoomId);
                    y.RoomName = room.Name;
                });
            });

            return mappedListClass;
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
