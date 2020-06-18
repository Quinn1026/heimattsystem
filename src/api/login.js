import axios from '@/utils/myhttp.js'
// 用户登录
export function apiLogin ({ username, password }) {
  return axios.post('login', {
    username,
    password
  })
}
