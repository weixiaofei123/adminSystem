using adminSystem.data.EF.repository;
using adminSystem.Entities;
using adminSystem.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace adminSystem.web.Filter
{
    public class AuthorizeFilterAttribute: Attribute,IActionFilter
    {
        private CookieHelper _cookie = new CookieHelper();
        private MemoryCacheHelper _memoryCache=new MemoryCacheHelper();
     
        public AuthorizeFilterAttribute()
        {
           
        }

      
        public void OnActionExecuting(ActionExecutingContext context)
        {
            
            //get cookie

            var token = _cookie.GetCookie(ClaimTypes.Sid)?.ToString();
            if (token==null)
            {
                context.Result = new ContentResult()
                {
                    Content = "Unorthorized",
                };
                return;
            }
                //get cache
               var user= _memoryCache.GetCache(token);
                if (user==null)
                {
                var _adminToken = new adminSystemContext().AdminTokens;
                var _adminUser  = new adminSystemContext().AdminUsers;
                var id = _adminToken.Where(o => o.Token == token).FirstOrDefault().UserId;
                var sysUser= _adminUser.Where(o=>o.Id==id);
                _memoryCache.SetCache(token, sysUser);
                    if (sysUser==null)
                    {
                        context.Result = new ContentResult()
                        {
                            Content = "Unorthorized",
                        };
                    return;
                    }
                }
                       
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            
        }

       
    }
}
