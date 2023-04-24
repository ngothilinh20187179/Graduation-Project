using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EnglishCenterManagement.Common.Helpers
{
    public class DateOnlyConverter : ValueConverter<DateOnly, DateTime>
    {
        public DateOnlyConverter() : base(
                 d => d.ToDateTime(TimeOnly.MinValue),
                 dt => DateOnly.FromDateTime(dt))
        { }
    }
}
