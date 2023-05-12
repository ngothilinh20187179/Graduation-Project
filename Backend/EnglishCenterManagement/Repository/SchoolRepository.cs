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
        public RoomModel GetRoomById (int id)
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

        // student
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

        // class - reference
        public bool CheckTeacherClassExists(int classId, int teacherId)
        {
            return _context.TeacherClasses.Any(x => x.ClassId == classId && x.TeacherId == teacherId);
        }
        public bool CheckStudentClassExists(int classId, int studentId)
        {
            return _context.StudentClasses.Any(x => x.ClassId == classId && x.StudentId == studentId);
        }
        public bool CheckSubjectExistsInClass(int id)
        {
            return _context.Classes.Any(x => x.SubjectId == id);
        }
        public bool IsUsedRoom(int id)
        {
            return _context.ClassSchedules.Any(x => x.RoomId == id);
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
