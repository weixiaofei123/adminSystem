export function getToken(){
    localStorage.getItem("token");
}

export function setToken(token) {
    localStorage.setItem("token",token);
}

export function clearToken() {
    localStorage.removeItem("token");
}
export function isLogined() {
    console.log(localStorage.getItem("token"))
    if (localStorage.getItem("token")) {
        return true;
    } 
        return false;
  
}