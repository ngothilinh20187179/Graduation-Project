namespace EnglishCenterManagement.Dtos.ExaminationDtos
{
    public class CreateQuestionDto
    {
        public string QuestionText { get; set; } = string.Empty;
        public int Point { get; set; }
        public ICollection<CreateAnswerDto> Answers { get; set; }
    }
}
