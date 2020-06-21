<template>
  <div class="login">
    <el-card class="login-card" shadow="always">
      <h2 slot="header">用户登录</h2>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" style="width:100%">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { apiLogin } from '@/api/login'
import { setToken } from '@/utils/mytoken'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{
          required: true,
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) return
        // const res = await this.$axios.post('login', this.loginForm)
        const res = await apiLogin(this.loginForm)
        console.log(res)
        if (res.data.meta.status === 200) {
          setToken('info', res.data.data)
          this.$store.commit('setUserInfo', res.data.data)
          this.$router.push('/layout')
          this.$message({
            message: '恭喜你，登陆成功',
            type: 'success'
          })
        } else {
          this.$message.error(res.data.meta.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 500px;
    margin: 50px auto;
    h2 {
      margin-top: 20px;
    }
  }
}
</style>
