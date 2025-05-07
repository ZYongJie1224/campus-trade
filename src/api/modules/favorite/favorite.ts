import axios from "@/api/axios"
// 添加收藏
export const addFavorite = (productId: number | string) => {
  return axios({
    url: `/favorite/add`,
    method: 'post',
    params: { productId }
  })
}
export const checkFavorite = (productId: number | string) => {
    return axios({
      url: `/favorite/isFavorited`,
      method: 'post',
      params: { productId }
    })
  }
  export const cremoveFavorite = (productId: number | string) => {
    return axios({
      url: `/favorite/remove`,
      method: 'post',
      params: { productId }
    })
  }