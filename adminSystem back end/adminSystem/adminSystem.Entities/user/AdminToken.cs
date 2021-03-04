using System;
using System.Collections.Generic;

#nullable disable

namespace adminSystem.Entities
{
    public partial class AdminToken
    {
        public int Id { get; set; }
        public string Token { get; set; }
        public int? UserId { get; set; }
        public DateTime? ExpireTime { get; set; }

        public virtual AdminUser User { get; set; }
    }
}
