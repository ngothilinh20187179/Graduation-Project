using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Interfaces
{
    public interface ISchoolRepository
    {
        PagedResponse GetAllSubjects(string? search, SubjectStatusType? subjectStatus, int page, int pageSize);
        PagedResponse GetAllClasses(string? search, int page, int pageSize);
        PagedResponse GetAllRooms(string? search, RoomStatusType? roomStatus, int page, int pageSize);
    }
}
