using EnglishCenterManagement.Dtos.ClassRoomDtos;

namespace EnglishCenterManagement.Dtos.FinanceDtos
{
    public class MyTuitionDebtInformationDto
    {
        public int Id { get; set; }
        public string? Note { get; set; }
        public int ClassId { get; set; }
        public BasicClassRoomInfoDto ClassInfo { get; set; }

    }
}
