import axios from "@/api/axios";

//商品获取api
export const getGoods = (lastId:number,pageSize : number) => {
    return axios({
      url: "/products/ProductsBatch",
      method: "get",
      params : {lastId,pageSize}
    });
  };

  export const uploadProduct = (data:any) => {
    return axios({
      url: "/products/uploadProduct",
      method: "post",
      data
    });
  };
  export const getCategories = () => {
    return axios({
      url: "/categories",
      method: "get"
    });
  };
// 获取商品详情（id为商品id）
export const getProductDetail = (id: number | string) => {
  return axios({
    url: `/products/${id}`,
    method: 'get'
  })
}
export const getProductImgs = (id: number | string) => {
  return axios({
    url: `/product-imgs/${id}`,
    method: 'get'
  })
}
  export const searchProduct = (keyword:string,lastId:number,pageSize : number) => {
    return axios({
      url: "/products/search",
      method: 'get',
      params:{
        keyword,
        lastId,
        pageSize
      }
    })
    
}
export const getGoodsByCategoryId = (lastId:number,pageSize : number,categoryId : number) => {
  return axios({
    url: "/products/ProductsBatchByCategoryId",
    method: "get",
    params : {lastId,pageSize,categoryId}
  });
};