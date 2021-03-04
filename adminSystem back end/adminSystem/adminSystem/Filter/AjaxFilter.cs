using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace adminSystem.web.Filter
{
	public class AjaxFilterAttribute :Attribute,IResultFilter
	{


		
public void OnResultExecuted(ResultExecutedContext context)
        {
			

		}

        public void OnResultExecuting(ResultExecutingContext context)
        {
			context.HttpContext.Response.Headers.Add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since");
			context.HttpContext.Response.Headers.Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");

			context.HttpContext.Response.Headers.Add("Access-Control-Allow-Credentials", "true");
			context.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:8080/");

		}
	

}

}

