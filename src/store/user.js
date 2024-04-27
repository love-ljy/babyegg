import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      id: 0,
      lang: '',
      username: '',
      nickname: '',
      invite: '',
      parent_id: '',
      level_grade: '',
      true_son_num: '',
      my_performance: '',
      dragon_egg_total: '',
      dragon_egg: '',
      last_sort_num: '',
      my_sort_num: '',
      state: '',
      share_award: '',
      token: '',
    },
    walletInfo: {
      address: '',
    },
    isBindParent: false,
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
  },
})

export const { setUserInfo, setWalletInfo, setIsBindParent } = slice.actions

// getter
export const selectWalletInfo = s => s.user.walletInfo
export const selectUserInfo = s => s.user.userInfo
export const selectIsBindParent = s => s.user.isBindParent

export default slice.reducer
