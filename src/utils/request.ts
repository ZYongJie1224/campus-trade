import axios from "axios";

const i = axios.create  ({
    baseURL:'http://localhost:8080',
    timeout:10000,
    headers:{
        'Content-Type':'application/json'
    }
});

i.interceptors.request.use(
    config=>{
        const token= localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = token
        }
        return config
    },
    error=>{
        return Promise.reject(error)
    }
);


export function get(url: string, params = {}) {
    return i.get(url, { params });
  }
  
  export function post(url: string, data = {}) {
    return i.post(url, data);
  }
  
  export function put(url: string, data = {}) {
    return i.put(url, data);
  }
  
  export function del(url: string) {
    return i.delete(url);
  }
