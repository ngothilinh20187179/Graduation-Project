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
        public PagedResponse GetAllSentNotifications(bool? isMarked, int senderId, int page, int pageSize)
        {
            var allSentNotifications = _context.Notifications.Where(x => x.SenderId == senderId && x.IsSenderDeleteNoti == null).AsQueryable();
           
            #region Filtering
            if (isMarked == true)
            {
                allSentNotifications = allSentNotifications.Where(u => u.IsMarkedSenderNoti == true);
            }
            #endregion

            #region Sorting
            allSentNotifications = allSentNotifications.OrderByDescending(u => u.CreateOn);
            #endregion

            #region Paginated
            var data = allSentNotifications.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalNotifications = allSentNotifications.Count();
            #endregion

            return new PagedResponse(data, totalNotifications, page, pageSize);
        }
        public PagedResponse GetAllReceivedNotifications(bool? isMarked, int receiverId, int page, int pageSize)
        {
            var allReceivedNotifications = _context.Notifications.Where(x => x.ReceiverId == receiverId && x.IsReceiverDeleteNoti == null).AsQueryable();

            #region Filtering
            if (isMarked == true)
            {
                allReceivedNotifications = allReceivedNotifications.Where(u => u.IsMarkedReceiverNoti == true);
            }
            #endregion

            #region Sorting
            allReceivedNotifications = allReceivedNotifications.OrderByDescending(u => u.CreateOn);
            #endregion

            #region Paginated
            var data = allReceivedNotifications.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalNotifications = allReceivedNotifications.Count();
            #endregion

            return new PagedResponse(data, totalNotifications, page, pageSize);
        }
        public bool CreateNotification(NotificationModel notification)
        {
            _context.Add(notification);
            return SaveChange();
        }
        public ICollection<UserInfoModel> GetAllReceiversNotification(int senderId)
        {
            var allReceiverstifications = _context.Users.Where(x => x.Id != senderId).ToList();
            return allReceiverstifications;
        }

        public bool SaveChange()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
