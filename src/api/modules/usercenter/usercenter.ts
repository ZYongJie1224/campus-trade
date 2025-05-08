import axios from '@/api/axios'

// 获取我买到的订单列表
export const getBuyOrders = (tab: string) => {
  return axios({
    url: '/user/orders/buy',
    method: 'get',
    params: { tab }
  })
}

// 获取我卖出的订单列表
export const getSellOrders = (tab: string) => {
  return axios({
    url: '/user/orders/sell',
    method: 'get',
    params: { tab }
  })
}

// 获取收藏列表
export const getFavoriteList = () => {
  return axios({
    url: '/favorite/list',
    method: 'get'
  })
}

// 获取个人资料
export const getProfile = () => {
  return axios({
    url: '/user/profile',
    method: 'get'
  })
}

// 更新个人资料
export const updateProfile = (profile: any) => {
  return axios({
    url: '/user/profile',
    method: 'post',
    data: profile
  })
}

// 获取账户安全信息
export const getSecurity = () => {
  return axios({
    url: '/user/security',
    method: 'get'
  })
}
