﻿using AutoMapper;
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
    [Route("api/")]
    [ApiController]
    public class StudentController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IClassRoomRepository _classRoomRepository;
        private readonly ITeacherStudentRepository _teacherStudentRepository;
        public StudentController(
            IMapper mapper,
            IClassRoomRepository classRoomRepository,
            IUserRepository userRepository,
            ITeacherStudentRepository teacherStudentRepository
            )
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _classRoomRepository = classRoomRepository;
            _teacherStudentRepository = teacherStudentRepository;
        }

        #region STUDENT
        // GET: /students
        // Note: Bên admin đã có API get all users by role nên admin ko cần get all teachers và get all students nữa
        [HttpGet("students")]
        [Authorize(Roles = "Admin, Staff")]
        public ActionResult<PagedResponse> GetAllStudents(string? search, int page = 1, int pageSize = 20)
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

            var listStudents = _teacherStudentRepository.GetAllStudents(search, page, pageSize);
            var mappedListStudents = _mapper.Map<List<BasicUserInfoDto>>(listStudents.Data);
            mappedListStudents.ForEach((item) =>
            {
                var avatar = _userRepository.GetUserAvatar(item.Id);
                item.Avatar = _mapper.Map<AvatarDto>(avatar);
            });
            listStudents.Data = mappedListStudents;

            return Ok(listStudents);
        }

        // GET: /student/5
        [HttpGet("student/{id}")]
        [Authorize(Roles = "Teacher, Staff, Admin")]
        public ActionResult<StudentProfileDetailDto> GetStudentInfoDetail(int id)
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
            var getUserById = _userRepository.GetUserByUserId(id);
            if (getStudentById == null || getUserById == null)
            {
                return NotFound(new ApiReponse(635));
            }

            // check teacher va student cung lop hay ko
            if (user.Role == RoleType.Teacher)
            {
                if (!_teacherStudentRepository.CheckTeacherStudentInSameClass(user.Id, id))
                {
                    return Unauthorized(new ApiReponse(1000));
                }
            }

            StudentProfileDetailDto userMap = _mapper.Map<StudentProfileDetailDto>(getStudentById);
            userMap = _mapper.Map<UserInfoModel, StudentProfileDetailDto>(getUserById, userMap);
            var avatar = _userRepository.GetUserAvatar(id);
            userMap.Avatar = _mapper.Map<AvatarDto>(avatar);

            return Ok(userMap);
        }

        // GET: /classes/5/students
        [HttpGet("classes/{id}/students")]
        [Authorize(Roles = "Student, Teacher, Staff, Admin")]
        public ActionResult<PagedResponse> GetAllStudentsInClass(int id, string? search, int page = 1, int pageSize = 20)
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

            // Học sinh hoặc giáo viên ngoài lớp đó không xem được danh sách lớp
            if ((user.Role == RoleType.Student && (!_teacherStudentRepository.CheckStudentClassExists(id, user.Id))) ||
                (user.Role == RoleType.Teacher && (!_teacherStudentRepository.CheckTeacherClassExists(id, user.Id))))
            {
                return Unauthorized(new ApiReponse(1000));
            }

            // Students of Class
            page = page < 1 ? 1 : page;
            pageSize = pageSize > 20 || pageSize < 1 ? 20 : pageSize;

            var getListStudentsInClass = _teacherStudentRepository.GetAllStudentsInClass(id, search, page, pageSize);
            var mappedStudentsInClass = _mapper.Map<List<BasicUserInfoDto>>(getListStudentsInClass.Data);
            mappedStudentsInClass.ForEach((item) =>
            {
                var avatar = _userRepository.GetUserAvatar(item.Id);
                item.Avatar = _mapper.Map<AvatarDto>(avatar);
            });
            getListStudentsInClass.Data = mappedStudentsInClass;

            return Ok(new ApiReponse(getListStudentsInClass));
        }

        // POST: /create-student
        // TODO: check date time
        [HttpPost("create-student")]
        [Authorize(Roles = nameof(RoleType.Staff))]
        public ActionResult CreateStudent([FromBody] CreateStudentDto newStudent)
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
            if (newStudent == null)
            {
                return BadRequest(new ApiReponse(600));
            }

            // check login name = pwd ?
            if (newStudent.Password == newStudent.LoginName)
            {
                return BadRequest(new ApiReponse(609));
            }

            // check login name
            bool checkUserExist = _userRepository.CheckUserNameExist(newStudent.LoginName);
            if (checkUserExist)
            {
                return Conflict(new ApiReponse(607));
            }

            Validation validateUserInfoUtils = new Validation();

            // check phone number
            if (!validateUserInfoUtils.IsValidPhoneNumber(newStudent.PhoneNumber))
            {
                return BadRequest(new ApiReponse(614));
            }

            // check pwd: Minimum eight characters, at least one uppercase & lowercase letter and one number
            if (!validateUserInfoUtils.IsValidPassword(newStudent.Password))
            {
                return BadRequest(new ApiReponse(610));
            }

            // check gender
            if (!(newStudent.Gender == GenderType.Male | newStudent.Gender == GenderType.Female | newStudent.Gender == null))
            {
                return BadRequest(new ApiReponse(617));
            }

            // check email
            if (newStudent.Email != null)
            {
                if (!validateUserInfoUtils.IsValidEmail(newStudent.Email))
                {
                    return BadRequest(new ApiReponse(615));
                }
                bool checkEmailExist = _userRepository.CheckEmailExists(newStudent.Email);
                if (checkEmailExist)
                {
                    return Conflict(new ApiReponse(616));
                }
            }

            if (newStudent.ParentPhoneNumber != null)
            {
                if (!validateUserInfoUtils.IsValidPhoneNumber(newStudent.ParentPhoneNumber))
                {
                    return BadRequest(new ApiReponse(614));
                }
            }

            // TODO: check datetime

            newStudent.Password = BCrypt.Net.BCrypt.HashPassword(newStudent.Password);
            var userProfile = _mapper.Map<UserInfoModel>(newStudent);
            userProfile.Role = RoleType.Student;

            if (!_userRepository.CreateUserProfile(userProfile))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            var studentInfo = _mapper.Map<StudentModel>(newStudent);
            studentInfo.Id = userProfile.Id;

            if (!_teacherStudentRepository.CreateStudentProfile(studentInfo))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status201Created);
        }

        // PUT: /student/{id}
        // TODO: check date time
        [HttpPut("student/{id}")]
        [Authorize(Roles = nameof(RoleType.Staff))]
        public ActionResult UpdateStudentProfile([FromBody] CreateStudentDto updateStudent, int id)
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
            if (updateStudent == null)
            {
                return BadRequest(new ApiReponse(600));
            }

            var getStudentById = _teacherStudentRepository.GetStudentById(id);
            var getUserById = _userRepository.GetUserByUserId(id);
            if (getStudentById == null || getUserById == null)
            {
                return NotFound(new ApiReponse(638));
            }

            // check login name = pwd ?
            if (updateStudent.Password == updateStudent.LoginName)
            {
                return BadRequest(new ApiReponse(609));
            }

            // Check login name exist except current user's login name (get user by name and userid != current userId)
            if (_userRepository.GetUserHasSameLoginName(getUserById.Id, updateStudent.LoginName) != null)
            {
                return Conflict(new ApiReponse(607));
            }

            Validation validateUserInfoUtils = new Validation();

            // Valid Phonenumber
            if (!validateUserInfoUtils.IsValidPhoneNumber(updateStudent.PhoneNumber))
            {
                return BadRequest(new ApiReponse(614));
            }

            // check pwd: Minimum eight characters, at least one uppercase & lowercase letter and one number
            if (!validateUserInfoUtils.IsValidPassword(updateStudent.Password))
            {
                return BadRequest(new ApiReponse(610));
            }

            // check gender
            if (!(updateStudent.Gender == GenderType.Male | updateStudent.Gender == GenderType.Female | updateStudent.Gender == null))
            {
                return BadRequest(new ApiReponse(617));
            }

            // Check email exists except current user's email (get user by email and userid != current userId)
            if (updateStudent.Email != null)
            {
                if (!validateUserInfoUtils.IsValidEmail(updateStudent.Email))
                {
                    return BadRequest(new ApiReponse(615));
                }
                if (_userRepository.GetUserHasSameEmail(user.Id, updateStudent.Email) != null)
                {
                    return Conflict(new ApiReponse(616));
                }
            }

            if (updateStudent.ParentPhoneNumber != null)
            {
                if (!validateUserInfoUtils.IsValidPhoneNumber(updateStudent.ParentPhoneNumber))
                {
                    return BadRequest(new ApiReponse(614));
                }
            }

            updateStudent.Password = BCrypt.Net.BCrypt.HashPassword(updateStudent.Password);
            var updatedUserProfileMap = _mapper.Map(updateStudent, getUserById);
            var updatedStudentProfileMap = _mapper.Map(updateStudent, getStudentById);
            _userRepository.UpdateUserProfile(updatedUserProfileMap);
            _teacherStudentRepository.UpdateStudentProfile(updatedStudentProfileMap);

            return StatusCode(StatusCodes.Status204NoContent);
        }

        // PUT: /restricted-student-class
        [HttpPut("restricted-student-class/{id}")]
        [Authorize(Roles = nameof(RoleType.Staff))]
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
