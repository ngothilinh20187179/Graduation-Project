namespace EnglishCenterManagement.Dtos.ExaminationDtos
{
    public class QuizSubmitDto
    {
        public int Id { get; set; }
        public List<QuestionResult> Questions { get; set; }
        public record QuestionResult
        {
            public int QuestionId { get; set; }
            public List<int> AnswerIds { get; set; }
        }
    }
}
