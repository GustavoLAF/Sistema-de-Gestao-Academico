using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;

namespace Web.Api
{
    public static class HttpResponseHeadersExtensions
    {
        public static int PageCount(this HttpResponseHeaders headers)
        {
            return headers.TryGetValues("X-Paging-PageCount", out IEnumerable<string> pc) ? Convert.ToInt32(pc.First()) : 0;
        }

        public static int PageNumber(this HttpResponseHeaders headers)
        {
            return headers.TryGetValues("X-Paging-PageNumber", out IEnumerable<string> pn) ? Convert.ToInt32(pn.First()) : 0;
        }

        public static int PageSize(this HttpResponseHeaders headers)
        {
            return headers.TryGetValues("X-Paging-PageSize", out IEnumerable<string> ps) ? Convert.ToInt32(ps.First()) : 0;
        }

        public static int TotalCount(this HttpResponseHeaders headers)
        {
            return headers.TryGetValues("X-Paging-TotalCount", out IEnumerable<string> tc) ? Convert.ToInt32(tc.First()) : 0;
        }
    }
}
