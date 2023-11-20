using AutoMapper;
using EnglishCenterManagement.Common.Helpers;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
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
    public class StaffController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IStaffRepository _staffRepository;
        public StaffController(IMapper mapper, IUserRepository userRepository, IStaffRepository staffRepository)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _staffRepository = staffRepository;
        }

        #region STAFF
        // GET: /staffs
        // Note: Bên admin đã có API get all users by role nên admin ko cần get all staffs nữa
        [HttpGet("staffs")]
        [Authorize(Roles = "Admin, Staff")]
        public ActionResult<PagedResponse> GetAllStaffs(string? search, int page = 1, int pageSize = 20)
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

            var listStaffs = _staffRepository.GetAllStaffs(search, page, pageSize);
            var mappedListStaffs = _mapper.Map<List<BasicUserInfoDto>>(listStaffs.Data);
            mappedListStaffs.ForEach((item) =>
            {
                var avatar = _userRepository.GetUserAvatar(item.Id);
                item.Avatar = _mapper.Map<AvatarDto>(avatar);
            });
            listStaffs.Data = mappedListStaffs;

            return Ok(listStaffs);
        }

        // GET: /staffs/5
        [HttpGet("staffs/{id}")]
        [Authorize(Roles = "Admin, Staff")]
        public ActionResult<StaffProfileDetailDto> GetStaffInfoDetail(int id)
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
            var getStaffById = _staffRepository.GetStaffById(id);
            var getUserById = _userRepository.GetUserByUserId(id);
            if (getStaffById == null || getUserById == null)
            {
                return NotFound(new ApiReponse(638));
            }
            StaffProfileDetailDto userMap = _mapper.Map<StaffProfileDetailDto>(getStaffById);
            userMap = _mapper.Map<UserInfoModel, StaffProfileDetailDto>(getUserById, userMap);
            var avatar = _userRepository.GetUserAvatar(id);
            userMap.Avatar = _mapper.Map<AvatarDto>(avatar);

            return Ok(userMap);
        }

        // POST: /staff
        // TODO: check birthday
        [HttpPost("create-staff")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult CreateStaff([FromBody] CreateStaffDto newStaff)
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
            if (newStaff == null)
            {
                return BadRequest(new ApiReponse(600));
            }
            // check login name = pwd ?
            if (newStaff.Password == newStaff.LoginName)
            {
                return BadRequest(new ApiReponse(609));
            }

            // check login name
            bool checkUserExist = _userRepository.CheckUserNameExist(newStaff.LoginName);
            if (checkUserExist)
            {
                return Conflict(new ApiReponse(607));
            }

            Validation validateUserInfoUtils = new Validation();

            // check phone number
            if (!validateUserInfoUtils.IsValidPhoneNumber(newStaff.PhoneNumber))
            {
                return BadRequest(new ApiReponse(614));
            }

            // check pwd: Minimum eight characters, at least one uppercase & lowercase letter and one number
            if (!validateUserInfoUtils.IsValidPassword(newStaff.Password))
            {
                return BadRequest(new ApiReponse(610));
            }

            // check gender
            if (!(newStaff.Gender == GenderType.Male | newStaff.Gender == GenderType.Female | newStaff.Gender == null))
            {
                return BadRequest(new ApiReponse(617));
            }

            // check email
            if (newStaff.Email != null)
            {
                if (!validateUserInfoUtils.IsValidEmail(newStaff.Email))
                {
                    return BadRequest(new ApiReponse(615));
                }
                bool checkEmailExist = _userRepository.CheckEmailExists(newStaff.Email);
                if (checkEmailExist)
                {
                    return Conflict(new ApiReponse(616));
                }
            }

            // TODO: check datetime

            newStaff.Password = BCrypt.Net.BCrypt.HashPassword(newStaff.Password);
            var userProfile = _mapper.Map<UserInfoModel>(newStaff);
            userProfile.Role = RoleType.Staff;

            if (!_userRepository.CreateUserProfile(userProfile))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            var staffInfo = _mapper.Map<StaffModel>(newStaff);
            staffInfo.Id = userProfile.Id;

            if (!_staffRepository.CreateStaffProfile(staffInfo))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status201Created);
        }

        // PUT: /staffs/5
        // TODO: check datetime
        [HttpPut("staffs/{id}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult UpdateStaff([FromBody] CreateStaffDto updateStaff, int id)
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
            if (updateStaff == null)
            {
                return BadRequest(new ApiReponse(600));
            }
            var getStaffById = _staffRepository.GetStaffById(id);
            var getUserById = _userRepository.GetUserByUserId(id);
            if (getStaffById == null || getUserById == null)
            {
                return NotFound(new ApiReponse(638));
            }

            // check login name = pwd ?
            if (updateStaff.Password == updateStaff.LoginName)
            {
                return BadRequest(new ApiReponse(609));
            }

            // Check login name exist except current user's login name (get user by name and userid != current userId)
            if (_userRepository.GetUserHasSameLoginName(getUserById.Id, updateStaff.LoginName) != null)
            {
                return Conflict(new ApiReponse(607));
            }


            Validation validateUserInfoUtils = new Validation();

            // Valid Phonenumber
            if (!validateUserInfoUtils.IsValidPhoneNumber(updateStaff.PhoneNumber))
            {
                return BadRequest(new ApiReponse(614));
            }

            // check pwd: Minimum eight characters, at least one uppercase & lowercase letter and one number
            if (!validateUserInfoUtils.IsValidPassword(updateStaff.Password))
            {
                return BadRequest(new ApiReponse(610));
            }

            // check gender
            if (!(updateStaff.Gender == GenderType.Male | updateStaff.Gender == GenderType.Female | updateStaff.Gender == null))
            {
                return BadRequest(new ApiReponse(617));
            }

            // Check email exists except current user's email (get user by email and userid != current userId)
            if (updateStaff.Email != null)
            {
                if (!validateUserInfoUtils.IsValidEmail(updateStaff.Email))
                {
                    return BadRequest(new ApiReponse(615));
                }
                if (_userRepository.GetUserHasSameEmail(user.Id, updateStaff.Email) != null)
                {
                    return Conflict(new ApiReponse(616));
                }
            }

            updateStaff.Password = BCrypt.Net.BCrypt.HashPassword(updateStaff.Password);
            var updatedUserProfileMap = _mapper.Map(updateStaff, getUserById);
            var updatedStaffProfileMap = _mapper.Map(updateStaff, getStaffById);
            _userRepository.UpdateUserProfile(updatedUserProfileMap);
            _staffRepository.UpdateStaffProfile(updatedStaffProfileMap);

            return StatusCode(StatusCodes.Status204NoContent);
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
