import request from './request'
import { ParamsUser, CheckUser, PageInfo } from '@config/data'

// 获取用信息
const getUserInfo = async () => {
  return request({
    url: '/api/user/info',
    method: 'get',
  })
}
// 用户登录
const submitUserLogin = async (data: ParamsUser) => {
  return request({
    url: '/api/user/login',
    method: 'post',
    data,
  })
}
// 获取用户上级
const getUserHadParent = async (params: CheckUser) => {
  return request({
    url: '/api/user/hadParent',
    method: 'get',
    params,
  })
}
// 获取龙蛋排名
const getUserRanking = async (params: PageInfo) => {
  return request({
    url: '/api/user/ranking',
    method: 'get',
    params,
  })
}
// 获取龙蛋倒计时 /api/dragonegg/gameinfo
const getGameInfo = async () => {
  return request({
    url: '/api/dragonegg/gameinfo',
    method: 'get',
  })
}

// 获取龙蛋信息
const getGameEgg = async () => {
  return request({
    url: '/api/dragonegg/gameEgg',
    method: 'get',
  })
}

// 打开龙蛋
const openEgg = async (data: any) => {
  return request({
    url: '/api/dragonegg/open',
    method: 'post',
    data,
  })
}

// 龙蛋收益复投 升级
const eggIncomeReinvestment = async (data: any) => {
  return request({
    url: '/api/dragonegg/EggIncomeReinvestment',
    method: 'post',
    data,
  })
}

// 获取全网数据 /api/main/total
const queryTotalNet = async () => {
  return request({
    url: '/api/main/total',
    method: 'get',
  })
}

// 扣币下单
const buyEgg = async (data: any) => {
  return request({
    url: '/api/order/create',
    method: 'post',
    data,
  })
}

// 获取币种信息
const getCoin = async (params: any) => {
  return request({
    url: '/api/order/coin',
    method: 'get',
    params,
  })
}

export {
  getUserInfo,
  submitUserLogin,
  getUserHadParent,
  getUserRanking,
  getGameInfo,
  getGameEgg,
  openEgg,
  eggIncomeReinvestment,
  queryTotalNet,
  buyEgg,
  getCoin
}
