namespace EnglishCenterManagement.Dtos.SchoolDto
{
    public class ClassRoomDetailDto : BasicClassRoomInfoDto
    {
        public double Credit { get; set; }
        public int Number { get; set; }
        public string? Note { get; set; }
        public SubjectDto Subject { get; set; }
        public RoomDto? Room { get; set; }
    }
}
