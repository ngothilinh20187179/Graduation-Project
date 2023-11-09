namespace EnglishCenterManagement.Entities.Models
{
    public class TeacherClassModel
    {
        public int Id { get; set; }
        public int ClassId { get; set; }
        public int TeacherId { get; set; }
        // Relationship
        public ClassModel Class { get; set; }
        public TeacherModel Teacher { get; set; }
        public ICollection<TeacherAttendanceModel>? TeacherAttendances { get; set; }
    }
}
