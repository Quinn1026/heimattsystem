<template>
  <div class="goodsAdd">
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="goodsAddHeader">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品添加</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card shadow="always" style="margin-top:20px">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
      </el-steps>
      <!-- 用form表单包裹 -->
      <el-form :model="formGoodsAdd" :rules="rules" label-position="top" style="margin-top:50px;min-height:400px">
        <el-tabs tab-position="left">
          <el-tab-pane label="基本信息">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="formGoodsAdd.goods_name" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="formGoodsAdd.goods_price" placeholder="请输入商品价格"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="formGoodsAdd.goods_weight" placeholder="请输入商品重量"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="formGoodsAdd.goods_number" placeholder="请输入商品数量"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-select v-model="formGoodsAdd.goods_cat" placeholder="请选择商品分类">
                <el-option label="区域一" value="0"></el-option>
                <el-option label="区域二" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数">
            <el-form-item label="CPU主频">
              <el-checkbox v-model="checked1" label="5G" border></el-checkbox>
              <el-checkbox v-model="checked2" label="2G" border></el-checkbox>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片">
            <el-upload
              action="http://localhost:8888/api/private/v1/upload"
              name="file"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容">
            <quill-editor
              v-model="content"
              :options="editorOption"
            />
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'GoodsAdd',
  components: {
    quillEditor
  },
  data () {
    return {
      editorOption: {},
      content: '',
      active: 0,
      formGoodsAdd: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_cat: [],
        goods_introduce: ''
      },
      checked1: true,
      checked2: true,
      fileList: [],
      headers: {
        Authorization: this.$store.state.userInfo.token // 图片上传必须携带token
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请输入商品分类', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleSuccess (res) {
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.goodsAdd {
  .goodsAddHeader {
    height: 40px;
    line-height: 40px;
  }
  /deep/ .ql-editor {
    min-height: 400px;
  }
}
</style>
