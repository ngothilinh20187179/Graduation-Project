namespace EnglishCenterManagement.Entities.Models
{
    public class StudentModel
    {
        public int Id { get; set; }
        public string? ParentsName { get; set; }
        public string? ParentPhoneNumber { get; set; }
        public string? Note { get; set; }

        // Relationship 1 Student hoc duoc nhieu class
        public ICollection<StudentClassModel>? StudentClasses { get; set; }
        public UserInfoModel User { get; set; }
    }
}
