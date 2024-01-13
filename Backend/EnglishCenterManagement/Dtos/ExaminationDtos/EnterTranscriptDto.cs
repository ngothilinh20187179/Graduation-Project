namespace EnglishCenterManagement.Dtos.ExaminationDtos
{
    public class EnterTranscriptDto
    {
        public string Name { get; set; }
        public int TotalPoint { get; set; }
        public List<TranscriptResult> Transcripts { get; set; }
        public record TranscriptResult
        {
            public int StudentId { get; set; }
            public int Point { get; set; }
        }
    }
}
