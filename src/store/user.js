import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {
    address: '',
    chainId: '',
    balance: '',
    walletType: '',
    twitterInfo: {
      profile_image_url: '', // 头像
      screen_name: '', // 用户名
      name: '',
      web3_address: '', // 钱包地址
      followers_count: '' // 粉丝数
    }
    ,
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.address = payload.address;
      state.chainId = payload.chainId;
      state.balance = payload.balance;
      state.walletType = payload.walletType;
    },
    setTwitterInfo: (state, { payload }) => {
      console.log(payload)
      state.twitterInfo.profile_image_url = payload.profile_image_url;
      state.twitterInfo.screen_name = payload.screen_name;
      state.twitterInfo.name = payload.name;
      state.twitterInfo.web3_address = payload.web3_address;
      state.followers_count = payload.followers_count;
    },
  },
});

export const { setUser, setTwitterInfo } = slice.actions;


// getter
export const selectUser = s => s.user;

export const selectTwitterInfo = s => s.user.twitterInfo;

export default slice.reducer;
