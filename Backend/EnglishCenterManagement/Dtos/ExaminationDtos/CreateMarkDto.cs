using EnglishCenterManagement.Entities.Models;

namespace EnglishCenterManagement.Dtos.ExaminationDtos
{
    public class CreateMarkDto
    {
        public int QuizId { get; set; }
        public int StudentId { get; set; }
        public int Point { get; set; }
        public int TotalPoint { get; set; }
    }
}
