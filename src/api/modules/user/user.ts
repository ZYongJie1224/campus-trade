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
  // 获取用户详细信息
export const getUserProfile = () => {
  return axios({
    url: "/user/profile",
    method: "get"
  });
};

// 修改用户信息
export const updateUserProfile = (data: any) => {
  return axios({
    url: "/user/profile/update",
    method: "post",
    data
  });
};

// 上传用户头像
export const uploadUserAvatar = (formData: FormData) => {
  return axios({
    url: "/user/avatar",
    method: "post",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" }
  });
};

// 获取用户统计数据（买到、卖出、收藏、粉丝、关注等）
export const getUserStats = () => {
  return axios({
    url: "/user/stats",
    method: "get"
  });
};