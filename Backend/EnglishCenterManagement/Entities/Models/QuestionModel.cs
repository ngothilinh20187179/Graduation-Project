namespace EnglishCenterManagement.Entities.Models
{
    public class QuestionModel
    {
        public int Id { get; set; }
        public string QuestionText { get; set; } = string.Empty;
        public int Point { get; set; }
        public int Order { get; set; }

        // relationship
        public int QuizId { get; set; }
        public QuizModel Quiz { get; set; }
        public ICollection<AnswerModel> Answers { get; set; }
    }
}
