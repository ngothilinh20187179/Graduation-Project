namespace EnglishCenterManagement.Dtos.ExaminationDtos
{
    public class UpdateQuizDto
    {
        public string Name { get; set; }
        public TimeOnly Duration { get; set; }
        public List<Question> Questions { get; set; }
        public record Question
        {
            public int Id { get; set; }
            public string QuestionText { get; set; } = string.Empty;
            public int Point { get; set; }
            public List<Answer> Answers { get; set; }
        }
        public record Answer
        {
            public int Id { get; set; }
            public string AnswerText { get; set; }
            public bool IsCorrect { get; set; }
        }
    }
}
