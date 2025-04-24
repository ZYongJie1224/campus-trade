import axios from "@/api/axios";

//商品获取api
export const getGoods = (data:any) => {
    return axios({
      url: "/products/ProductsBatch",
      method: "get",
      data
    });
  };