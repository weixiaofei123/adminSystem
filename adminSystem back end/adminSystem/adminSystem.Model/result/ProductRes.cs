using adminSystem.Entities;
using System;
using System.Collections.Generic;
using System.Text;


namespace adminSystem.Model.result
{
   public class ProductRes
    {
        public int total { get; set; }  
        public List<AdminProduct> data { get; set; }
    }
}
