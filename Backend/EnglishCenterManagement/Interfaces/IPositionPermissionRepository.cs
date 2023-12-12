using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Interfaces
{
    public interface IPositionPermissionRepository
    {
        PagedResponse GetAllPositions(string? search, int page, int pageSize);
        PositionModel GetPositionById(int id);
        bool CreatePosition(PositionModel position);
        bool UpdatePosition(PositionModel position);
        bool CheckPositionNameExists(string name);
        bool CheckPositionNameExists(int id, string name);
        ICollection<PositionModel> GetBasicPositionList();
        ICollection<PermissionModel> GetAllPermissions();
        PermissionModel GetPermissionById(int id);
        bool DeletePositionPermission(PermissionPositionModel positionPermission);
        bool CreatePositionPermission(PermissionPositionModel positionPermission);
        ICollection<PermissionPositionModel> GetPermissionPositionByPositionId(int id);
        bool SaveChange();
    }
}
