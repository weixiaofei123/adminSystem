import { get, post } from '../utils/request/index.js'
//user login
export function login(user) {
   return post("api/user/login", user);
}

//user logout
export function logout() {
   return get("api/user/logout");
}