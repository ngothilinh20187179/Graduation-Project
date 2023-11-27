using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Interfaces
{
    public interface INotificationRepository
    {
        NotificationModel GetNotiById(int id);
        bool UpdateNotification(NotificationModel notification);
        PagedResponse GetAllSentNotifications(bool? isMarked, int senderId, int page, int pageSize);
        PagedResponse GetAllReceivedNotifications(bool? isMarked, int receiverId, int page, int pageSize);
        ICollection<UserInfoModel> GetAllReceiversNotification(int senderId);
        bool CreateNotification(NotificationModel notification);
        bool SaveChange();
    }
}
