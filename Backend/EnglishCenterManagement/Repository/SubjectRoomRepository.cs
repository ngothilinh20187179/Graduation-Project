using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Data;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Interfaces;

namespace EnglishCenterManagement.Repository
{
    public class SubjectRoomRepository : ISubjectRoomRepository
    {
        private readonly DataContext _context;
        public SubjectRoomRepository(DataContext context)
        {
            _context = context;
        }
        // room
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
        public RoomModel GetRoomById(int id)
        {
            return _context.Rooms.Where(x => x.Id == id).FirstOrDefault();
        }
        public bool CheckRoomExists(string name)
        {
            return _context.Rooms.Any(x => x.Name == name);
        }
        public bool CheckRoomExists(int id, string name)
        {
            return _context.Rooms.Any(x => x.Name == name && x.Id != id);
        }
        public bool CreateRoom(RoomModel room)
        {
            _context.Add(room);
            return SaveChange();
        }
        public bool UpdateRoom(RoomModel room)
        {
            _context.Update(room);
            return SaveChange();
        }
        public bool DeleteRoom(RoomModel room)
        {
            _context.Remove(room);
            return SaveChange();
        }
        public bool IsUsedRoom(int id)
        {
            return _context.ClassSchedules.Any(x => x.RoomId == id);
        }

        // subject
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
        public SubjectModel GetSubjectById(int id)
        {
            return _context.Subjects.Where(x => x.Id == id).FirstOrDefault();
        }
        public bool CheckSubjectExists(string name)
        {
            return _context.Subjects.Any(x => x.SubjectName == name);
        }
        public bool CheckSubjectExists(int id, string name)
        {
            return _context.Subjects.Any(x => x.SubjectName == name && x.Id != id);
        }
        public bool CreateSubject(SubjectModel subject)
        {
            _context.Add(subject);
            return SaveChange();
        }
        public bool UpdateSubject(SubjectModel subject)
        {
            _context.Update(subject);
            return SaveChange();
        }
        public bool DeleteSubject(SubjectModel subject)
        {
            _context.Remove(subject);
            return SaveChange();
        }
        public bool CheckSubjectExistsInClass(int id)
        {
            return _context.Classes.Any(x => x.SubjectId == id);
        }
        public bool SaveChange()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
