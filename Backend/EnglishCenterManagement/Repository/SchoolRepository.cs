using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Data;
using EnglishCenterManagement.Entities.Enumerations;
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
            allClasses = allClasses.OrderByDescending(u => u.ClassTitle);
            #endregion

            #region Paginated
            var data = allClasses.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalClasses = allClasses.Count();
            #endregion

            return new PagedResponse(data, totalClasses, page, pageSize);
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
    }
}
