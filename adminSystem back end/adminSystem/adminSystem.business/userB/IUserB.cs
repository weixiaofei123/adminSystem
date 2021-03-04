using adminSystem.Entities;

using adminSystem.Model.result;
using System;
using System.Collections.Generic;
using System.Text;

namespace adminSystem.business.userB
{
    public interface IUserB
    {

        (bool, string, string, AdminUser) Validation(string userName, string password);
       void SignIn(string name, string token);
         void SignOut();
    }
}
