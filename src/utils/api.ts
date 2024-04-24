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

export { getUserInfo, submitUserLogin, getUserHadParent, getUserRanking }
