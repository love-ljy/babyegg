import request from './request'
import { ParamsUser, CheckUser, PageInfo } from '@config/data'

// 获取用信息
const getUserInfo = async () => {
  return request({
    url: '/api/user/info',
    method: 'get',
  })
}

// 更新用信息
<<<<<<< HEAD
const UpdateUserInfo = async (params: { pay_password: any; pay_password_v: any }) => {
  return request({
    url: '/api/user/info',
    method: 'post',
    params,
=======
const updateUserInfo = async (data) => {
  return request({
    url: '/api/user/info',
    method: 'post',
    data
>>>>>>> 3b7d5337237fbba2d1260bb8427b5d4afa06788c
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
const getUserRanking = async () => {
  return request({
    url: '/api/user/ranking',
    method: 'get',
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
const createOrder = async (data: any) => {
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

//获取等级排行榜api/user/rankingLevel
const getRankingLevel = async () => {
  return request({
    url: '/api/user/rankingLevel',
    method: 'get'
  })
}

// 获取育龙榜 /api/user/rankingYuLong
const getRankingYuLong = async (type: number) => {
  return request({
    url: '/api/user/rankingYuLong',
    method: 'get',
    params: { type },
  })
}
// 查询订单状态 /api/order/orderStatus
const getOrderStatus = async (params: any) => {
  return request({
    url: '/api/order/orderStatus',
    method: 'get',
    params,
  })
}
//我的NFT质押列表
// page: 1, // 页码 limit: 10, // 每页数量
const pledgeList = async (params: any) => {
  return request({
    url: '/api/nft/pledgeList',
    method: 'get',
    params,
  })
}
//我的NFT列表
// page: 1, // 页码 limit: 10, // 每页数量
const nftList = async (params: any) => {
  return request({
    url: ' /api/nft/list',
    method: 'get',
    params,
  })
}
// 设置我的NFT
const setMyList = async (params: any) => {
  return request({
    url: '/api/Nftpledge/setMyNft',
    method: 'get',
    params,
  })
}
// 领取记录
const history = async (params: any) => {
  return request({
    url: '/api/user/income',
    method: 'get',
    params,
  })
}
export {
  history,
  pledgeList,
  nftList,
  setMyList,
  getUserInfo,
  submitUserLogin,
  getUserHadParent,
  getUserRanking,
  getGameInfo,
  getGameEgg,
  openEgg,
  eggIncomeReinvestment,
  queryTotalNet,
  getCoin,
  createOrder,
  updateUserInfo,
  getRankingLevel,
  getRankingYuLong,
  getOrderStatus,
<<<<<<< HEAD
=======
  getLast100,
  getRealTimeTraffic,
  getIncomeReceiveNumber,
  queryUserInfoByTeam,
  incomeReceive,
  getUserHistory
>>>>>>> 3b7d5337237fbba2d1260bb8427b5d4afa06788c
}
