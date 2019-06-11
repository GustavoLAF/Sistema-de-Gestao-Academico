using Microsoft.AspNetCore.Http;
using System;

namespace Web.Api
{
    public static class HttpResponseExtensions
    {
        public static void AddPagingHeaders(this HttpResponse response, int pageNumber, int pageSize, long totalRecords)
        {
            int pageCount = totalRecords > 0 ? (int)Math.Ceiling(totalRecords / (double)pageSize) : 0;

            response.Headers.Add("X-Paging-PageCount", $"{pageCount}");
            response.Headers.Add("X-Paging-PageNumber", $"{pageNumber}");
            response.Headers.Add("X-Paging-PageSize", $"{pageSize}");
            response.Headers.Add("X-Paging-TotalCount", $"{totalRecords}");
        }
    }
}
