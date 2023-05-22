namespace EnglishCenterManagement.Entities.Models
{
    public class AnswerModel
    {
        public int Id { get; set; }
        public string AnswerText { get; set; }
        public bool IsCorrect { get; set; }

        // relationship
        public int QuestionId { get; set; }
        public QuestionModel Question { get; set; }
    }
}
