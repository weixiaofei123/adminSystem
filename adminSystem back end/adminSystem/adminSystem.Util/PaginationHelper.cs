using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adminSystem.Util
{
   public class PaginationHelper<T>
    {
        public PaginationHelper()
        {

        }

        public List<T> GetPageContentList(IQueryable<T> source,int page,int pageSize)
        {
            var items=source.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            return items;
        }
    }
}
