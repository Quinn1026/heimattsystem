<template>
  <div class="permission">
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="permissionHeader">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card shadow="always" style="margin-top:20px">
      <el-table
        :data="assignData"
        border>
        <el-table-column
          type="index"
          label="#"
          width="80">
        </el-table-column>
        <el-table-column
          prop="authName"
          label="权限名称">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径">
        </el-table-column>
        <el-table-column label="层级">
          <template slot-scope="scope">
            <span>{{levelList[scope.row.level]}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { apiAssignList } from '@/api/roles'
export default {
  data () {
    return {
      assignData: [],
      levelList: ['一级', '二级', '三级']
    }
  },
  created () {
    this.getAssignList()
  },
  methods: {
    async getAssignList () {
      const res = await apiAssignList('list')
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.assignData = res.data.data
      }
    }
  }
}
</script>

<style lang="less" scoped>
.permission {
  .permissionHeader {
    height: 40px;
    line-height: 40px;
  }
}
</style>
