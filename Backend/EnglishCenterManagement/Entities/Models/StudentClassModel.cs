using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Entities.Models
{
    public class StudentClassModel
    {
        public int Id { get; set; }
        public bool IsPaidTuition { get; set; } = false;
        public string? Note { get; set; }
        public int StudentId { get; set; }
        public int ClassId { get; set; }

        // Relationship
        public StudentModel Student { get; set; }
        public ClassModel Class { get; set; }
        public ICollection<StudentAttendanceModel>? StudentAttendances { get; set; }
    }
}
