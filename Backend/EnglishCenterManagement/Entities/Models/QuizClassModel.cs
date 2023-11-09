﻿namespace EnglishCenterManagement.Entities.Models
{
    public class QuizClassModel
    {
        public int Id { get; set; }
        public int QuizId { get; set; }
        public int ClassId { get; set; }
        public QuizModel Quiz { get; set; }
        public ClassModel Class { get; set; }
    }
}
