namespace EnglishCenterManagement.Dtos.ExaminationDtos
{
    public class MarkDto
    {
        public int QuizId { get; set; }
        public string Name { get; set; }
        public int Point { get; set; }
        public int TotalPoint { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
    }
}
