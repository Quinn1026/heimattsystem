import axios from '@/utils/myhttp'
// 获取商品列表
export function apiGetGoodsList ({ query, pagenum, pagesize }) {
  return axios.get('goods', {
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}
// 获取商品分类
export function apiGetGoodsSort (type, pagenum, pagesize) {
  return axios.get('categories', {
    params: {
      type,
      pagenum,
      pagesize
    }
  })
}
// 添加商品分类
export function apiAddGoodsSort ({ catPid, catName, catLevel }) {
  return axios.post('categories', { cat_pid: catPid, cat_name: catName, cat_level: catLevel })
}
// 修改商品分来
export function apiEditGoodsSort (id, catName) {
  return axios({
    method: 'put',
    url: `categories/${id}`,
    data: { cat_name: catName }
  })
}
// 删除商品分类
export function apiDelGoodsSort (id) {
  return axios({
    method: 'delete',
    url: `categories/${id}`
  })
}
