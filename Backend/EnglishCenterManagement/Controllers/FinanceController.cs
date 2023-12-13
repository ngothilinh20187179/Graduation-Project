﻿using AutoMapper;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.FinanceDtos;
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
        public FinanceController(
            IMapper mapper,
            IFinanceRepository financeRepository,
            IUserRepository userRepository,
            IStaffRepository staffRepository
            )
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _financeRepository = financeRepository;
            _staffRepository = staffRepository;
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
            var spending = _financeRepository.GetAllSpendingById(id);
            if (spending == null)
            {
                return NotFound(new ApiReponse(653));
            }
            spending.Status = status;
            _financeRepository.UpdateSpending(spending);

            return StatusCode(StatusCodes.Status204NoContent);
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
