import axios from '@/utils/myhttp'
// 订单列表
export function apiGetOrderList ({ query, pagenum, pagesize }) {
  return axios.get('orders', {
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}
