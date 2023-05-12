namespace EnglishCenterManagement.Dtos.SchoolDto
{
    public class BasicClassRoomInfoDto
    {
        public int Id { get; set; }
        public string ClassName { get; set; } = string.Empty;
        public DateOnly ClassStartDate { get; set; }
        public DateOnly? ClassEndDate { get; set; }
        public int NumberOfStudents { get; set; }
        public int NumberOfSessions { get; set; }
        public double Credit { get; set; }
        public string? Note { get; set; }
    }
}
