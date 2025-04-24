import axios from "@/api/axios";

export const loginAPI = (data: any) => {
    return axios({
      url: "/user/login",
      method: "post",
      data
    });
  };