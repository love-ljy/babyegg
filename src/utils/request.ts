import axios from 'axios'
// create an axios instance
const service = axios.create({
  baseURL: '', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    console.log('Adding token to request:', token); // 确保这行代码被执行
    if (token) {
      config.headers['Token'] = `${token}`;
    }
    config.headers['Language'] = 'cn'
   
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.status !== 200) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      if(res.code===40300){
        window.localStorage.setItem("token", '');
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
