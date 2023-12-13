using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Interfaces
{
    public interface IFinanceRepository
    {
        PagedResponse GetAllSpendings(SpendingStatusType? spendingStatus, int page, int pageSize);
        SpendingModel GetAllSpendingById(int id);
        bool CreateSpending(SpendingModel spending);
        bool UpdateSpending(SpendingModel spending);
        bool DeleteSpending(SpendingModel spending);
        bool SaveChange();
    }
}
