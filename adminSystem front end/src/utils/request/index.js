
const axios = require('axios');


const instance = axios.create({
    baseURL: 'https://localhost:8080/',
    timeout: 5000,
    withCredentials: true,
  });

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
   
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
   


    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });




export function get(url,params) {

   return instance.get(url,{params});
}

export function post(url,params) {


    return instance.post(url,params,);
}

export function put(url,params) {
    return instance.put(url,params);
}

export function del(url,params) {
    return instance.delete(url,params);
}