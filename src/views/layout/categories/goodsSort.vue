<template>
  <div class="goods-sort">
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="goodsSortHeader">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button @click="add" type="success" plain>添加分类</el-button>
    </el-card>
    <el-card shadow="always" style="margin-top:20px">
      <el-table
        :data="goodsSortData"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        row-key="cat_id"
        border>
        <el-table-column
          prop="cat_name"
          label="分类名称">
        </el-table-column>
        <el-table-column label="级别">
          <template slot-scope="scope">
            {{levelList[scope.row.cat_level]}}
          </template>
        </el-table-column>
        <el-table-column label="是否有效">
          <template slot-scope="scope">
            {{scope.row.cat_deleted?'无效':'有效'}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="update(scope.row)" type="primary" icon="el-icon-edit" plain></el-button>
            <el-button @click="remove(scope.row.cat_id)" type="danger" icon="el-icon-delete" plain></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="text-align:center;margin-top:20px">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
    <goods-sort-edit ref="goodsSortEdit"></goods-sort-edit>
  </div>
</template>

<script>
import GoodsSortEdit from './goodsSort-edit'
import { apiGetGoodsSort, apiDelGoodsSort } from '@/api/goods'
export default {
  name: 'GoodList',
  components: {
    GoodsSortEdit
  },
  data () {
    return {
      pagenum: 1,
      pagesize: 5,
      total: 0,
      goodsSortData: [],
      levelList: ['一级', '二级', '三级']
    }
  },
  created () {
    this.getGoodsSort()
  },
  methods: {
    async getGoodsSort () {
      const res = await apiGetGoodsSort(3, this.pagenum, this.pagesize)
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.goodsSortData = res.data.data.result
        this.total = res.data.data.total
      }
    },
    update (row) {
      console.log(row)
      this.$refs.goodsSortEdit.goodsSortEditForm.catName = row.cat_name
      this.$refs.goodsSortEdit.cat_id = row.cat_id
      this.$refs.goodsSortEdit.mode = 'edit'
      this.$refs.goodsSortEdit.dialogVisible = true
    },
    add () {
      this.$refs.goodsSortEdit.goodsSortEditForm = {
        ids: [],
        catName: '',
        catPid: 0,
        catLevel: 0
      }
      this.$refs.goodsSortEdit.mode = 'add'
      this.$refs.goodsSortEdit.dialogVisible = true
    },
    remove (id) {
      this.$confirm('确认要删除此分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await apiDelGoodsSort(id)
        if (res.data.meta.status === 200) {
          this.$message.success(res.data.meta.msg)
          this.getGoodsSort() // 最后一页最后一条数据删除后会有bug 暂时不管
        } else {
          this.$message.error(res.data.meta.msg)
        }
      }).catch(() => {})
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getGoodsSort()
    }
  }
}
</script>

<style lang="less" scoped>
.goods-sort {
  .goodsSortHeader {
    height: 40px;
    line-height: 40px;
  }
}
</style>
