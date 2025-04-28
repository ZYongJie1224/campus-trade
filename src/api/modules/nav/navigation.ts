import axios from "@/api/axios";

// 导航相关 API
export const fetchMainNavigation = () => {
    return axios({
      url: "/nav/main",
      method: "get"
    });
  };
  export const fetchCategoryNavigation = () => {
    return axios({
      url: "/nav/categories",
      method: "get"
    });
  };

