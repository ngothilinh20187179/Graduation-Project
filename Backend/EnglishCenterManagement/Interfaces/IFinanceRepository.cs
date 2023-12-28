using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Interfaces
{
    public interface IFinanceRepository
    {
        PagedResponse GetAllSpendings(SpendingStatusType? spendingStatus, int page, int pageSize);
        SpendingModel GetSpendingById(int id);
        bool CreateSpending(SpendingModel spending);
        bool UpdateSpending(SpendingModel spending);
        bool DeleteSpending(SpendingModel spending);
        StudentClassModel GetStudentClassById(int id);
        ICollection<StudentClassModel> GetMyTuitionDebtInformation(int studentId);
        PagedResponse GetStudentTuitionInformation(bool? isPaidTuition, int page, int pageSize);
        bool UpdateStudentClass(StudentClassModel studentClass);
        bool SaveChange();
    }
}
