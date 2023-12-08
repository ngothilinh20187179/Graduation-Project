using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Interfaces
{
    public interface IPositionPermissionRepository
    {
        PagedResponse GetAllPositions(string? search, int page, int pageSize);
        bool CreatePosition(PositionModel position);
        bool UpdatePosition(PositionModel position);
        bool SaveChange();
    }
}
