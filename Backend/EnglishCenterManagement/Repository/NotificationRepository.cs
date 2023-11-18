using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Data;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Interfaces;

namespace EnglishCenterManagement.Repository
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly DataContext _context;
        public NotificationRepository(DataContext context)
        {
            _context = context;
        }
        public NotificationModel GetNotiById(int id)
        {
            return _context.Notifications.Where(x => x.Id == id).FirstOrDefault();
        }
        public bool UpdateNotification(NotificationModel notification)
        {
            _context.Update(notification);
            return SaveChange();
        }
        public PagedResponse GetAllSentNotifications(int senderId, int page, int pageSize)
        {
            var allSentNotifications = _context.Notifications.Where(x => x.SenderId == senderId && x.IsSenderDeleteNoti == null).AsQueryable();

            #region Sorting
            allSentNotifications = allSentNotifications.OrderByDescending(u => u.CreateOn);
            #endregion

            #region Paginated
            var data = allSentNotifications.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalNotifications = allSentNotifications.Count();
            #endregion

            return new PagedResponse(data, totalNotifications, page, pageSize);
        }
        public PagedResponse GetAllReceivedNotifications(int receiverId, int page, int pageSize)
        {
            var allReceivedNotifications = _context.Notifications.Where(x => x.ReceiverId == receiverId && x.IsReceiverDeleteNoti == null).AsQueryable();

            #region Sorting
            allReceivedNotifications = allReceivedNotifications.OrderByDescending(u => u.CreateOn);
            #endregion

            #region Paginated
            var data = allReceivedNotifications.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalNotifications = allReceivedNotifications.Count();
            #endregion

            return new PagedResponse(data, totalNotifications, page, pageSize);
        }
        public bool SaveChange()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
