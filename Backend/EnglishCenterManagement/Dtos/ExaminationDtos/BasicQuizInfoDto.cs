namespace EnglishCenterManagement.Dtos.ExaminationDtos
{
    public class BasicQuizInfoDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public TimeOnly Duration { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
    }
}
