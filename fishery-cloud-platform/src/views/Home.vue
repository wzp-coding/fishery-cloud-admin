<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <TheHeader></TheHeader>
    <!-- 页面主体区域 -->
    <el-container style="height: 100%">
      <!-- 侧边栏(导航栏)区域 -->
      <TheNavbar></TheNavbar>
      <!-- 右侧主体区域 -->
      <el-main :style="curTheme.main.body">
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import TheHeader from "../components/public_components/TheHeader";
import TheNavbar from "../components/public_components/TheNavbar";
import { mapState } from "vuex";
export default {
  components: {
    TheHeader,
    TheNavbar,
  },
  computed: {
    ...mapState(["curTheme"]),
  },
};
</script>

<style lang="less" scoped>
.home-container {
  // 撑满全屏
  height: 100%;
}
</style>
