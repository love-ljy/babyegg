import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {
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
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.id = payload.id;
      state.lang = payload.lang;
      state.username = payload.username;
      state.nickname = payload.nickname;
      state.invite = payload.invite;
      state.parent_id = payload.parent_id;
      state.level_grade = payload.level_grade;
      state.true_son_num = payload.true_son_num;
      state.my_performance = payload.my_performance;
      state.dragon_egg_total = payload.dragon_egg_total;
      state.dragon_egg = payload.dragon_egg;
      state.last_sort_num = payload.last_sort_num;
      state.my_sort_num = payload.my_sort_num;
      state.state = payload.state;
      state.share_award = payload.share_award;
    }
  },
});

export const { setUser, setTwitterInfo } = slice.actions;


// getter
export const selectUser = s => s.user;

export default slice.reducer;
