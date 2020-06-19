<template>
  <div class="layout">
    <el-container class="layout-contain">
    <el-header>
      <div class="title">黑马电商后台管理系统</div>
      <div class="right">
        <span> {{$store.state.userInfo.username}} 欢迎你~~~ </span>
        <el-button type="primary" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="/layout/users"
          class="el-menu-vertical-demo"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/layout/users">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/layout/roleList">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/permission">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      console.log('退出')
    }
  }
}
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  color: #333;
  .layout-contain {
    height: 100%;
    .el-header {
      line-height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 24px;
        color: #333;
        margin-left: 10px;
      }
      .right {
        span {
          margin-right: 20px;
        }
      }
    }
    .el-aside {
      height: 100%;
      .el-menu {
        border: 0;
      }
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        height: 100%;
        min-height: 400px;
      }
      .el-menu-item {
        padding: 0;
      }
    }
    .el-main {
      height: 100%;
      background-color: #e9eef3;
    }
  }
}
</style>
