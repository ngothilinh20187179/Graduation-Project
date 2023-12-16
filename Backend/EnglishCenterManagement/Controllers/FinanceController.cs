using AutoMapper;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.ClassRoomDtos;
using EnglishCenterManagement.Dtos.FinanceDtos;
using EnglishCenterManagement.Dtos.PositionPermissionDtos;
using EnglishCenterManagement.Dtos.SubjectRoomDtos;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Interfaces;
using EnglishCenterManagement.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
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
