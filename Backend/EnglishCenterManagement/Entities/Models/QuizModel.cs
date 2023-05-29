using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Entities.Models
{
    public class QuizModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public TimeOnly Duration { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public QuizStatusType Status { get; set; } = QuizStatusType.NobodyDid;

        // relationship
        public int TeacherId { get; set; }
        public TeacherModel Teacher { get; set; }
        public ICollection<QuizClassModel>? QuizzClasses { get; set; }
        public ICollection<QuestionModel> Questions { get; set; }
        public ICollection<MarkModel>? Marks { get; set; }
    }
}
