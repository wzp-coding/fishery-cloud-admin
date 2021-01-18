<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <the-header></the-header>
    <!-- 页面主体区域 -->
    <el-container style="height: 100%">
      <!-- 侧边栏(导航栏)区域 -->
      <the-navbar></the-navbar>
      <!-- 右侧主体区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import TheHeader from "../components/public_components/TheHeader";
import TheNavbar from "../components/public_components/TheNavbar";
export default {
  components: {
    TheHeader,
    TheNavbar,
  },
};
</script>

<style lang="less" scoped>
.home-container {
  // 撑满全屏
  height: 100%;
}
</style>
