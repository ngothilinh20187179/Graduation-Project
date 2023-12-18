namespace EnglishCenterManagement.Dtos.ExaminationDtos
{
    public class QuizMarkDto
    {
        public int Id { get; set; }
        public int QuizId { get; set; }
        public string NameQuiz { get; set; }
        public int Point { get; set; }
        public int TotalPoint { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
    }
}
