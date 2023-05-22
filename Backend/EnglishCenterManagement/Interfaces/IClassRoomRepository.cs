﻿using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Interfaces
{
    public interface IClassRoomRepository
    {
        // class
        PagedResponse GetAllClasses(string? search, int page, int pageSize);
        PagedResponse GetAllClassesBySubject(string? search, int subjectId, int page, int pageSize);
        ClassModel GetClassById(int id);
        PagedResponse GetAllClassesOfStudent(string? search, int id, int page, int pageSize);
        PagedResponse GetAllClassesOfTeacher(string? search, int id, int page, int pageSize);

        ICollection<ClassScheduleModel> GetAllSchedulesOfClass(int id);
    }
}
