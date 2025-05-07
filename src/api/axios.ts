import axios from "axios";
import router from "@/router";
// 创建axios实例
const service = axios.create({
  baseURL: "http://localhost:8080/api"
});
// 请求拦截器
service.interceptors.request.use(
  function (config: any) {
    // 发送请求之前做什么
    // 获取token鉴权
    // let userInfo: any = {};
    let token;
    // console.log(localStorage.getItem("token"))
    if (localStorage.getItem("token")!=undefined) {
      token = localStorage.getItem("token");
      config.headers.Authorization = token;
      return config;
    }
    return config;

  },
  function (error: any) {
    console.log(error)
    // 请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  function (response: any) {

    let res = response.data;

      // 返回数据
      return Promise.resolve(res);
    
  },
  // function (error: any) {
  //   localStorage.removeItem("user-info");
  //   router.push("/login");
  //   return Promise.reject(error);
  // }
);
export default service;
