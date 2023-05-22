using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Data;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Interfaces;

namespace EnglishCenterManagement.Repository
{
    public class TeacherStudentRepository : ITeacherStudentRepository
    {
        private readonly DataContext _context;
        public TeacherStudentRepository(DataContext context)
        {
            _context = context;
        }

        // student
        public StudentModel GetStudentById(int id)
        {
            return _context.Students.Where(x => x.Id == id).FirstOrDefault();
        }
        public PagedResponse GetAllStudents(string? search, int page, int pageSize)
        {
            var allStudentIds = _context.Students.Select(x => x.Id).ToList();
            var allStudents = _context.Users.Where(x => allStudentIds.Contains(x.Id)).AsQueryable();

            #region Filtering
            if (!String.IsNullOrEmpty(search))
            {
                allStudents = allStudents.Where(x => x.FirstName.Contains(search));
            }
            #endregion

            #region Sorting
            allStudents = allStudents.OrderByDescending(x => x.LastName);
            #endregion

            #region Paginated
            var data = allStudents.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalStudents = allStudents.Count();
            #endregion

            return new PagedResponse(data, totalStudents, page, pageSize);
        }
        public PagedResponse GetAllStudentsInClass(int id, string? search, int page = 1, int pageSize = 20)
        {
            var studentIds = _context.StudentClasses.Where(x => x.ClassId == id).Select(x => x.StudentId).ToList();
            var allStudents = _context.Users.Where(x => studentIds.Contains(x.Id)).AsQueryable();

            #region Filtering
            if (!String.IsNullOrEmpty(search))
            {
                allStudents = allStudents.Where(x => x.FirstName.Contains(search));
            }
            #endregion

            #region Sorting
            allStudents = allStudents.OrderByDescending(x => x.LastName);
            #endregion

            #region Paginated
            var data = allStudents.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalStudents = allStudents.Count();
            #endregion

            return new PagedResponse(data, totalStudents, page, pageSize);
        }
        public bool CreateStudentProfile(StudentModel student)
        {
            _context.Students.Add(student);
            return SaveChange();
        }

        // teacher
        public ICollection<UserInfoModel> GetAllTeachersInClass(int id)
        {
            var teacherIds = _context.TeacherClasses.Where(x => x.ClassId == id).Select(x => x.TeacherId).ToList();
            return _context.Users.Where(x => teacherIds.Contains(x.Id)).ToList();
        }
        public PagedResponse GetAllTeachers(string? search, int page, int pageSize)
        {
            var allTeacherIds = _context.Teachers.Select(x => x.Id).ToList();
            var allTeachers = _context.Users.Where(x => allTeacherIds.Contains(x.Id)).AsQueryable();

            #region Filtering
            if (!String.IsNullOrEmpty(search))
            {
                allTeachers = allTeachers.Where(x => x.FirstName.Contains(search));
            }
            #endregion

            #region Sorting
            allTeachers = allTeachers.OrderByDescending(x => x.LastName);
            #endregion

            #region Paginated
            var data = allTeachers.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalStudents = allTeachers.Count();
            #endregion

            return new PagedResponse(data, totalStudents, page, pageSize);
        }
        public TeacherModel GetTeacherById(int id)
        {
            return _context.Teachers.Where(x => x.Id == id).FirstOrDefault();
        }
        public bool CreateTeacherProfile(TeacherModel teacher)
        {
            _context.Teachers.Add(teacher);
            return SaveChange();
        }

        // class - reference
        public bool CheckTeacherClassExists(int classId, int teacherId)
        {
            return _context.TeacherClasses.Any(x => x.ClassId == classId && x.TeacherId == teacherId);
        }
        public bool CheckStudentClassExists(int classId, int studentId)
        {
            return _context.StudentClasses.Any(x => x.ClassId == classId && x.StudentId == studentId);
        }
        public bool CheckTeacherStudentInSameClass(int teacherId, int studentId)
        {
            var teacherClassIds = _context.TeacherClasses.Where(x => x.TeacherId == teacherId).Select(x => x.ClassId).ToList();
            return _context.StudentClasses.Any(x => teacherClassIds.Contains(x.ClassId) && x.StudentId == studentId);
        }
        public bool SaveChange()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
