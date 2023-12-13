using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Dtos.FinanceDtos
{
    public class CreateUpdateSpendingDto
    {
        public string SpendOn { get; set; }
        public int Budget { get; set; }
        public string? Description { get; set; }
    }
}
