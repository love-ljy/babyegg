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
    TotalData: {
      "loong_user_count": "-",
      "dragon_egg_count": "-",
      "wait_out_babyloong": "-",
      "reward_total": "-",
      "last100_reward": "-",
      "last_reward": "-"
    },
    babyPrice: 0,
    isBindParent: false,
    gamingId: '',
    authToken: '',
    inviteCode: '',
    babyIncome: 0,
    allRewards: {
      "egg_income": "0",
      "index_income": "0",
      "invite_income": "0",
      "last_100_income": "0",
      "last_one_income": "0",
      "lucky_income": "0",
      "level_income": "0",
      "yulong_week_income": "0",
      "yulong_month_income": "0"
    }
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
    setBabyPrice: (state, { payload }) => {
      state.babyPrice = payload
    },
    setBabyIncome: (state, { payload }) => {
      state.babyIncome = payload
    },
    setTotalData: (state, { payload }) => {
      state.TotalData = payload
    },
    setTotalRewards: (state, { payload }) => {
      state.allRewards = payload
    }
  },
})

export const { setTotalRewards, setTotalData, setBabyIncome, setBabyPrice, setUserInfo, setAuthToken, setInviteCode, setWalletInfo, setIsBindParent, setGamingId } = slice.actions

// getter
export const selectWalletInfo = s => s.user.walletInfo
export const selectUserInfo = s => s.user.userInfo
export const selectIsBindParent = s => s.user.isBindParent
export const selectGamingId = s => s.user.gamingId
export const selectAuthToken = s => s.user.authToken
export const selectInviteCode = s => s.user.inviteCode
export const selectBabyPrice = s => s.user.babyPrice
export const selectBabyIncome = s => s.user.babyIncome
export const selectTotalData = s => s.user.TotalData
export const selectTotalRewards = s => s.user.allRewards

export default slice.reducer
