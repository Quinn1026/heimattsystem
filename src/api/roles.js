import axios from '@/utils/myhttp'
// 角色列表
export function apiGetRole () {
  return axios.get('roles')
}
// 新增角色
export function apiAddRole ({ roleName, roleDesc }) {
  return axios.post('roles', {
    roleName,
    roleDesc
  })
}
// 编辑角色
export function apiUpdateRole (id, { roleName, roleDesc }) {
  return axios({
    method: 'put',
    url: `roles/${id}`,
    data: { roleName, roleDesc }
  })
}
// 删除角色
export function apiDelRole (id) {
  return axios({
    method: 'delete',
    url: `roles/${id}`
  })
}
