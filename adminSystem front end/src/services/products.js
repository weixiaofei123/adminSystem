import { get,post,put,del} from '../utils/request/index.js'

export function listProducts(page) {
   return get("/api/products",{"page":page,"pageSize":2,});
};

export function getOneById(id){
    return get(`/api/products/${id}`);
}
export function createProduct(product) {
    return post("/api/products",product);
    
}

export function modifyProduct(id,product) {
    return put(`/api/products/${id}`,product);
}

export function deleteProduct(id,product) {
    return del(`/api/products/${id}`,product)
}