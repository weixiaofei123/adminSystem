using adminSystem.data.EF;
using adminSystem.data.EF.repository;
using adminSystem.Entities;
using adminSystem.Model.result;
using adminSystem.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adminSystem.business.productB
{
   public class ProductB:IProductB
    {
        private IRepository<AdminProduct> _adminProduct;
        private PaginationHelper<AdminProduct> pagination=new PaginationHelper<AdminProduct>();
        public ProductB(IRepository<AdminProduct> adminProduct)
        {
            _adminProduct = adminProduct;
        }

        //get product list depend on the page 
        public ProductRes GetPageContentList(int page,int pageSize)
        {
            var products = new ProductRes();
            var items=pagination.GetPageContentList(_adminProduct.Table, page, pageSize);
            products.total = (int)_adminProduct.Count;
            products.data = items;
            return products;
        }

        //get one product
        public AdminProduct getOneById(int id)
        {
            var item = _adminProduct.getById(id);
            return item;
        }

        //create a product
        public TData CreateProduct(AdminProduct product)
        {
            var obj = new TData();
            _adminProduct.insert(product);
            obj.Tag = true;
            obj.Message = "insert successful";
            return obj;
        }

        //delete a product
        public TData DeleteProduct(int id)
        {
            var obj = new TData();
            var product=_adminProduct.getById(id);
            _adminProduct.delete(product);
            obj.Tag = true;
            obj.Message = "delete successful";
            return obj;
        }

        //modify a product
        public TData ModifyProduct(AdminProduct product)
        {
            var obj = new TData();
            _adminProduct.update(product);
            obj.Tag = true;
            obj.Message = "modify successful";
            return obj;
        }

    }
}
