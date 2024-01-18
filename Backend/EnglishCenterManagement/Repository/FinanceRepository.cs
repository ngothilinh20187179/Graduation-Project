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
        
        public StudentClassModel GetStudentClassById(int id)
        {
            return _context.StudentClasses.Where(x => x.Id == id).FirstOrDefault();
        }
        public ICollection<StudentClassModel> GetMyTuitionDebtInformation(int studentId)
        {
            return _context.StudentClasses.Where(x => x.StudentId == studentId && x.IsPaidTuition == false).ToList();
        }
        public PagedResponse GetStudentTuitionInformation(bool? isPaidTuition, int page, int pageSize)
        {
            var allStudentTuitions = _context.StudentClasses.AsQueryable();

            #region Filtering
            if (isPaidTuition.HasValue)
            {
                allStudentTuitions = allStudentTuitions.Where(u => u.IsPaidTuition == isPaidTuition);
            }
            #endregion

            #region Sorting
            allStudentTuitions = allStudentTuitions.OrderByDescending(u => u.Id);
            #endregion

            #region Paginated
            var data = allStudentTuitions.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var total = allStudentTuitions.Count();
            #endregion

            return new PagedResponse(data, total, page, pageSize);
        }
        public bool UpdateStudentClass(StudentClassModel studentClass)
        {
            _context.Update(studentClass);
            return SaveChange();
        }
       
        public PagedResponse GetAllTeacherSalaries(bool? isPaid, int page, int pageSize)
        {
            var allTeacherSalaries = _context.TeacherSalaries.AsQueryable();

            #region Filtering
            if (isPaid.HasValue)
            {
                allTeacherSalaries = allTeacherSalaries.Where(u => u.IsPaid == isPaid);
            }
            #endregion

            #region Sorting
            allTeacherSalaries = allTeacherSalaries.OrderByDescending(u => u.CreatedOn);
            #endregion

            #region Paginated
            var data = allTeacherSalaries.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var total = allTeacherSalaries.Count();
            #endregion

            return new PagedResponse(data, total, page, pageSize);
        }
        public PagedResponse GetTeacherSalaries(bool? isPaid, int page, int pageSize, int teacherId)
        {
            var allTeacherSalaries = _context.TeacherSalaries.AsQueryable();
            allTeacherSalaries = allTeacherSalaries.Where(u => u.TeacherId == teacherId);

            #region Filtering
            if (isPaid.HasValue)
            {
                allTeacherSalaries = allTeacherSalaries.Where(u => u.IsPaid == isPaid);
            }
            #endregion

            #region Sorting
            allTeacherSalaries = allTeacherSalaries.OrderByDescending(u => u.CreatedOn);
            #endregion

            #region Paginated
            var data = allTeacherSalaries.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var total = allTeacherSalaries.Count();
            #endregion

            return new PagedResponse(data, total, page, pageSize);
        }
        public TeacherSalaryModel GetTeacherSalaryById(int id)
        {
            return _context.TeacherSalaries.Where(x => x.Id == id).FirstOrDefault();
        }
        public bool CreateTeacherSalary(TeacherSalaryModel teacherSalary)
        {
            _context.Add(teacherSalary);
            return SaveChange();
        }
        public bool UpdateTeacherSalary(TeacherSalaryModel teacherSalary)
        {
            _context.Update(teacherSalary);
            return SaveChange();
        }
        public bool DeleteTeacherSalary(TeacherSalaryModel teacherSalary)
        {
            _context.Remove(teacherSalary);
            return SaveChange();
        }
        
        public PagedResponse GetStaffSalaries(bool? isPaid, int page, int pageSize, int? staffId)
        {
            var allStaffSalaries = _context.StaffSalaries.AsQueryable();
            allStaffSalaries = allStaffSalaries.Where(u => u.StaffId == staffId);

            #region Filtering
            if (isPaid.HasValue)
            {
                allStaffSalaries = allStaffSalaries.Where(u => u.IsPaid == isPaid);
            }
            #endregion

            #region Sorting
            allStaffSalaries = allStaffSalaries.OrderByDescending(u => u.CreateOn);
            #endregion

            #region Paginated
            var data = allStaffSalaries.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var total = allStaffSalaries.Count();
            #endregion

            return new PagedResponse(data, total, page, pageSize);
        }
        public PagedResponse GetAllStaffSalaries(bool? isPaid, int page, int pageSize)
        {
            var allStaffSalaries = _context.StaffSalaries.AsQueryable();

            #region Filtering
            if (isPaid.HasValue)
            {
                allStaffSalaries = allStaffSalaries.Where(u => u.IsPaid == isPaid);
            }
            #endregion

            #region Sorting
            allStaffSalaries = allStaffSalaries.OrderByDescending(u => u.CreateOn);
            #endregion

            #region Paginated
            var data = allStaffSalaries.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var total = allStaffSalaries.Count();
            #endregion

            return new PagedResponse(data, total, page, pageSize);
        }
        public StaffSalaryModel GetStaffSalaryById(int id)
        {
            return _context.StaffSalaries.Where(x => x.Id == id).FirstOrDefault();
        }
        public bool CreateStaffSalary(StaffSalaryModel staffSalary)
        {
            _context.Add(staffSalary);
            return SaveChange();
        }
        public bool UpdateStaffSalary(StaffSalaryModel staffSalary)
        {
            _context.Update(staffSalary);
            return SaveChange();
        }
        public bool DeleteStaffSalary(StaffSalaryModel staffSalary)
        {
            _context.Remove(staffSalary);
            return SaveChange();
        }
        public bool SaveChange()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
