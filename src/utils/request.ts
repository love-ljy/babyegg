import axios from 'axios'
import { setAuthToken } from '@store/user'
import { submitUserLogin } from '@utils/api'
import md5 from 'md5'
import { dispatch } from '@store/index'
import { TOKEN } from '@config/contants'
import { toast } from 'react-toastify'

// create an axios instance
const service = axios.create({
  baseURL: '', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Language'] = 'cn'
    config.headers['Token'] = localStorage.getItem('token') || ''
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  async response => {
    const res = response.data
    if (response.status !== 200) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      if (res.code === 40200) {
        const invite = localStorage.getItem('inviteCode') || ''
        const userAddress = localStorage.getItem('userAddress') || ''
        try {
          const refreshRes: any = await submitUserLogin({
            password: md5(md5(userAddress + 'babyloong') + 'babyloong'),
            username: userAddress as `0x${string}`,
            invite,
          })
          if (refreshRes.code === 0) {
            localStorage.setItem(TOKEN, refreshRes.data.Token)
            dispatch(setAuthToken(refreshRes.data.Token))
          } else {
            localStorage.setItem(TOKEN, '')
            toast.warn(refreshRes.msg)
          }
        } catch (e) {
          console.log('refresh error', e)
          toast.warn('网络错误')
        }
      }
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
