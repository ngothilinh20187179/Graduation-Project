using EnglishCenterManagement.Common.Helpers;
using EnglishCenterManagement.Common.Messages;

namespace EnglishCenterManagement.Common.Response
{
    public class PagedResponse
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalRecords { get; set; }
        public int TotalPages { get; set; }
        public object? Data { get; set; }
        public PagedResponse(object data, int totalRecords, int pageNumber, int pageSize)
        {
            Data = data;
            TotalRecords = totalRecords;
            TotalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);
            PageNumber = pageNumber;
            PageSize = pageSize;
        }
    }
}
