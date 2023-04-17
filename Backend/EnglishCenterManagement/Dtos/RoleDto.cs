using EnglishCenterManagement.Common.Models;

namespace EnglishCenterManagement.Dtos
{
    public class RoleDto
    {
        public int Id { get; set; }
        public RoleType Type { get; set; }
        public string? Description { get; set; }
    }
}
