using EnglishCenterManagement.Common.Models;

namespace EnglishCenterManagement.Models
{
    public class StudentClassModel
    {
        public int StudentId { get; set; }
        public int ClassId { get; set; }
        public StudentClassStatusType StatusStudentOfClass { get; set; }

        // Relationship
        public StudentModel Student { get; set; }
        public ClassModel Class { get; set; }
    }
}
