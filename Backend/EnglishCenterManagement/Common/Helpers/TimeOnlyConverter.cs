using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EnglishCenterManagement.Common.Helpers
{
    public class TimeOnlyConverter : ValueConverter<TimeOnly, TimeSpan>
    {
        public TimeOnlyConverter() : base(
                 t => t.ToTimeSpan(),
                 ts => TimeOnly.FromTimeSpan(ts))
        { }
    }
}
