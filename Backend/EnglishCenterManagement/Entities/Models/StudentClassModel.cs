using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Entities.Models
{
    public class StudentClassModel
    {
        public int StudentId { get; set; }
        public int ClassId { get; set; }
        public bool PaidTuition { get; set; } = false;
        public string? Note { get; set; }

        // Relationship
        public StudentModel Student { get; set; }
        public ClassModel Class { get; set; }
    }
}
