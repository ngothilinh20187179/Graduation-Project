using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Data;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Interfaces;

namespace EnglishCenterManagement.Repository
{
    public class PositionPermissionRepository : IPositionPermissionRepository
    {
        private readonly DataContext _context;
        public PositionPermissionRepository(DataContext context)
        {
            _context = context;
        }

        // position
        public PagedResponse GetAllPositions(string? search, int page, int pageSize)
        {
            var allPositions = _context.Positions.AsQueryable();

            #region Filtering
            if (!String.IsNullOrEmpty(search))
            {
                allPositions = allPositions.Where(u => u.Name.Contains(search));
            }
            #endregion

            #region Sorting
            allPositions = allPositions.OrderByDescending(u => u.Name);
            #endregion

            #region Paginated
            var data = allPositions.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalPositions = allPositions.Count();
            #endregion

            return new PagedResponse(data, totalPositions, page, pageSize);
        }
        public ICollection<PositionModel> GetBasicPositionList()
        {
            return _context.Positions.ToList();
        }
        public PositionModel GetPositionById(int id)
        {
            return _context.Positions.Where(x => x.Id == id).FirstOrDefault();
        }
        public bool CreatePosition(PositionModel position)
        {
            _context.Add(position);
            return SaveChange();
        }
        public bool UpdatePosition(PositionModel position)
        {
            _context.Update(position);
            return SaveChange();
        }
        public bool CheckPositionNameExists(string name)
        {
            return _context.Positions.Any(x => x.Name == name);
        }
        public bool CheckPositionNameExists(int id, string name)
        {
            return _context.Positions.Any(x => x.Name == name && x.Id != id);
        }

        // permission
        public ICollection<PermissionModel> GetAllPermissions()
        {
            return _context.Permissions.ToList();
        }
        public PermissionModel GetPermissionById(int id)
        {
            return _context.Permissions.Where(x => x.Id == id).FirstOrDefault();
        }

        // permission-position
        public ICollection<PermissionPositionModel> GetPermissionPositionByPositionId(int id)
        {
            return _context.PermissionPositions.Where(x => x.PositionId == id).ToList();
        }
        public bool DeletePositionPermission(PermissionPositionModel positionPermission)
        {
            _context.Remove(positionPermission);
            return SaveChange();
        }
        public bool CreatePositionPermission(PermissionPositionModel positionPermission)
        {
            _context.Add(positionPermission);
            return SaveChange();
        }
        public bool SaveChange()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
