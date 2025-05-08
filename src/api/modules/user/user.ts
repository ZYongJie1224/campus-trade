import axios from "@/api/axios";

export const loginAPI = (data: any) => {
    return axios({
      url: "/user/login",
      method: "post",
      data
    });
  };
  export const regAPI = (data: any) => {
    return axios({
      url: "/user/register",
      method: "post",
      data
    });
  };
  export const getMe = () =>{
    return axios({
      url: "/user/me",
      method: "get"
    });
  }