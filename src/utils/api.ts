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
const updateUserInfo = async data => {
  return request({
    url: '/api/user/info',
    method: 'post',
    data,
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

const getGameCountDown = async () => {
  return request({
    url: '/api/main/nowTime',
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
    method: 'get',
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

// 获取最后100  /api/dragonegg/last100
const getLast100 = async (params: any) => {
  return request({
    url: '/api/dragonegg/last100',
    method: 'get',
    params,
  })
}

// 实时流量 /api/dragonegg/realTimeTraffic
const getRealTimeTraffic = async (params: any) => {
  return request({
    url: '/api/dragonegg/realTimeTraffic',
    method: 'get',
    params,
  })
}

// 获取用户各种奖励 /api/user/incomeReceiveNumber
const getIncomeReceiveNumber = async (type: number) => {
  return request({
    url: '/api/user/incomeReceiveNumber',
    method: 'get',
    params: { type },
  })
}

// 获取用户7层 /api/user/infoByTeam
const queryUserInfoByTeam = async () => {
  return request({
    url: '/api/user/infoByTeam',
    method: 'get',
  })
}

// 领取奖励
const incomeReceive = async (data: any) => {
  return request({
    url: '/api/user/incomeReceive',
    method: 'post',
    data,
  })
}

// 历史纪录 getIncomeReceiveNumber
const getUserHistory = async () => {
  return request({
    url: '/api/user/income',
    method: 'get',
  })
}
// 获取我的累计收益 /api/user/allIncome
const getUserAllIncome = async () => {
  return request({
    url: '/api/user/allIncome',
    method: 'get',
  })
}
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
// 领取记录
const whitelistedUserList = async (params: any) => {
  return request({
    url: '/api/user/whitelistedUserReward',
    method: 'get',
    params
  })
}
// 根据地址获取是否白名单用户
const infoByAddress = async (params: any) => {
  return request({
    url: '/api/user/infoByAddress',
    method: 'get',
    params
  })
}

// 获取服务器当前时间
const getNowTime = async () => {
  return request({
    url: ' /api/main/nowTime',
    method: 'get',
  })
}

export {
  whitelistedUserList,
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
  getLast100,
  getRealTimeTraffic,
  getIncomeReceiveNumber,
  queryUserInfoByTeam,
  incomeReceive,
  getUserHistory,
  getUserAllIncome,
  getGameCountDown,
  infoByAddress,
  getNowTime
}
