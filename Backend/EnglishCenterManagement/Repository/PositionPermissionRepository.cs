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
        public bool SaveChange()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
