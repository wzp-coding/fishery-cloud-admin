<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <TheHeader></TheHeader>
    <!-- 页面主体区域 -->
    <el-container style="height: 100%">
      <!-- 侧边栏(导航栏)区域 -->
      <TheNavbar></TheNavbar>
      <!-- 右侧主体区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <transition name="slide-fade">
          <router-view></router-view>
        </transition>
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
// 路由过渡动画
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  height: 150%;
  opacity: 0;
}
::-webkit-scrollbar {
  display: none;
}
</style>
