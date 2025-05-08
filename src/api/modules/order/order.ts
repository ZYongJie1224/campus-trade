import axios from "@/api/axios"
export const createOrder = (product_id: number | string,address : string) => {
    return axios({
      url: `/orders/create`,
      method: 'post',
      params: { product_id , address}
    })
  }
  
  export const getOrderDetail = (order_id: number | string) => {
    return axios({
      url: `/orders/detail/${order_id}`,
      method: 'get'
    })
  }
  export const fetchOrderDetail = (product_id: number | string,address : string) => {
    return axios({
      url: `/orders/create`,
      method: 'post',
      params: { product_id , address}
    })
  }
  // 模拟支付
export const payOrder = (orderId: string | number) => {
  return axios({
    url: `/orders/${orderId}/pay`,
    method: 'post'
  })
}