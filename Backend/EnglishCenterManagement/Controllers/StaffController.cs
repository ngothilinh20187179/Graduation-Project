using AutoMapper;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.SchoolDto;
using EnglishCenterManagement.Dtos.TeacherStudentStaffDto;
using EnglishCenterManagement.Dtos.UserInfoDto;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Interfaces;
using EnglishCenterManagement.Repository;
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
            if (user.UserStatus == UserStatus.Lock)
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
            if (user.UserStatus == UserStatus.Lock)
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
        [HttpPost("create-staff")]
        [Authorize(Roles = nameof(RoleType.Admin))]


        // PUT: /staffs/5
        [HttpPut("staffs/{id}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
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
