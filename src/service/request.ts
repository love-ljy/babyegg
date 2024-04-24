import axios, { type AxiosRequestConfig } from 'axios'

interface MyResponseType<T = any> {
  code: number | string
  message: string
  data: T
}

const instance = axios.create({
  timeout: 3600000, // 设置请求超时时间
})

instance.interceptors.request.use(
  (config: any) => {
    config.headers = {
      ...config.headers,
      authorization: config.headers.authorization
        ? config.headers.authorization
        : `Berar ${window.localStorage.getItem('token')}`,
    }
    return config
  },
  async error => {
    return await Promise.reject(error)
  }
)

const request = async <T = any,>(config: AxiosRequestConfig): Promise<MyResponseType<T>> => {
  try {
    const { data } = await instance.request<MyResponseType<T>>(config)
    return data
  } catch (err) {
    const message = 'Request Error'
    console.error(message)
    return {
      code: -1,
      message,
      data: null as any,
    }
  }
}

export default request
