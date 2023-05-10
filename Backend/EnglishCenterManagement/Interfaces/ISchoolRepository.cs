using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Interfaces
{
    public interface ISchoolRepository
    {
        PagedResponse GetAllClasses(string? search, int page, int pageSize);
        public ClassModel GetClassById(int id);
        PagedResponse GetAllSubjects(string? search, SubjectStatusType? subjectStatus, int page, int pageSize);
        PagedResponse GetAllRooms(string? search, RoomStatusType? roomStatus, int page, int pageSize);
        PagedResponse GetAllStudents(string? search, int page, int pageSize);
        PagedResponse GetAllTeachers(string? search, int page, int pageSize);
    }
}
