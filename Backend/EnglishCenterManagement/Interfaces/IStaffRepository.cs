using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Interfaces
{
    public interface IStaffRepository
    {
        PagedResponse GetAllStaffs(string? search, int page, int pageSize);
        StaffModel GetStaffById(int id);
        bool CreateStaffProfile(StaffModel newStaff);
        bool UpdateStaffProfile(StaffModel updateStaff);
        string GetStaffPositionName(int id);
    }
}
