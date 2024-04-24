import { configureStore } from '@reduxjs/toolkit'
import user from './user'
const isDev = process.env.NODE_ENV === 'development'
const store = configureStore({
  reducer: {
    // ui,
    user,
  },
  devTools: isDev,
})

export default store

export const { dispatch, subscribe } = store

export const getState = (sliceName: any) => {
  const _store: any = store.getState()
  return sliceName ? _store[sliceName] : _store
}
