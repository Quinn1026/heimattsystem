<template>
  <div class="order-edit">
    <el-dialog
      title="修改订单地址"
      :visible.sync="dialogVisible"
      width="580px">
      <el-form :model="orderEditForm" label-width="100px" ref="orderEditForm">
        <el-form-item label="省市区/县">
          <el-cascader
            style="width:100%"
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="orderEditForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { provinceAndCityData } from 'element-china-area-data'
export default {
  data () {
    return {
      dialogVisible: false,
      orderEditForm: {
        city: '',
        addr: ''
      },
      options: provinceAndCityData,
      selectedOptions: []
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
