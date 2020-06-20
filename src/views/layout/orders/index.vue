<template>
  <div class="orders">
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="orderHeader">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form :inline="true" :model="orderForm" style="margin-top:20px">
        <el-form-item>
          <el-input v-model="orderForm.query" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" type="primary" icon="el-icon-search"></el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="always" style="margin-top:20px">
      <el-table
        :data="orderData"
        border>
        <el-table-column
          type="index"
          label="#"
          width="50">
        </el-table-column>
        <el-table-column
          prop="order_number"
          label="订单编号">
        </el-table-column>
        <el-table-column
          prop="order_price"
          label="订单价格">
        </el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            <el-button type="danger" plain> {{scope.row.pay_status === 1 ? '已付款' : '未付款'}} </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="is_send"
          label="是否发货">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="下单时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="update(scope.row)" type="primary" icon="el-icon-edit" plain></el-button>
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
import { apiGetOrderList } from '@/api/order'
export default {
  name: 'Orders',
  data () {
    return {
      orderForm: {
        query: ''
      },
      pagenum: 1,
      pagesize: 3,
      total: 0,
      orderData: []
    }
  },
  created () {
    this.getOrderList()
  },
  methods: {
    async getOrderList () {
      const res = await apiGetOrderList({ ...this.orderForm, pagenum: this.pagenum, pagesize: this.pagesize })
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.orderData = res.data.data.goods
        this.total = res.data.data.total
      }
    },
    search () {
      this.pagenum = 1
      this.getOrderList()
    },
    update () {
      console.log('update')
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.search()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getOrderList()
    }
  }
}
</script>

<style lang="less" scoped>
.orders {
  .orderHeader {
    height: 40px;
    line-height: 40px;
  }
}
</style>
