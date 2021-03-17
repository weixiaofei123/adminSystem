import { get,post,put,del} from '../utils/request/index.js'
//list products
export function listProducts(page) {
   return get("/api/products",{"page":page,"pageSize":2,});
};
//get one product
export function getOneById(id){
    return get(`/api/products/${id}`);
}
//add a product
export function createProduct(product) {
    return post("/api/products",product);
    
}
//dit product
export function modifyProduct(id,product) {
    return put(`/api/products/${id}`,product);
}
//delete product
export function deleteProduct(id,product) {
    return del(`/api/products/${id}`,product)
}