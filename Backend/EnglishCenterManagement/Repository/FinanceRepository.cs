using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Data;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Interfaces;

namespace EnglishCenterManagement.Repository
{
    public class FinanceRepository : IFinanceRepository
    {
        private readonly DataContext _context;
        public FinanceRepository(DataContext context)
        {
            _context = context;
        }

        public PagedResponse GetAllSpendings(SpendingStatusType? spendingStatus, int page, int pageSize)
        {
            var allSpendings = _context.Spendings.AsQueryable();

            #region Filtering
            if (spendingStatus.HasValue)
            {
                allSpendings = allSpendings.Where(u => u.Status == spendingStatus);
            }
            #endregion

            #region Sorting
            allSpendings = allSpendings.OrderByDescending(u => u.CreatedOn);
            #endregion

            #region Paginated
            var data = allSpendings.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalSpendings = allSpendings.Count();
            #endregion

            return new PagedResponse(data, totalSpendings, page, pageSize);
        }
        public SpendingModel GetSpendingById(int id)
        {
            return _context.Spendings.Where(x => x.Id == id).FirstOrDefault();
        }
        public bool CreateSpending(SpendingModel spending)
        {
            _context.Add(spending);
            return SaveChange();
        }
        public bool UpdateSpending(SpendingModel spending)
        {
            _context.Update(spending);
            return SaveChange();
        }
        public bool DeleteSpending(SpendingModel spending)
        {
            _context.Remove(spending);
            return SaveChange();
        }
        public ICollection<StudentClassModel> GetMyTuitionDebtInformation(int studentId)
        {
            return _context.StudentClasses.Where(x => x.StudentId == studentId && x.IsPaidTuition == false).ToList();
        }
        public bool SaveChange()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
