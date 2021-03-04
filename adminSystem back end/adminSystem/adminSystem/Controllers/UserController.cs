using adminSystem.business.userB;
using adminSystem.Model;
using adminSystem.Model.result;
using adminSystem.web.Filter;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace adminSystem.web.Controllers
{
    [Route("api/[controller]/[action]")]
    [AjaxFilter]
    public class UserController : Controller
    {
        private  log4net.ILog log = log4net.LogManager.GetLogger(typeof(UserController));

        private IUserB _userB;
        private IHttpContextAccessor _httpContextAccessor;
        public UserController(IUserB userB, IHttpContextAccessor httpContextAccessor)
        {
            _userB = userB;
            _httpContextAccessor = httpContextAccessor;
        }
  
        public IActionResult Login( [FromBody] userParam account)
        {
            var loginRes = new LoginRes();
            if (ModelState.IsValid)
            {
                var userName = account.UserName;
                var password = account.Password;
                var resValidation=_userB.Validation(userName, password);
                if(resValidation.Item1)
                {
                    _userB.SignIn(resValidation.Item4.Name, resValidation.Item3);
                }


                loginRes.Status = resValidation.Item1;
                loginRes.Message = resValidation.Item2;
                return Ok(loginRes);
            }
            loginRes.Status = false;
            loginRes.Message = "input is wrong";
            return Ok(loginRes);
        }


        //logout
        public IActionResult Logout()
        {
            _userB.SignOut();
            return Ok();
        }
        public IActionResult Test()
        {
            var tem = _httpContextAccessor.HttpContext.Request;
            log.Info("nnn");
            return Ok();
        }
    }
}
