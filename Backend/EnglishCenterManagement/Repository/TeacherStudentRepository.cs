using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Data;
using EnglishCenterManagement.Entities.Enumerations;
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
        public ICollection<UserInfoModel> GetAllStudentsInClass(int id)
        {
            var studentIds = _context.StudentClasses.Where(x => x.ClassId == id).Select(x => x.StudentId).ToList();
            var allStudents = _context.Users.Where(x => studentIds.Contains(x.Id)).ToList();

            return allStudents;
        }
        public bool CreateStudentProfile(StudentModel student)
        {
            _context.Students.Add(student);
            return SaveChange();
        }
        public bool UpdateStudentProfile(StudentModel student)
        {
            _context.Students.Update(student);
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
        public bool UpdateTeacherProfile(TeacherModel teacher)
        {
            _context.Teachers.Update(teacher);
            return SaveChange();
        }
        public bool TeacherNotExist(List<int> teacherIds)
        {
            return _context.Teachers.Any(x => !teacherIds.Contains(x.Id));
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
        public ICollection<TeacherClassModel> GetTeacherClassByClassId(int id)
        {
            return _context.TeacherClasses.Where(x => x.ClassId == id).ToList();
        }
        public ICollection<ClassModel> GetAllClassOfTeacherByStatus(ClassStatusType status ,int id)
        {
            var classIds = _context.TeacherClasses.Where(x => x.TeacherId == id).Select(x => x.ClassId).ToList();
            var allClasses = _context.Classes.Where(x => classIds.Contains(x.Id)).ToList();
            allClasses = allClasses.Where(x => x.ClassStatus == status).ToList();
            return allClasses;
        }
        public ICollection<ClassModel> GetAllClassOfStudentByStatus(ClassStatusType status, int id)
        {
            var classIds = _context.StudentClasses.Where(x => x.StudentId == id).Select(x => x.ClassId).ToList();
            var allClasses = _context.Classes.Where(x => classIds.Contains(x.Id)).ToList();
            allClasses = allClasses.Where(x => x.ClassStatus == status).ToList();
            return allClasses;
        }
        public bool AddTeacherClass(TeacherClassModel teacherClass)
        {
            _context.Add(teacherClass);
            return SaveChange();
        }
        public bool DeleteTeacherInClass(TeacherClassModel teacherClass)
        {
            _context.Remove(teacherClass);
            return SaveChange();
        }
        public bool SaveChange()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
