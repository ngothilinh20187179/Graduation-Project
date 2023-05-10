using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Data;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Interfaces;

namespace EnglishCenterManagement.Repository
{
    public class SchoolRepository : ISchoolRepository
    {
        private readonly DataContext _context;
        public SchoolRepository(DataContext context)
        {
            _context = context;
        }

        public PagedResponse GetAllClasses(string? search, int page, int pageSize)
        {
            var allClasses = _context.Classes.AsQueryable();

            #region Filtering
            if (!String.IsNullOrEmpty(search))
            {
                allClasses = allClasses.Where(u => u.ClassTitle.Contains(search));
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

        public ClassModel GetClassById(int id)
        {
            return _context.Classes.Where(c => c.Id == id).FirstOrDefault();
        }

        public PagedResponse GetAllRooms(string? search, RoomStatusType? roomStatus, int page, int pageSize)
        {
            var allRooms = _context.Rooms.AsQueryable();

            #region Filtering
            if (!String.IsNullOrEmpty(search))
            {
                allRooms = allRooms.Where(u => u.Name.Contains(search));
            }
            if (roomStatus.HasValue)
            {
                allRooms = allRooms.Where(u => u.RoomStatus == roomStatus);
            }
            #endregion

            #region Sorting
            allRooms = allRooms.OrderByDescending(u => u.Name);
            #endregion

            #region Paginated
            var data = allRooms.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalRooms = allRooms.Count();
            #endregion

            return new PagedResponse(data, totalRooms, page, pageSize);
        }

        public PagedResponse GetAllSubjects(string? search, SubjectStatusType? subjectStatus, int page, int pageSize)
        {
            var allSubjects = _context.Subjects.AsQueryable();

            #region Filtering
            if (!String.IsNullOrEmpty(search))
            {
                allSubjects = allSubjects.Where(u => u.SubjectName.Contains(search));
            }
            if (subjectStatus.HasValue)
            {
                allSubjects = allSubjects.Where(u => u.SubjectStatus == subjectStatus);
            }
            #endregion

            #region Sorting
            allSubjects = allSubjects.OrderByDescending(u => u.SubjectName);
            #endregion

            #region Paginated
            var data = allSubjects.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalSubjects = allSubjects.Count();
            #endregion

            return new PagedResponse(data, totalSubjects, page, pageSize);
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

    }
}
