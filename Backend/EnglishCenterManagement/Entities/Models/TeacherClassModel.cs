namespace EnglishCenterManagement.Entities.Models
{
    public class TeacherClassModel
    {
        public int ClassId { get; set; }
        public int TeacherId { get; set; }
        // Relationship
        public ClassModel Class { get; set; }
        public TeacherModel Teacher { get; set; }
    }
}
