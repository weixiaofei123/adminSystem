using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace adminSystem.Model
{
    public class userParam
 {
    [Required]
    
    public string UserName { get; set; }
    [Required]
 
    public string Password { get; set; }

 }
}