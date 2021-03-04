using adminSystem.business.userB;
using adminSystem.data.EF.repository;
using adminSystem.Entities;

using adminSystem.Model.result;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Security.Claims;

namespace adminSystem.business
{
    public class UserB:IUserB
    {
        private log4net.ILog log = log4net.LogManager.GetLogger(typeof(UserB));
        private IRepository<AdminUser> _adminUser;
        private IRepository<AdminToken> _adminToken;
        private readonly IHttpContextAccessor _httpContextAccessor;
        
        public UserB(IRepository<AdminUser> adminUser, IRepository<AdminToken> adminToken, IHttpContextAccessor httpContextAccessor)
        {
            _adminUser = adminUser;
            _adminToken = adminToken;
            _httpContextAccessor = httpContextAccessor;
         
        }
       public (bool,string,string,AdminUser) Validation(string userName,string password)
        {
        
            var user = _adminUser.Table.Where(o => o.Name == userName).FirstOrDefault();
            if (user!=null)
            {
                if (user.Password.Trim()!=password)
                {
                   
                    var currentTime = DateTime.Now;
                    log.Info(user.Name + "try to login");
                    return (false, "password is wrong", null, null); 
                }

                var token = Guid.NewGuid().ToString();
                var myToken = new AdminToken() {
                    Token = token,
                    UserId = user.Id,
                    ExpireTime = DateTime.Now.AddHours(48),
                };
                _adminToken.insert(myToken);

                log.Info(user.Name + "login succeed");

                return (true, "login succeed", token, user);
            }
           
            return (false, "user is not exist", null, null);
        }

        public void SignIn(string name,string token)
        {
            ClaimsIdentity claimsIdentity = new ClaimsIdentity("custom");
            claimsIdentity.AddClaim(new Claim(ClaimTypes.Name, name));
            claimsIdentity.AddClaim(new Claim(ClaimTypes.Sid, token));
            ClaimsPrincipal claimsPrincipal = new ClaimsPrincipal();
            claimsPrincipal.AddIdentity(claimsIdentity);
            _httpContextAccessor.HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,claimsPrincipal);
        }
        public void SignOut()
        {
            _httpContextAccessor.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }
    }
}
