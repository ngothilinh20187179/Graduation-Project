using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Dtos.UserInfoDtos;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Interfaces
{
    public interface ITeacherStudentRepository
    {
        // student
        StudentModel GetStudentById(int id);
        PagedResponse GetAllStudents(string? search, int page, int pageSize);
        PagedResponse GetAllStudentsInClass(int id, string? search, int page, int pageSize);
        ICollection<UserInfoModel> GetAllStudentsInClass(int id);
        bool CreateStudentProfile(StudentModel student);
        bool UpdateStudentProfile(StudentModel student);
        GenderStatistical GenderStudentStatistical();
        bool CreateStudentAttendance(StudentAttendanceModel studentAttendance);
        ICollection<UserInfoModel> GetAllStudentsNotInClass(int id);

        // teacher
        PagedResponse GetAllTeachers(string? search, int page, int pageSize);
        ICollection<UserInfoModel> GetAllTeachers();
        ICollection<UserInfoModel> GetAllTeachersInClass(int id);
        TeacherModel GetTeacherById(int id);
        bool CreateTeacherProfile(TeacherModel teacher);
        bool UpdateTeacherProfile(TeacherModel teacher);
        bool TeacherNotExist(List<int> teacherIds);

        // class - reference
        bool CheckStudentClassExists(int classId, int studentId);
        bool CheckTeacherClassExists(int classId, int teacherId);
        StudentClassModel GetStudentClassId(int classId, int studentId);
        bool CheckTeacherStudentInSameClass(int teacherId, int studentId);
        ICollection<TeacherClassModel> GetTeacherClassByClassId(int id);
        bool DeleteTeacherInClass(TeacherClassModel teacherClass);
        ICollection<ClassModel> GetAllClassOfTeacherByStatus(ClassStatusType status, int id);
        ICollection<ClassModel> GetAllClassOfStudentByStatus(ClassStatusType status, int id);
        ICollection<ClassModel> GetAllClassInProgressOrNotStartOfStudent(int id);
        bool AddStudentClass(StudentClassModel studentClass);
        bool AddTeacherClass(TeacherClassModel teacherClass);
    }
}
