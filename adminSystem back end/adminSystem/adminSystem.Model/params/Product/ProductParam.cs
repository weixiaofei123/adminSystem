using System;
using System.Collections.Generic;
using System.Text;

namespace adminSystem.Model { 
    public class ProductParam
{
   public int Id { get; set; }
    public string Name { get; set; }
    
    
        public decimal Price { get; set; }
        public Boolean OnSale { get; set; }
        public string ImgURL { get; set; }
        public string EditorState { get; set; }

    }
}
