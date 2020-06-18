<template>
  <div class="user">
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="userHeader">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form :inline="true" :model="formUsers" style="margin-top:20px">
        <el-form-item>
          <el-input v-model="formUsers.query" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" type="primary" icon="el-icon-search"></el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="add" type="primary">添加用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="always" style="margin-top:20px">
      <el-table
        :data="userData"
        border>
        <el-table-column
          type="index"
          label="#"
          width="50">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话">
        </el-table-column>
        <el-table-column
          label="用户状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeState($event, scope.row.id)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="update(scope.row)" type="primary" icon="el-icon-edit" plain></el-button>
            <el-button @click="remove(scope.row.id)" type="danger" icon="el-icon-delete" plain></el-button>
            <el-button @click="assign(scope.row)" type="warning" icon="el-icon-check" plain></el-button>
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
    <!-- 对话框--新增/编辑/分配角色 -->
    <user-edit ref="userEdit"></user-edit>
    <!-- 分配角色 -->
    <assign-user :roleList="roleList" ref="assignRole"></assign-user>
  </div>
</template>

<script>
import UserEdit from './user-add-or-update'
import AssignUser from './assign-role'
import { apiUserList, apiChangeState, apiDelUser } from '@/api/user'
import { apiGetRole } from '@/api/roles'
export default {
  name: 'User',
  components: {
    UserEdit,
    AssignUser
  },
  data () {
    return {
      formUsers: {
        query: ''
      },
      pagenum: 1,
      pagesize: 3,
      total: 0,
      userData: [],
      roleList: []
    }
  },
  created () {
    this.search()
    this.getRole()
  },
  methods: {
    update (row) {
      const { username, password, email, mobile, id } = row
      this.$refs.userEdit.mode = 'edit'
      this.$refs.userEdit.editId = id
      this.$refs.userEdit.userEditForm = { username, password, email, mobile }
      this.$refs.userEdit.dialogVisible = true
    },
    add () {
      this.$refs.userEdit.userEditForm = {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
      this.$refs.userEdit.dialogVisible = true
      this.$refs.userEdit.mode = 'add'
    },
    async remove (id) {
      const res = await apiDelUser(id)
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
        // 判断是否是最后一页分页的最后一条数据
        if (this.pagenum !== 1 && this.userData.length === 1) {
          this.pagenum = this.pagenum - 1
          this.getUserList()
        } else {
          this.getUserList()
        }
      }
    },
    assign (row) {
      // console.log(row)
      this.$refs.assignRole.user = row
      this.$refs.assignRole.dialogVisible = true
    },
    async getRole () {
      const res = await apiGetRole()
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.roleList = res.data.data.map(item => {
          return { id: item.id, roleName: item.roleName }
        })
      }
    },
    async changeState (state, id) {
      // console.log(state, id)
      const res = await apiChangeState(id, state)
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
      } else {
        this.$message.error(res.data.meta.msg)
      }
    },
    search () {
      this.pagenum = 1
      this.getUserList()
    },
    async getUserList () {
      const res = await apiUserList({
        ...this.formUsers,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.userData = res.data.data.users
        this.total = res.data.data.total
      } else {
        this.$message.error(res.data.meta.msg)
      }
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.search()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  .userHeader {
    height: 40px;
    line-height: 40px;
    // background-color: #d3dce6;
  }
}
</style>
