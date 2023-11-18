using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Interfaces
{
    public interface INotificationRepository
    {
        NotificationModel GetNotiById(int id);
        bool UpdateNotification(NotificationModel notification);
        PagedResponse GetAllSentNotifications(int senderId, int page, int pageSize);
        PagedResponse GetAllReceivedNotifications(int receiverId, int page, int pageSize);
        bool SaveChange();
    }
}
