<template>
  <div class="goodsSort-edit">
    <el-dialog
      :visible.sync="dialogVisible"
      width="580px">
      <span slot="title"> {{mode === 'add' ? '添加商品分类' : '修改商品分类'}} </span>
      <el-form :model="goodsSortEditForm" :rules="rules" label-width="100px" ref="goodsSortEditForm">
        <el-form-item label="分类名称" prop="catName">
          <el-input v-model="goodsSortEditForm.catName"></el-input>
        </el-form-item>
        <el-form-item label="分类层级" v-if="mode === 'add'">
          <el-cascader
            style="width:100%"
            placeholder="默认添加一级分类"
            clearable
            v-model="goodsSortEditForm.ids"
            :options="options"
            :props="{ expandTrigger: 'hover', checkStrictly: true, label:'cat_name', value:'cat_id' }"
            @change="handleChange"></el-cascader>
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
import { apiGetGoodsSort, apiAddGoodsSort, apiEditGoodsSort } from '@/api/goods'
export default {
  name: 'GoodsSortEdit',
  data () {
    return {
      mode: '',
      dialogVisible: false,
      goodsSortEditForm: {
        ids: [],
        catName: '',
        catPid: 0,
        catLevel: 0
      },
      cat_id: -1,
      options: [],
      rules: {
        catName: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      }
    }
  },
  watch: {
    dialogVisible (newValue) {
      if (!newValue) {
        this.$refs.goodsSortEditForm.clearValidate()
      }
    }
  },
  created () {
    this.getLevel2GoodsSort()
  },
  methods: {
    async getLevel2GoodsSort () {
      const res = await apiGetGoodsSort(2)
      // 获取二级所有分类
      if (res.data.meta.status === 200) {
        this.options = res.data.data
      }
    },
    handleChange (val) {
      // console.log(val)
      const len = val.length
      this.goodsSortEditForm.catLevel = len
      switch (len) {
        case 0: this.goodsSortEditForm.catPid = 0
          break
        case 1: this.goodsSortEditForm.catPid = val[0]
          break
        case 2: this.goodsSortEditForm.catPid = val[1]
          break
      }
    },
    submit () {
      this.$refs.goodsSortEditForm.validate(async (valid) => {
        if (!valid) return
        let res = null
        if (this.mode === 'add') {
          res = await apiAddGoodsSort(this.goodsSortEditForm)
        } else {
          res = await apiEditGoodsSort(this.cat_id, this.goodsSortEditForm.catName)
        }
        console.log(res)
        if (res.data.meta.status === 201 || res.data.meta.status === 200) {
          this.$message.success(res.data.meta.msg)
          this.dialogVisible = false
          this.$parent.getGoodsSort()
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
