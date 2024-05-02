import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      id: 0,
      username: "",
      level_grade: "",
      level_time: "",
      index_num: "",
      parent_id: "",
      parent: "",
      parent_invite: "",
      path: "",
      invite: "",
      state: "",
      reg_ip: "",
      nickname: "",
      avatar: "",
      lang: "",
      password: "",
      last_ip: "",
      last_time: "",
      son_num: "",
      true_son_num: "",
      team_num: "",
      babyloong_performance: "",
      team_babyloong_performance: "",
      my_performance: "",
      team_performance: "",
      week_my_performance: "",
      month_my_performance: "",
      week_team_performance: "",
      month_team_performance: "",
      send_pledge_income: "",
      total_pledge_income: "",
      share_award: "",
      team_award: "",
      matic: "",
      babyloong: "",
      created_at: "",
      updated_at: "",
      dragon_egg_total: "",
      dragon_egg: "",
      can_withdraw: "",
      pay_password: "",
      last_sort_num: ""
    },
    walletInfo: {
      address: '',
    },
    isBindParent: false,
    gamingId:'',
    authToken:'',
    inviteCode:''
  },
  reducers: {
    setWalletInfo: (state, { payload }) => {
      state.walletInfo = { ...state.walletInfo, ...payload }
    },
    setUserInfo: (state, { payload }) => {
      state.userInfo = { ...state.userInfo, ...payload }
    },
    setIsBindParent: (state, { payload }) => {
      state.isBindParent = payload
    },
    setGamingId: (state, { payload }) => {
      state.gamingId = payload
    },
    setAuthToken: (state, { payload }) => {
      state.authToken = payload
    },
    setInviteCode: (state, { payload }) => {
      state.inviteCode = payload
    },
  },
})

export const { setUserInfo,setAuthToken,setInviteCode, setWalletInfo, setIsBindParent, setGamingId } = slice.actions

// getter
export const selectWalletInfo = s => s.user.walletInfo
export const selectUserInfo = s => s.user.userInfo
export const selectIsBindParent = s => s.user.isBindParent
export const selectGamingId = s => s.user.gamingId
export const selectAuthToken = s => s.user.authToken
export const selectInviteCode = s => s.user.inviteCode

export default slice.reducer
