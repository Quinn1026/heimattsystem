import axios from '@/utils/myhttp'
// 用户列表
export function apiUserList ({ query, pagenum, pagesize }) {
  return axios.get('users', {
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}
// 更改状态
export function apiChangeState (uId, type) {
  return axios({
    method: 'put',
    url: `users/${uId}/state/${type}`
  })
}
// 添加用户
export function apiAddUser ({ username, password, email, mobile }) {
  return axios.post('users', {
    username,
    password,
    email,
    mobile
  })
}
// 编辑用户
export function apiUpdateUser (id, { email, mobile }) {
  return axios({
    method: 'put',
    url: `users/${id}`,
    data: { email, mobile }
  })
}
// 删除用户
export function apiDelUser (id) {
  return axios({
    method: 'delete',
    url: `users/${id}`
  })
}
// 分配用户角色
export function apiAssignRole (id, rid) {
  return axios({
    method: 'put',
    url: `users/${id}/role`,
    data: { rid }
  })
}
