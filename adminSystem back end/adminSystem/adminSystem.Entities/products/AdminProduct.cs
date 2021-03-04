using System;
using System.Collections.Generic;

#nullable disable

namespace adminSystem.Entities
{
    public partial class AdminProduct
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }
        public bool? OnSale { get; set; }
        public string ImgUrl { get; set; }
        public string EditorState { get; set; }
    }
}
