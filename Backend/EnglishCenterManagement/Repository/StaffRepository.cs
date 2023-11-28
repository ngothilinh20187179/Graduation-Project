using EnglishCenterManagement.Common.Response;
using EnglishCenterManagement.Data;
using EnglishCenterManagement.Entities.Enumerations;
using EnglishCenterManagement.Entities.Models;
using EnglishCenterManagement.Interfaces;

namespace EnglishCenterManagement.Repository
{
    public class StaffRepository : IStaffRepository
    {
        private readonly DataContext _context;
        public StaffRepository(DataContext context)
        {
            _context = context;
        }
        public PagedResponse GetAllStaffs(string? search, int page, int pageSize)
        {
            //var allStaffIds = _context.Staffs.Select(x => x.Id).ToList();
            //var allStaffs = _context.Users.Where(x => allStaffIds.Contains(x.Id)).AsQueryable();

            var allStaffs = _context.Users.Where(x => x.Role == RoleType.Staff).AsQueryable();

            #region Filtering
            if (!String.IsNullOrEmpty(search))
            {
                allStaffs = allStaffs.Where(x => x.FirstName.Contains(search));
            }
            #endregion

            #region Sorting
            allStaffs = allStaffs.OrderByDescending(x => x.CreatedOn);
            #endregion

            #region Paginated
            var data = allStaffs.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            var totalStudents = allStaffs.Count();
            #endregion

            return new PagedResponse(data, totalStudents, page, pageSize);
        }
        public bool CreateStaffProfile(StaffModel newStaff)
        {
            _context.Staffs.Add(newStaff);
            return SaveChange();
        }
        public bool UpdateStaffProfile(StaffModel updateStaff)
        {
            _context.Staffs.Update(updateStaff);
            return SaveChange();
        }
        public StaffModel GetStaffById(int id)
        {
            return _context.Staffs.Where(x => x.Id == id).FirstOrDefault();
        }
        public string GetStaffPositionName (int id)
        {
            var staff = _context.Staffs.Where(x => x.Id == id).FirstOrDefault();
            var positionId = staff.PositionId;
            var position = _context.Positions.Where(x => x.Id == positionId).FirstOrDefault();
            return position.Name;
        }

        public ICollection<PositionModel> GetBasicPositionList()
        {
            return _context.Positions.ToList();
        }

        public bool SaveChange()
        {
            return _context.SaveChanges() > 0;
        }
    }
}
