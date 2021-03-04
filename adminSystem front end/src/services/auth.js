
import { get, post } from '../utils/request/index.js'

export function login(user) {
   return  post("api/user/login",user);
} 

export function logout(){
   return get("api/user/logout");
}