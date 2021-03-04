using adminSystem.Entities;
using adminSystem.Model.result;
using System;
using System.Collections.Generic;
using System.Text;

namespace adminSystem.business.productB
{
   public interface IProductB
    {
        ProductRes GetPageContentList(int page, int pageSize);
        TData CreateProduct(AdminProduct product);
        TData DeleteProduct(int id);
        TData ModifyProduct(AdminProduct product);
        AdminProduct getOneById(int id);
    }
}
