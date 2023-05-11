using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Interfaces
{
    public interface ISchoolRepository
    {
        // class
        PagedResponse GetAllClasses(string? search, int page, int pageSize);
        ClassModel GetClassById(int id);

        // subject
        PagedResponse GetAllSubjects(string? search, SubjectStatusType? subjectStatus, int page, int pageSize);
        SubjectModel GetSubjectById(int id);
        bool CheckSubjectExists(string name);
        bool CreateSubject(SubjectModel subject);
        bool UpdateSubject(SubjectModel subject);
        bool DeleteSubject(SubjectModel subject);

        // room
        PagedResponse GetAllRooms(string? search, RoomStatusType? roomStatus, int page, int pageSize);
        RoomModel GetRoomById(int id);
        bool DeleteRoom(RoomModel room);

        // student
        PagedResponse GetAllStudents(string? search, int page, int pageSize);
        PagedResponse GetAllStudentsInClass(int id, string? search, int page, int pageSize);

        // teacher
        PagedResponse GetAllTeachers(string? search, int page, int pageSize);
        ICollection<UserInfoModel> GetAllTeachersInClass(int id);

        // class - reference
        bool CheckStudentClassExists(int classId, int studentId);
        bool CheckTeacherClassExists(int classId, int teacherId);
        bool CheckSubjectExistsInClass(int id);
        bool CheckRoomExistsInClass(int id);
    }
}
