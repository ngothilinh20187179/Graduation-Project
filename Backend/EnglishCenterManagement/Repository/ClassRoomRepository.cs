using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Data;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Interfaces;

namespace EnglishCenterManagement.Repository
{
    public class ClassRoomRepository : IClassRoomRepository
    {
        private readonly DataContext _context;
        public ClassRoomRepository(DataContext context)
        {
            _context = context;
        }

        // class
        public PagedResponse GetAllClasses(string? search, int page, int pageSize)
        {
            var allClasses = _context.Classes.AsQueryable();

            #region Filtering
            if (!String.IsNullOrEmpty(search))
            {
                allClasses = allClasses.Where(u => u.ClassName.Contains(search));
            }
            #endregion

            #region Sorting
            allClasses = allClasses.OrderByDescending(u => u.ClassStartDate);
            #endregion

            #region Paginated
            var data = allClasses.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalClasses = allClasses.Count();
            #endregion

            return new PagedResponse(data, totalClasses, page, pageSize);
        }
        public PagedResponse GetAllClassesBySubject(string? search, int subjectId, int page, int pageSize)
        {
            var allClassesBySubjectId = _context.Classes.Where(x => x.SubjectId == subjectId).AsQueryable();

            #region Filtering
            if (!String.IsNullOrEmpty(search))
            {
                allClassesBySubjectId = allClassesBySubjectId.Where(u => u.ClassName.Contains(search));
            }
            #endregion

            #region Sorting
            allClassesBySubjectId = allClassesBySubjectId.OrderByDescending(u => u.ClassStartDate);
            #endregion

            #region Paginated
            var data = allClassesBySubjectId.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalClasses = allClassesBySubjectId.Count();
            #endregion

            return new PagedResponse(data, totalClasses, page, pageSize);
        }
        public ClassModel GetClassById(int id)
        {
            return _context.Classes.Where(c => c.Id == id).FirstOrDefault();
        }
        public PagedResponse GetAllClassesOfStudent(string? search, int id, int page, int pageSize)
        {
            var classIds = _context.StudentClasses.Where(x => x.StudentId == id).Select(x => x.ClassId).ToList();
            var allClasses = _context.Classes.Where(x => classIds.Contains(x.Id)).AsQueryable();

            #region Filtering
            if (!String.IsNullOrEmpty(search))
            {
                allClasses = allClasses.Where(x => x.ClassName.Contains(search));
            }
            #endregion

            #region Sorting
            allClasses = allClasses.OrderByDescending(x => x.ClassStartDate);
            #endregion

            #region Paginated
            var data = allClasses.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalClasses = allClasses.Count();
            #endregion

            return new PagedResponse(data, totalClasses, page, pageSize);
        }
        public PagedResponse GetAllClassesOfTeacher(string? search, int id, int page, int pageSize)
        {
            var classIds = _context.TeacherClasses.Where(x => x.TeacherId == id).Select(x => x.ClassId).ToList();
            var allClasses = _context.Classes.Where(x => classIds.Contains(x.Id)).AsQueryable();

            #region Filtering
            if (!String.IsNullOrEmpty(search))
            {
                allClasses = allClasses.Where(x => x.ClassName.Contains(search));
            }
            #endregion

            #region Sorting
            allClasses = allClasses.OrderByDescending(x => x.ClassStartDate);
            #endregion

            #region Paginated
            var data = allClasses.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalClasses = allClasses.Count();
            #endregion

            return new PagedResponse(data, totalClasses, page, pageSize);
        }

        
        public ICollection<ClassScheduleModel> GetAllSchedulesOfClass(int id)
        {
            return _context.ClassSchedules.Where(x => x.ClassId == id).ToList();
        }

        public bool SaveChange()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
