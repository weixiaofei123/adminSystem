using adminSystem.business.productB;
using adminSystem.Entities;
using adminSystem.Model;
using adminSystem.Model.result;
using adminSystem.web.Filter;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

using System.Threading.Tasks;


namespace adminSystem.web.Controllers
{
    [Route("api/[controller]")]
    [AuthorizeFilter]
    [AjaxFilter]
    public class ProductsController : Controller
    {
        private IProductB _productB;
        public ProductsController(IProductB productB)
        {
            _productB = productB;
        }


        //GET:products?page=1&pageSize=3

        public ActionResult Detail([FromQuery] ProductListParam param)
        {
            var page = param.Page;
            var pageSize = param.PageSize;
            try
            {
                var productsList = _productB.GetPageContentList(page, pageSize);
                return Ok(productsList);
            }
            catch (Exception)
            {

                throw new Exception("异常发生");
            }


        }

        //get:product
        [HttpGet("{id}")]
        public ActionResult getById(int id)
        {
            var item = _productB.getOneById(id);
            return Ok(item);
        }

        // POST: ProductsController/Create
        [HttpPost]
        public ActionResult Create([FromBody] ProductParam product)
        {

            var item = new AdminProduct();
            item.EditorState = product.EditorState;
            item.OnSale = product.OnSale;
            item.Name = product.Name;
            item.Price = Convert.ToDecimal(product.Price);
            item.ImgUrl = "/uploadpic/product/" + product.ImgURL;
            try
            {
                var obj = _productB.CreateProduct(item);
                return Ok(obj);
            }
            catch (Exception ex)
            {
                throw ex;
                /*throw new Exception("exception happening");*/
            }

        }

        // Delete: ProductsController/Delete/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var obj = _productB.DeleteProduct(id);
            return Ok(obj);
        }


        // Put: ProductsController/Delete/5+-
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] ProductParam product)
        {

            var item = new AdminProduct();
            item.Id = id;
            item.ImgUrl = "/uploadpic/product/" + product.ImgURL;
            item.EditorState = product.EditorState;
            item.Name =product.Name;
            item.Price = Convert.ToDecimal(product.Price);
            item.OnSale = Convert.ToBoolean(product.OnSale);
            var obj = _productB.ModifyProduct(item);
            return Ok(obj);
        }


        //上传文件
        [HttpPost]
        [Route("uploadfile")]
        public ActionResult UploadFile(IFormCollection formData)
        {
            //用IFormCollection和IFormFile来解析数据
            //循环多个上传文件
            var files = formData.Files;
            foreach (var file in files)
            {
                var inputName = file.Name;
                var fileName = file.FileName;
                var dir = @"E:\it\back end\project\adminSystem\adminSystem\uploadpic\product\";
                //文件夹操作
                if (!Directory.Exists(dir))
                {
                    Directory.CreateDirectory(dir);
                }
                var filePath = dir + fileName;
                if (file.Length > 0)
                {
                    //文件操作
                    using (FileStream fs = System.IO.File.Create(filePath))
                    {

                        file.CopyToAsync(fs);
                        fs.Flush();
                      
                    }

                }

            }
            return Ok();
        }

    }
}
