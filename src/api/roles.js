import axios from '@/utils/myhttp'
// 角色列表
export function apiGetRole () {
  return axios.get('roles')
}
