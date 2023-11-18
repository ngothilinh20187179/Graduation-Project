using AutoMapper;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.ReceivedNotificationDto;
using EnglishCenterManagement.Dtos.SchoolRoomDto;
using EnglishCenterManagement.Dtos.SentNotificationDto;
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
    public class NotificationController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly INotificationRepository _notificationRepository;
        public NotificationController(
            IUserRepository userRepository,
            IMapper mapper,
            INotificationRepository notificationRepository

        )
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _notificationRepository = notificationRepository;
        }

        // GET: /sent-notifications
        [HttpGet("sent-notifications")]
        [Authorize]
        public ActionResult<PagedResponse> GetAllSentNotifications(int page = 1, int pageSize = 20)
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

            var listSentNotifications = _notificationRepository.GetAllSentNotifications(user.Id, page, pageSize);
            var mappedListSentNotifications = _mapper.Map<List<SentNotificationDto>>(listSentNotifications.Data);
            listSentNotifications.Data = mappedListSentNotifications;

            return Ok(new ApiReponse(listSentNotifications));
        }

        // GET: /received-notifications
        [HttpGet("received-notifications")]
        [Authorize]
        public ActionResult<PagedResponse> GetAllReceivedNotifications(int page = 1, int pageSize = 20)
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

            var listReceivedNotifications = _notificationRepository.GetAllReceivedNotifications(user.Id, page, pageSize);
            var mappedListReceivedNotifications = _mapper.Map<List<ReceivedNotificationDto>>(listReceivedNotifications.Data);
            listReceivedNotifications.Data = mappedListReceivedNotifications;

            return Ok(new ApiReponse(listReceivedNotifications));
        }

        // PUT: /mark-noti/5
        // [HttpDelete("mark-noti/{id}")]

        // PUT: /remove-notification
        [HttpPut("remove-notification")]
        [Authorize]
        public ActionResult UpdateRoom([FromBody] int id)
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
            var getNotiById = _notificationRepository.GetNotiById(id);
            if (getNotiById == null)
            {
                return NotFound(new ApiReponse(648));
            }
            if(user.Id == getNotiById.SenderId)
            {
                getNotiById.IsSenderDeleteNoti = DateTime.Now;
            }
            else if (user.Id == getNotiById.ReceiverId)
            {
                getNotiById.IsReceiverDeleteNoti = DateTime.Now;
            }
            if (!_notificationRepository.UpdateNotification(getNotiById))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
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
