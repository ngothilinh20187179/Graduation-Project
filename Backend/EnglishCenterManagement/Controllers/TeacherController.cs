using AutoMapper;
using EnglishCenterManagement.Common.Helpers;
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
    public class TeacherController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly ISchoolRepository _schoolRepository;
        public TeacherController(
            IMapper mapper,
            ISchoolRepository schoolRepository,
            IUserRepository userRepository
            )
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _schoolRepository = schoolRepository;
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
            if (user.UserStatus == UserStatus.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 || pageSize < 1 ? 20 : pageSize;

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
            if (user.UserStatus == UserStatus.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }
            var getTeacherById = _schoolRepository.GetTeacherById(id);
            var getUserById = _userRepository.GetUserByUserId(id);
            if (getTeacherById == null || getUserById == null)
            {
                return NotFound(new ApiReponse(636));
            }

            TeacherProfileDetailDto userMap = _mapper.Map<TeacherProfileDetailDto>(getTeacherById);
            userMap = _mapper.Map<UserInfoModel, TeacherProfileDetailDto>(getUserById, userMap);
            var avatar = _userRepository.GetUserAvatar(id);
            userMap.Avatar = _mapper.Map<AvatarDto>(avatar);

            return Ok(userMap);
        }

        // POST: /create-teacher
        // TODO: check date of birth > current
        [HttpPost("create-teacher")]
        [Authorize(Roles = nameof(RoleType.Staff))]
        public ActionResult CreateTeacher([FromBody] CreateTeacherDto newTeacher)
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

            if (!_schoolRepository.CreateTeacherProfile(teacherInfo))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

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
