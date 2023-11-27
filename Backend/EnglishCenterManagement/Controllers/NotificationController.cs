using AutoMapper;
using EnglishCenterManagement.Common.Messages;
using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.NotificationsDtos;
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
        public ActionResult<PagedResponse> GetAllSentNotifications(bool? isMarked, int page = 1, int pageSize = 20)
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

            var listSentNotifications = _notificationRepository.GetAllSentNotifications(isMarked, user.Id, page, pageSize);
            var mappedListSentNotifications = _mapper.Map<List<SentNotificationDto>>(listSentNotifications.Data);
            listSentNotifications.Data = mappedListSentNotifications;

            return Ok(new ApiReponse(listSentNotifications));
        }

        // GET: /sent-notification-detail/5
        [HttpGet("sent-notification-detail/{id}")]
        [Authorize]
        public ActionResult<SentNotificationDetailDto> GetSentNotificationDetail(int id)
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

            var notificationDetail = _mapper.Map<SentNotificationDetailDto>(getNotiById);
            var receiver = _userRepository.GetUserByUserId(getNotiById.ReceiverId);
            var avatar = _userRepository.GetUserAvatar(getNotiById.ReceiverId);

            notificationDetail.Receiver = _mapper.Map<UserNotificationDto>(receiver);
            notificationDetail.Receiver.Avatar = _mapper.Map<AvatarDto>(avatar);

            return Ok(new ApiReponse(notificationDetail));
        }

        // GET: /received-notifications
        [HttpGet("received-notifications")]
        [Authorize]
        public ActionResult<PagedResponse> GetAllReceivedNotifications(bool? isMarked, int page = 1, int pageSize = 20)
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

            var listReceivedNotifications = _notificationRepository.GetAllReceivedNotifications(isMarked, user.Id, page, pageSize);
            var mappedListReceivedNotifications = _mapper.Map<List<ReceivedNotificationDto>>(listReceivedNotifications.Data);
            listReceivedNotifications.Data = mappedListReceivedNotifications;

            return Ok(new ApiReponse(listReceivedNotifications));
        }

        // GET: /receivers-notification
        [HttpGet("receivers-notification")]
        [Authorize]
        public ActionResult<ICollection<ReceiversNotificationDto>> GetAllReceiversNotification()
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

            var listReceiversNotification = _notificationRepository.GetAllReceiversNotification(user.Id);
            var mappedListReceiversNotification = _mapper.Map<ICollection<ReceiversNotificationDto>>(listReceiversNotification);

            return Ok(new ApiReponse(mappedListReceiversNotification));

        }

        // GET: /received-notification-detail/5
        [HttpGet("received-notification-detail/{id}")]
        [Authorize]
        public ActionResult<ReceivedNotificationDetailDto> GetReceivedNotificationDetail(int id)
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

            var notificationDetail = _mapper.Map<ReceivedNotificationDetailDto>(getNotiById);
            var sender = _userRepository.GetUserByUserId(getNotiById.SenderId);
            var avatar = _userRepository.GetUserAvatar(getNotiById.SenderId);

            notificationDetail.Sender = _mapper.Map<UserNotificationDto>(sender);
            notificationDetail.Sender.Avatar = _mapper.Map<AvatarDto>(avatar);

            return Ok(new ApiReponse(notificationDetail));
        }

        // PUT: /confirm-read-notification
        [HttpPut("confirm-read-notification")]
        [Authorize]
        public ActionResult ConfirmReadNotification([FromBody] int id)
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

            if (user.Id != getNotiById.ReceiverId)
            {
                return BadRequest(new ApiReponse(649));
            }
            getNotiById.Status = ReadStatusType.Read;

            if (!_notificationRepository.UpdateNotification(getNotiById))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return StatusCode(StatusCodes.Status204NoContent);
        }


        // PUT: /remove-notification
        [HttpPut("remove-notification")]
        [Authorize]
        public ActionResult RemoveNotification([FromBody] int id)
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

        // PUT: /mark-unMark-notification
        [HttpPut("mark-unmark-notification")]
        [Authorize]
        public ActionResult MarkUnMarkReceivedNotification([FromBody] int id)
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

            if (user.Id == getNotiById.SenderId)
            {
                getNotiById.IsMarkedSenderNoti = !getNotiById.IsMarkedSenderNoti;
            }
            else if (user.Id == getNotiById.ReceiverId)
            {
                getNotiById.IsMarkedReceiverNoti = !getNotiById.IsMarkedReceiverNoti;
            }
            if (!_notificationRepository.UpdateNotification(getNotiById))
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return StatusCode(StatusCodes.Status204NoContent);
        }

        // POST: /create-notification
        [HttpPost("create-notification")]
        [Authorize]
        public ActionResult CreateNotification([FromBody] CreateNotificationDto newNotification)
        {
            if (newNotification == null) return BadRequest(new ApiReponse(600));

            var user = GetUserByClaim();
            if (user == null)
            {
                return Unauthorized();
            }
            if (user.UserStatus == UserStatusType.Lock)
            {
                return Unauthorized(new ApiReponse(999));
            }

            var receiverIds = newNotification.Receivers;
            foreach (var item in receiverIds)
            {
                if (_userRepository.GetUserByUserId(item) == null)
                {
                    return BadRequest(new ApiReponse(606));
                }
            }

            var senderId = user.Id;
            foreach (var item in receiverIds)
            {
                var mappedNotification = _mapper.Map<NotificationModel>(newNotification);
                mappedNotification.ReceiverId = item;
                mappedNotification.SenderId = senderId;
                if (!_notificationRepository.CreateNotification(mappedNotification))
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }

            return StatusCode(StatusCodes.Status201Created);
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
