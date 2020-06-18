<template>
  <div class="roleList">
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="roleHeader">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary">添加角色</el-button>
    </el-card>
    <el-card shadow="always" style="margin-top:20px">
      <el-table
        :data="roleData"
        border>
        <el-table-column
          type="index"
          label="#"
          width="50">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          label="角色描述">
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="primary" icon="el-icon-edit" plain></el-button>
            <el-button type="danger" icon="el-icon-delete" plain></el-button>
            <el-button type="warning" icon="el-icon-check" plain></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { apiGetRole } from '@/api/roles'
export default {
  name: 'RoleList',
  data () {
    return {
      roleData: []
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    async getRoleList () {
      const res = await apiGetRole()
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.roleData = res.data.data
      }
    }
  }
}
</script>

<style lang="less" scoped>
.roleList {
  .roleHeader {
    height: 40px;
    line-height: 40px;
  }
}
</style>
