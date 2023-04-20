 namespace EnglishCenterManagement.Common.Helpers
{
    public class ConvertDateUtils
    {
        public ConvertDateUtils() { }
        public DateTime ConvertUnixTimeToDateTime(long utcExpireDate)
        {
            DateTime dateTime = new(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dateTime = dateTime.AddSeconds(utcExpireDate).ToLocalTime();
            return dateTime;
        }
    }
}
