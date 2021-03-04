
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace adminSystem.Util
{
    public class MemoryCacheHelper
    {
      
        private object value;

        public MemoryCacheHelper()
        {
        }

     

        //get memoryCache value
        public object GetCache(string key)
        {
            var _memoryCache = ServiceLocator.Instance.GetService<IMemoryCache>();
            _memoryCache.TryGetValue(key, out value);
            return value;

        }

        //set memoryCache value
        public void SetCache(string name,object value)
        {
            var _memoryCache = ServiceLocator.Instance.GetService<IMemoryCache>();
            _memoryCache.Set(name, value, DateTimeOffset.Now.AddDays(2));
        }
    }
}
