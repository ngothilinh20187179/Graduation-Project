namespace EnglishCenterManagement.Dtos.ExaminationDtos
{
    public class CreateQuizDto
    {
        public string Name { get; set; }
        public TimeOnly Duration { get; set; }
        public ICollection<CreateQuestionDto> Questions { get; set; }
    }
}
