using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Dtos.ExaminationDtos
{
    public class QuestionDto
    {
        public int Id { get; set; }
        public string QuestionText { get; set; } = string.Empty;
        public int Point { get; set; }
        public int Order { get; set; }
        public ICollection<AnswerDto> Answers { get; set; }
    }
}
