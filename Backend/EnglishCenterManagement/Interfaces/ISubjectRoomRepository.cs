using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Interfaces
{
    public interface ISubjectRoomRepository
    {
        // subject
        PagedResponse GetAllSubjects(string? search, SubjectStatusType? subjectStatus, int page, int pageSize);
        SubjectModel GetSubjectById(int id);
        bool CheckSubjectExists(string name);
        bool CheckSubjectExists(int id, string name);
        bool CreateSubject(SubjectModel subject);
        bool UpdateSubject(SubjectModel subject);
        bool DeleteSubject(SubjectModel subject);
        bool CheckSubjectExistsInClass(int id);

        // room
        PagedResponse GetAllRooms(string? search, RoomStatusType? roomStatus, int page, int pageSize);
        RoomModel GetRoomById(int id);
        bool CheckRoomExists(string name);
        bool CheckRoomExists(int id, string name);
        bool CreateRoom(RoomModel room);
        bool UpdateRoom(RoomModel room);
        bool DeleteRoom(RoomModel room);
        bool IsUsedRoom(int id);
    }
}
