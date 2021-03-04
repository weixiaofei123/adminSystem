using System;
using System.Collections.Generic;

#nullable disable

namespace adminSystem.Entities
{
    public partial class AdminUser
    {
        public AdminUser()
        {
            AdminTokens = new HashSet<AdminToken>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }

        public virtual ICollection<AdminToken> AdminTokens { get; set; }
    }
}
