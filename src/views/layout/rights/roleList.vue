<template>
  <div class="roleList">
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="roleHeader">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary" @click="add">添加角色</el-button>
    </el-card>
    <el-card shadow="always" style="margin-top:20px">
      <el-table
        :data="roleData"
        border>
        <el-table-column type="expand" width="50">
          <template slot-scope="scope">
            <el-row v-for="item in scope.row.children" :key="item.id">
              <el-col :span="4">
                <el-tag
                  closable
                  type="">
                  {{item.authName}}
                </el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                <el-row v-for="prop in item.children" :key="prop.id">
                  <el-col :span="5">
                    <el-tag
                      closable
                      type="">
                      {{prop.authName}}
                    </el-tag>
                    <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="level in prop.children" :key="level.id"
                      closable
                      type="">
                      {{level.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
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
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="primary" icon="el-icon-edit" plain></el-button>
            <el-button @click="remove(scope.row.id)" type="danger" icon="el-icon-delete" plain></el-button>
            <el-button @click="assign(scope.row)" type="warning" icon="el-icon-check" plain></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 对话框 新增修改 -->
    <role-edit ref="roleEdit"></role-edit>
    <!-- 对话框 权限分配 -->
    <role-permission ref="rolePermission"></role-permission>
  </div>
</template>

<script>
import RoleEdit from './role-add-or-update'
import RolePermission from './role-permission'
import { apiGetRole, apiDelRole } from '@/api/roles'
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
    },
    add () {
      this.$refs.roleEdit.roleEditForm = {
        roleName: '',
        roleDesc: ''
      }
      this.$refs.roleEdit.mode = 'add'
      this.$refs.roleEdit.dialogVisible = true
    },
    edit (row) {
      // console.log(row)
      const { roleName, roleDesc } = row
      this.$refs.roleEdit.roleEditForm = { roleName, roleDesc }
      this.$refs.roleEdit.mode = 'edit'
      this.$refs.roleEdit.editId = row.id
      this.$refs.roleEdit.dialogVisible = true
    },
    assign (row) {
      // 处理roleData数据 提取出id
      console.log(row)
      const arr = []
      const fn = function (list) {
        list.forEach(item => {
          if (item.children) {
            fn(item.children)
          } else {
            arr.push(item.id)
          }
        })
      }
      fn(row.children)
      this.$refs.rolePermission.rids = arr
      this.$refs.rolePermission.roleId = row.id
      this.$refs.rolePermission.dialogVisible = true
    },
    async remove (id) {
      const res = await apiDelRole(id)
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
        this.getRoleList()
      } else {
        this.$message.error(res.data.meta.msg)
      }
    }
  },
  components: {
    RoleEdit,
    RolePermission
  }
}
</script>

<style lang="less" scoped>
.roleList {
  .roleHeader {
    height: 40px;
    line-height: 40px;
  }
  .el-tag {
    margin-right: 10px;
    margin-bottom: 5px;
  }
}
</style>
