<template>
  <div class="roleEdit">
    <el-dialog
      :visible.sync="dialogVisible"
      width="580px">
      <span slot="title"> {{mode === 'add' ? '添加角色' : '修改角色'}} </span>
      <el-form :model="roleEditForm" :rules="rules" label-width="80px" ref="roleEditForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleEditForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="roleEditForm.roleDesc"></el-input>
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
import { apiAddRole, apiUpdateRole } from '@/api/roles'
export default {
  name: 'UserEdit',
  data () {
    return {
      mode: '',
      dialogVisible: false,
      roleEditForm: {
        roleName: '',
        roleDesc: ''
      },
      editId: '',
      rules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        roleDesc: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      }
    }
  },
  watch: {
    dialogVisible (newValue) {
      if (!newValue) {
        this.$refs.roleEditForm.clearValidate()
      }
    }
  },
  methods: {
    submit () {
      this.$refs.roleEditForm.validate(async (valid) => {
        if (!valid) return
        let res = null
        if (this.mode === 'add') {
          res = await apiAddRole(this.roleEditForm)
        } else {
          res = await apiUpdateRole(this.editId, this.roleEditForm)
        }
        // console.log(res)
        if (res.data.meta.status === 201 || res.data.meta.status === 200) {
          this.$message.success(res.data.meta.msg)
          this.dialogVisible = false
          this.$parent.getRoleList()
        } else {
          this.$message.error(res.data.meta.msg)
        }
      })
    }
  }
}
</script>

<style>

</style>
