namespace EnglishCenterManagement.Entities.Models
{
    public class MarkModel
    {
        public int QuizId { get; set; }
        public int StudentId { get; set; }
        public int Point { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public int TotalPoint { get; set; }
        public StudentModel Student { get; set; }
        public QuizModel Quiz { get; set; }
    }
}
