using EnglishCenterManagement.Entities.Enumerations;

namespace EnglishCenterManagement.Entities.Models
{
    public class SubjectModel
    {
        public int Id { get; set; }
        public string SubjectName { get; set; } = string.Empty;
        public string SubjectDescription { get; set; } = string.Empty;
        public SubjectStatusType SubjectStatus { get; set; }
        public string? Note { get; set; }

        // Relationship 1Subject - nClass
        public ICollection<ClassModel>? Classes { get; set; }
    }
}
