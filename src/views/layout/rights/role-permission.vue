<template>
  <div class="role-permission">
    <el-dialog
      title="权限分配"
      :visible.sync="dialogVisible"
      width="580px">
      <el-tree
        :data="data"
        show-checkbox
        default-expand-all
        :default-checked-keys="rids"
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { apiAssignList, apiRoleAssign } from '@/api/roles'
export default {
  name: 'RolePermission',
  data () {
    return {
      dialogVisible: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      rids: [],
      roleId: ''
    }
  },
  created () {
    this.getAssignList()
  },
  watch: {
    dialogVisible (newValue) {
      if (!newValue) {
        this.$refs.tree.setCheckedNodes([])
      }
    }
  },
  methods: {
    async getAssignList () {
      const res = await apiAssignList('tree')
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.data = res.data.data
      }
    },
    async submit () {
      const nodes = this.$refs.tree.getCheckedNodes()
      console.log(nodes)
      let arr = []
      // arr = nodes.map(item => { // 要带上父节点id
      //   return item.id
      // })
      nodes.forEach(item => {
        arr.push(item.id.toString())
        // 还需要添加父节点id
        if (typeof (item.pid) === 'number') {
          arr.push(item.pid.toString())
        } else {
          arr = arr.concat(item.pid.split(','))
        }
      })
      arr = [...new Set(arr)]
      const res = await apiRoleAssign(this.roleId, arr.join(','))
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
        this.dialogVisible = false
        this.$parent.getRoleList()
      } else {
        this.$message.error(res.data.meta.msg)
      }
    }
  }
}
</script>

<style>

</style>
