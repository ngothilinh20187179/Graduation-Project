﻿using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Interfaces
{
    public interface ITeacherStudentRepository
    {
        // student
        StudentModel GetStudentById(int id);
        PagedResponse GetAllStudents(string? search, int page, int pageSize);
        PagedResponse GetAllStudentsInClass(int id, string? search, int page, int pageSize);
        bool CreateStudentProfile(StudentModel student);
        bool UpdateStudentProfile(StudentModel student);

        // teacher
        PagedResponse GetAllTeachers(string? search, int page, int pageSize);
        ICollection<UserInfoModel> GetAllTeachersInClass(int id);
        TeacherModel GetTeacherById(int id);
        bool CreateTeacherProfile(TeacherModel teacher);
        bool UpdateTeacherProfile(TeacherModel teacher);
        bool TeacherNotExist(List<int> teacherIds);

        // class - reference
        bool CheckStudentClassExists(int classId, int studentId);
        bool CheckTeacherClassExists(int classId, int teacherId);
        bool CheckTeacherStudentInSameClass(int teacherId, int studentId);
        ICollection<TeacherClassModel> GetTeacherClassByClassId(int id);
        bool DeleteTeacherInClass(TeacherClassModel teacherClass);
        bool AddTeacherClass(TeacherClassModel teacherClass);
    }
}
