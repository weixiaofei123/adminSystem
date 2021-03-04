using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System.Security.Claims;

namespace adminSystem.Util
{
    public class CookieHelper
    {

      
        public CookieHelper()
        {
        }

     

        //get Cookie
      public object GetCookie(string name)
        {
            //get httpContextAccessor from the serviceCollection
            var _httpContextAccessor = ServiceLocator.Instance.GetService<IHttpContextAccessor>();

            _httpContextAccessor.HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            var value = _httpContextAccessor.HttpContext.User.FindFirst(name).Value;
            return value;
        }

        //write cookie
        public void WriteCookie(string name, string value)
        {
            var _httpContextAccessor = ServiceLocator.Instance.GetService<IHttpContextAccessor>();

            ClaimsIdentity identity = new ClaimsIdentity();
            identity.AddClaim(new Claim(name,value));
            ClaimsPrincipal claimsPrincipal = new ClaimsPrincipal(identity);
          _httpContextAccessor.HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);
        }
    }
}
