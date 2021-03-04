using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using adminSystem.business;
using adminSystem.business.productB;
using adminSystem.business.userB;
using adminSystem.data.EF;
using adminSystem.data.EF.repository;
using adminSystem.Entities;
using adminSystem.Util;
using DocumentFormat.OpenXml.Office2010.Excel;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;

namespace adminSystem
{
    public class Startup
    {
     
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddScoped<adminSystemContext>();
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IUserB,UserB>();
            services.AddScoped<IProductB,ProductB>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IMemoryCache,MemoryCache>();




            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
    
        options.Cookie.SameSite = SameSiteMode.Unspecified;
        options.ExpireTimeSpan = TimeSpan.FromDays(150);
    });

            /*services.AddHttpContextAccessor();*/

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }

      

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            ServiceLocator.Instance = app.ApplicationServices;
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseRouting();
         
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

    

}
