<template>
  <div class="goods-list">
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="goodsListHeader">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form :inline="true" :model="formGoodsList" style="margin-top:20px">
        <el-form-item>
          <el-input v-model="formGoodsList.query" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" type="info" icon="el-icon-search" plain></el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="add" type="success" plain>添加商品</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="always" style="margin-top:20px">
      <el-table
        :data="goodsListData"
        border>
        <el-table-column
          type="index"
          label="#"
          width="50">
        </el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品名称">
        </el-table-column>
        <el-table-column
          width="150"
          prop="goods_price"
          label="商品价格(元)">
        </el-table-column>
        <el-table-column
          width="150"
          prop="goods_weight"
          label="商品重量">
        </el-table-column>
        <el-table-column
          width="150"
          prop="add_time"
          label="创建时间">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="update(scope.row)" type="primary" icon="el-icon-edit" plain></el-button>
            <el-button @click="remove(scope.row.id)" type="danger" icon="el-icon-delete" plain></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="text-align:center;margin-top:20px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[3, 5, 10, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { apiGetGoodsList } from '@/api/goods'
export default {
  name: 'GoodList',
  data () {
    return {
      formGoodsList: {
        query: ''
      },
      pagenum: 1,
      pagesize: 3,
      total: 0,
      goodsListData: []
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList () {
      const res = await apiGetGoodsList({
        ...this.formGoodsList,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.goodsListData = res.data.data.goods
        this.total = res.data.data.total
      } else {
        this.$message.error(res.data.meta.msg)
      }
    },
    search () {
      this.pagenum = 1
      this.getGoodsList()
    },
    update (row) {
      console.log('update')
    },
    add () {
      this.$router.push('/layout/goodsAdd')
    },
    async remove (id) {
      console.log('remove')
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.search()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getGoodsList()
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  .goodsListHeader {
    height: 40px;
    line-height: 40px;
  }
}
</style>
