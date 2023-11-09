namespace EnglishCenterManagement.Entities.Models
{
    public class MarkModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Point { get; set; }
        public int TotalPoint { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;

        // Relationship
        public int? QuizId { get; set; }
        public int StudentId { get; set; }
        public StudentModel Student { get; set; }
        public QuizModel? Quiz { get; set; }
    }
}
