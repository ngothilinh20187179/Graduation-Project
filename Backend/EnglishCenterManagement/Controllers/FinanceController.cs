using AutoMapper;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.ClassRoomDtos;
using EnglishCenterManagement.Dtos.FinanceDtos;
using EnglishCenterManagement.Dtos.UserInfoDtos;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.FinanceDtos;
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
    public class FinanceController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IFinanceRepository _financeRepository;
        private readonly IStaffRepository _staffRepository;
        private readonly IClassRoomRepository _classRoomRepository;
        public FinanceController(
            IMapper mapper,
            IFinanceRepository financeRepository,
            IUserRepository userRepository,
            IStaffRepository staffRepository,
            IClassRoomRepository classRoomRepository
            )
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _financeRepository = financeRepository;
            _staffRepository = staffRepository;
            _classRoomRepository = classRoomRepository;
        }
        // GET: /spendings
        [HttpGet("spendings")]
        [Authorize(Roles = "Admin, Staff")]
        public ActionResult<PagedResponse> GetAllSpendings(SpendingStatusType? spendingStatus, int page = 1, int pageSize = 20)
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

            var listSpendings = _financeRepository.GetAllSpendings(spendingStatus, page, pageSize);
            var mappedListSpendings = _mapper.Map<List<SpendingDto>>(listSpendings.Data);
            mappedListSpendings.ForEach((item) =>
            {
                var staff = _userRepository.GetUserByUserId(item.StaffId);
                item.Author = staff.LastName + " " + staff.FirstName;
            });
            listSpendings.Data = mappedListSpendings;

            return Ok(new ApiReponse(listSpendings));
        }

        // GET: /spending/5
        [HttpGet("spending/{id}")]
        [Authorize(Roles = "Staff")]
        public ActionResult<SpendingDto> GetSpendingById(int id)
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
            var getSpendingById = _financeRepository.GetSpendingById(id);
            if (getSpendingById == null)
            {
                return NotFound(new ApiReponse(653));
            }

            var spendingMap = _mapper.Map<SpendingDto>(getSpendingById);

            return Ok(new ApiReponse(spendingMap));
        }

        // POST: /create-spending
        [HttpPost("create-spending")]
        [Authorize(Roles = nameof(RoleType.Staff))]
        public ActionResult CreateSpending([FromBody] CreateUpdateSpendingDto newSpending)
        {
            if (newSpending == null) return BadRequest(new ApiReponse(600));

            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }

            var mappedSpending = _mapper.Map<SpendingModel>(newSpending);
            mappedSpending.StaffId = user.Id;
            if (!_financeRepository.CreateSpending(mappedSpending))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status201Created);
        }

        // PUT: /update-spending
        [HttpPut("update-spending/{id}")]
        [Authorize(Roles = nameof(RoleType.Staff))]
        public ActionResult UpdateSpending(int id, [FromBody] CreateUpdateSpendingDto updatedSpending)
        {
            if (updatedSpending == null) return BadRequest(new ApiReponse(600));

            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }

            var getSpendingById = _financeRepository.GetSpendingById(id);
            if (getSpendingById == null)
            {
                return NotFound(new ApiReponse(653));
            }

            var mappedSpending = _mapper.Map(updatedSpending, getSpendingById);
            if (!_financeRepository.UpdateSpending(mappedSpending))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status204NoContent);
        }

        // PUT: /accept-or-reject-spending/5
        [HttpPut("accept-or-reject-spending/{id}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public ActionResult AcceptOrRejectSpending([FromBody] SpendingStatusType status, int id)
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
            if (!Enum.IsDefined(typeof(SpendingStatusType), status))
            {
                return BadRequest();
            }
            var spending = _financeRepository.GetSpendingById(id);
            if (spending == null)
            {
                return NotFound(new ApiReponse(653));
            }
            spending.Status = status;
            _financeRepository.UpdateSpending(spending);

            return StatusCode(StatusCodes.Status204NoContent);
        }
        
        // DELETE: /remove-spending
        [HttpDelete("remove-spending/{id}")]
        [Authorize(Roles = "Staff")]
        public ActionResult DeleteSpending(int id)
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
            var getSpendingById = _financeRepository.GetSpendingById(id);
            if (getSpendingById == null)
            {
                return NotFound(new ApiReponse(653));
            }

            if (getSpendingById.Status != SpendingStatusType.Pending)
            {
                return BadRequest();
            }

            if (!_financeRepository.DeleteSpending(getSpendingById))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return NoContent();
        }

        // GET: /my-tuition-debt
        [HttpGet("my-tuition-debt")]
        [Authorize(Roles = nameof(RoleType.Student))]
        public ActionResult<ICollection<MyTuitionDebtInformationDto>> GetMyTuitionDebtInformation()
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

            var myTuitionDebtInformation = _financeRepository.GetMyTuitionDebtInformation(user.Id);
            var mapMyTuitionDebtInformation = _mapper.Map<List<MyTuitionDebtInformationDto>>(myTuitionDebtInformation);
            mapMyTuitionDebtInformation.ForEach((item) =>
            {
                var classInfo = _classRoomRepository.GetClassById(item.ClassId);
                item.ClassInfo = _mapper.Map<BasicClassRoomInfoDto>(classInfo);
            });

            return Ok(new ApiReponse(mapMyTuitionDebtInformation));
        }

        [HttpGet("student-tuition")]
        [Authorize(Roles = nameof(RoleType.Staff))]
        public ActionResult<PagedResponse> GetStudentTuitionInformation(bool? isPaidTuition, int page = 1, int pageSize = 20)
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

            var studentTuitionInformation = _financeRepository.GetStudentTuitionInformation(isPaidTuition, page, pageSize);
            var mapStudentTuitionInformation = _mapper.Map<List<StudentTuitionInformationDto>>(studentTuitionInformation.Data);
            mapStudentTuitionInformation.ForEach((item) =>
            {
                var getStudentById = _userRepository.GetUserByUserId(item.StudentId);
                item.StudentInfo = _mapper.Map<BasicUserInfoDto>(getStudentById);
                var classInfo = _classRoomRepository.GetClassById(item.ClassId);
                item.ClassInfo = _mapper.Map<BasicClassRoomInfoDto>(classInfo);
            });
            studentTuitionInformation.Data = mapStudentTuitionInformation;

            return Ok(new ApiReponse(studentTuitionInformation));
        }

        // PUT: /confirm-payment
        [HttpPut("confirm-payment")]
        [Authorize(Roles = nameof(RoleType.Staff))]
        public ActionResult ConfirmPayment([FromBody] int id)
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
            var tuition = _financeRepository.GetStudentClassById(id);
            if (tuition == null)
            {
                return NotFound();
            }
            tuition.IsPaidTuition = true;
            _financeRepository.UpdateStudentClass(tuition);

            return StatusCode(StatusCodes.Status204NoContent);
        }

        // PUT: /take-note-student-tuition/5
        [HttpPut("take-note-student-tuition/{id}")]
        [Authorize(Roles = nameof(RoleType.Staff))] 
        public ActionResult TakeNoteStudentTuition([FromBody] string note, int id)
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
            var tuition = _financeRepository.GetStudentClassById(id);
            if (tuition == null)
            {
                return NotFound();
            }
            tuition.Note = note;
            _financeRepository.UpdateStudentClass(tuition);

            return StatusCode(StatusCodes.Status204NoContent);
        }

        [HttpGet("all-teacher-salaries")]
        [Authorize(Roles = nameof(RoleType.Staff))]
        public ActionResult<PagedResponse> GetAllStaffSalaries(bool? isPaid, int page = 1, int pageSize = 20)
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

            var teacherSalaries = _financeRepository.GetAllTeacherSalaries(isPaid, page, pageSize);
            var mapTeacherSalaries = _mapper.Map<List<TeacherSalaryDto>>(teacherSalaries.Data);
            mapTeacherSalaries.ForEach((item) =>
            {
                var getStaffById = _userRepository.GetUserByUserId(item.teacherId);
                item.teacherName = getStaffById.FirstName + " " + getStaffById.LastName;
            });
            teacherSalaries.Data = mapTeacherSalaries;

            return Ok(new ApiReponse(teacherSalaries));
        }

        [HttpGet("teacher-salaries")]
        [Authorize(Roles = nameof(RoleType.Teacher))]
        public ActionResult<PagedResponse> GetTeacherSalaries(bool? isPaid, int page = 1, int pageSize = 20)
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

            var teacherSalaries = _financeRepository.GetTeacherSalaries(isPaid, page, pageSize, user.Id);
            var mapTeacherSalaries = _mapper.Map<List<TeacherSalaryDto>>(teacherSalaries.Data);
            teacherSalaries.Data = mapTeacherSalaries;

            return Ok(new ApiReponse(teacherSalaries));
        }

        // GET: /teacher-salary/5
        [HttpGet("teacher-salary/{id}")]
        [Authorize(Roles = "Staff")]
        public ActionResult<TeacherSalaryDto> GetTeacherSalaryById(int id)
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
            var getTeacherSalaryById = _financeRepository.GetTeacherSalaryById(id);
            if (getTeacherSalaryById == null)
            {
                return NotFound(new ApiReponse(654));
            }

            var teacherSalaryMap = _mapper.Map<TeacherSalaryDto>(getTeacherSalaryById);

            return Ok(new ApiReponse(teacherSalaryMap));
        }

        // POST: /create-teacher-salary
        [HttpPost("create-teacher-salary")]
        [Authorize(Roles = nameof(RoleType.Staff))]
        public ActionResult CreateTeacherSalary([FromBody] CreateEditTeacherSalaryDto newTeacherSalary)
        {
            if (newTeacherSalary == null) return BadRequest(new ApiReponse(600));

            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }

            var mappedTeacherSalary = _mapper.Map<TeacherSalaryModel>(newTeacherSalary);
            if (!_financeRepository.CreateTeacherSalary(mappedTeacherSalary))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status201Created);
        }

        // PUT: /update-teacher-salary/5
        [HttpPut("update-teacher-salary/{id}")]
        [Authorize(Roles = nameof(RoleType.Staff))]
        public ActionResult UpdateTeacherSalary(int id, [FromBody] CreateEditTeacherSalaryDto updatedTeacherSalary)
        {
            if (updatedTeacherSalary == null) return BadRequest(new ApiReponse(600));

            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }

            var getTeacherSalaryById = _financeRepository.GetTeacherSalaryById(id);
            if (getTeacherSalaryById == null)
            {
                return NotFound(new ApiReponse(654));
            }

            var mappedTeacherSalary = _mapper.Map(updatedTeacherSalary, getTeacherSalaryById);
            if (!_financeRepository.UpdateTeacherSalary(mappedTeacherSalary))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status204NoContent);
        }

        // DELETE: /remove-teacher-salary/5
        [HttpDelete("remove-teacher-salary/{id}")]
        [Authorize(Roles = "Staff")]
        public ActionResult DeleteTeacherSalary(int id)
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
            var getTeacherSalaryById = _financeRepository.GetTeacherSalaryById(id);
            if (getTeacherSalaryById == null)
            {
                return NotFound(new ApiReponse(654));
            }

            if (!_financeRepository.DeleteTeacherSalary(getTeacherSalaryById))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return NoContent();
        }

        [HttpGet("all-staff-salaries")]
        [Authorize(Roles = nameof(RoleType.Staff))]
        public ActionResult<PagedResponse> GetAllTeacherSalaries(bool? isPaid, int page = 1, int pageSize = 20)
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

            var staffSalaries = _financeRepository.GetAllStaffSalaries(isPaid, page, pageSize);
            var mapStaffSalaries = _mapper.Map<List<StaffSalaryDto>>(staffSalaries.Data);
            mapStaffSalaries.ForEach((item) =>
            {
                var getStaffById = _userRepository.GetUserByUserId(item.StaffId);
                item.StaffName = getStaffById.FirstName + " " + getStaffById.LastName;
            });
            staffSalaries.Data = mapStaffSalaries;

            return Ok(new ApiReponse(staffSalaries));
        }

        [HttpGet("staff-salaries")]
        [Authorize(Roles = nameof(RoleType.Staff))]
        public ActionResult<PagedResponse> GetStaffSalaries(bool? isPaid, int page = 1, int pageSize = 20)
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

            var staffSalaries = _financeRepository.GetStaffSalaries(isPaid, page, pageSize, user.Id);
            var mapStaffSalaries = _mapper.Map<List<StaffSalaryDto>>(staffSalaries.Data);
            staffSalaries.Data = mapStaffSalaries;

            return Ok(new ApiReponse(staffSalaries));
        }
        
        // GET: /staff-salary/5
        [HttpGet("staff-salary/{id}")]
        [Authorize(Roles = "Staff")]
        public ActionResult<StaffSalaryDto> GetStaffSalaryById(int id)
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
            var getStaffSalaryById = _financeRepository.GetStaffSalaryById(id);
            if (getStaffSalaryById == null)
            {
                return NotFound(new ApiReponse(655));
            }

            var staffSalaryMap = _mapper.Map<StaffSalaryDto>(getStaffSalaryById);

            return Ok(new ApiReponse(staffSalaryMap));
        }

        // POST: /create-staff-salary
        [HttpPost("create-staff-salary")]
        [Authorize(Roles = nameof(RoleType.Staff))]
        public ActionResult CreateStaffSalary([FromBody] CreateEditStaffSalaryDto newStaffSalary)
        {
            if (newStaffSalary == null) return BadRequest(new ApiReponse(600));

            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }

            var mappedStaffSalary = _mapper.Map<StaffSalaryModel>(newStaffSalary);
            if (!_financeRepository.CreateStaffSalary(mappedStaffSalary))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status201Created);
        }

        // PUT: /update-staff-salary/5
        [HttpPut("update-staff-salary/{id}")]
        [Authorize(Roles = nameof(RoleType.Staff))]
        public ActionResult UpdateStaffSalary(int id, [FromBody] CreateEditStaffSalaryDto updatedStaffSalary)
        {
            if (updatedStaffSalary == null) return BadRequest(new ApiReponse(600));

            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }

            var getStaffSalaryById = _financeRepository.GetStaffSalaryById(id);
            if (getStaffSalaryById == null)
            {
                return NotFound(new ApiReponse(655));
            }

            var mappedStaffSalary = _mapper.Map(updatedStaffSalary, getStaffSalaryById);
            if (!_financeRepository.UpdateStaffSalary(mappedStaffSalary))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return StatusCode(StatusCodes.Status204NoContent);
        }

        // DELETE: /remove-staff-salary/5
        [HttpDelete("remove-staff-salary/{id}")]
        [Authorize(Roles = "Staff")]
        public ActionResult DeleteStaffSalary(int id)
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
            var getStaffSalaryById = _financeRepository.GetStaffSalaryById(id);
            if (getStaffSalaryById == null)
            {
                return NotFound(new ApiReponse(655));
            }

            if (!_financeRepository.DeleteStaffSalary(getStaffSalaryById))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return NoContent();
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
