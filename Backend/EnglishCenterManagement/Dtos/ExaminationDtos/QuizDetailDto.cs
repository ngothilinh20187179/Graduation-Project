namespace EnglishCenterManagement.Dtos.ExaminationDtos
{
    public class QuizDetailDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public TimeOnly Duration { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public int TotalPoint { get; set; } = 0;
        public int TotalQuestion { get; set; } = 0;
        public ICollection<QuestionDto> Questions { get; set; }
    }
}
