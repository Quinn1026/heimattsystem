<template>
  <div class="assign-role">
    <!-- 对话框--分配角色 -->
    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="580px">
      <el-row>
        <el-col :span="4" :offset="3"><span>当前用户</span></el-col>
        <el-col :span="10"><span> {{user.username}} </span></el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="4" :offset="3"><span>请选择角色</span></el-col>
        <el-col :span="10">
          <el-select v-model="value" placeholder="请选择角色">
            <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAssign">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { apiAssignRole } from '@/api/user'
export default {
  name: 'AssignRole',
  props: ['roleList'],
  data () {
    return {
      dialogVisible: false,
      user: '',
      value: ''
    }
  },
  watch: {
    dialogVisible (newValue) {
      this.$nextTick(() => {
        if (newValue) {
          this.value = this.roleList.find(item => item.roleName === this.user.role_name).id
        }
      })
    }
  },
  methods: {
    async submitAssign () {
      if (!this.value) return
      const res = await apiAssignRole(this.user.id, this.value)
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
        this.dialogVisible = false
      } else {
        this.$message.error(res.data.meta.msg)
        this.dialogVisible = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.assign-role {
  line-height: 40px;
}
</style>
