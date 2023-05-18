using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Interfaces
{
    public interface ISchoolRepository
    {
        // class
        PagedResponse GetAllClasses(string? search, int page, int pageSize);
        PagedResponse GetAllClassesBySubject(string? search, int subjectId, int page, int pageSize);
        ClassModel GetClassById(int id);
        PagedResponse GetAllClassesOfStudent(string? search, int id, int page, int pageSize);
        PagedResponse GetAllClassesOfTeacher(string? search, int id, int page, int pageSize);

        // subject
        PagedResponse GetAllSubjects(string? search, SubjectStatusType? subjectStatus, int page, int pageSize);
        SubjectModel GetSubjectById(int id);
        bool CheckSubjectExists(string name);
        bool CheckSubjectExists(int id, string name);
        bool CreateSubject(SubjectModel subject);
        bool UpdateSubject(SubjectModel subject);
        bool DeleteSubject(SubjectModel subject);

        // room
        PagedResponse GetAllRooms(string? search, RoomStatusType? roomStatus, int page, int pageSize);
        RoomModel GetRoomById(int id);
        bool CheckRoomExists(string name);
        bool CheckRoomExists(int id, string name);
        bool CreateRoom(RoomModel room);
        bool UpdateRoom(RoomModel room);
        bool DeleteRoom(RoomModel room);

        // student
        StudentModel GetStudentById(int id);
        PagedResponse GetAllStudents(string? search, int page, int pageSize);
        PagedResponse GetAllStudentsInClass(int id, string? search, int page, int pageSize);
        bool CreateStudentProfile(StudentModel student);

        // teacher
        PagedResponse GetAllTeachers(string? search, int page, int pageSize);
        ICollection<UserInfoModel> GetAllTeachersInClass(int id);
        TeacherModel GetTeacherById(int id);
        bool CreateTeacherProfile(TeacherModel teacher);

        // class - reference
        bool CheckStudentClassExists(int classId, int studentId);
        bool CheckTeacherClassExists(int classId, int teacherId);
        bool CheckSubjectExistsInClass(int id);
        bool CheckTeacherStudentInSameClass(int teacherId, int studentId);
        bool IsUsedRoom(int id);
        ICollection<ClassScheduleModel> GetAllSchedulesOfClass(int id);
    }
}
