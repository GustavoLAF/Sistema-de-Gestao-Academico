using System;
using System.Collections.Generic;

namespace Web.Server
{

    public class PagedList<TItem>
    {
        /// <summary>
        /// Initializes a new instance of the <ee cref="PagedList{TItem}"/>
        /// class.
        /// </summary>
        public PagedList()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <ee cref="PagedList{TItem}"/>
        /// class.
        /// </summary>
        /// <param name="items"></param>
        /// <param name="totalCount"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        public PagedList(
           IEnumerable<TItem> items,
           int totalCount,
           int pageNumber,
           int pageSize)
        {
            Items = items;
            TotalCount = totalCount;
            PageNumber = pageNumber;
            PageSize = pageSize;
        }

        public int PageCount => TotalCount > 0 ? (int)Math.Ceiling(TotalCount / (double)PageSize) : 0;
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public IEnumerable<TItem> Items { get; set; }
    }

}
