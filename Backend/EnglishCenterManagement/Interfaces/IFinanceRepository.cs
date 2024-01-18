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
       
        PagedResponse GetAllTeacherSalaries(bool? isPaid, int page, int pageSize);
        PagedResponse GetTeacherSalaries(bool? isPaid, int page, int pageSize, int teacherId);
        TeacherSalaryModel GetTeacherSalaryById(int id);
        bool UpdateTeacherSalary(TeacherSalaryModel teacherSalary);
        bool CreateTeacherSalary(TeacherSalaryModel teacherSalary);
        bool DeleteTeacherSalary(TeacherSalaryModel teacherSalary); 
        
        PagedResponse GetStaffSalaries(bool? isPaid, int page, int pageSize, int? staffId);
        PagedResponse GetAllStaffSalaries(bool? isPaid, int page, int pageSize);
        StaffSalaryModel GetStaffSalaryById(int id);
        bool UpdateStaffSalary(StaffSalaryModel staffSalary);
        bool CreateStaffSalary(StaffSalaryModel staffSalary);
        bool DeleteStaffSalary(StaffSalaryModel staffSalary);
        
        bool SaveChange();
    }
}
