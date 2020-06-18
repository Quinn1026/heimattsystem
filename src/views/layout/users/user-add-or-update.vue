<template>
  <div class="user-edit">
    <el-dialog
      :visible.sync="dialogVisible"
      width="580px">
      <span slot="title"> {{mode === 'add' ? '添加用户' : '修改用户'}} </span>
      <el-form :model="userEditForm" :rules="rules" label-width="80px" ref="userEditForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userEditForm.username" :disabled="mode === 'edit'"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="mode === 'add'">
          <el-input type="password" v-model="userEditForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userEditForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="userEditForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { apiAddUser, apiUpdateUser } from '@/api/user'
export default {
  name: 'UserEdit',
  data () {
    return {
      mode: '',
      dialogVisible: false,
      userEditForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editId: '',
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入电话', trigger: 'blur' }]
      }
    }
  },
  watch: {
    dialogVisible (newValue) {
      if (!newValue) {
        this.$refs.userEditForm.clearValidate()
      }
    }
  },
  methods: {
    submit () {
      this.$refs.userEditForm.validate(async (valid) => {
        if (!valid) return
        let res = null
        if (this.mode === 'add') {
          res = await apiAddUser(this.userEditForm)
        } else {
          res = await apiUpdateUser(this.editId, this.userEditForm)
        }
        console.log(res)
        if (res.data.meta.status === 201 || res.data.meta.status === 200) {
          this.$message.success(res.data.meta.msg)
          this.dialogVisible = false
          this.mode === 'add' ? this.$parent.search() : this.$parent.getUserList()
        } else {
          this.$message.error(res.data.meta.msg)
          this.dialogVisible = false
        }
      })
    }
  }
}
</script>

<style>

</style>
