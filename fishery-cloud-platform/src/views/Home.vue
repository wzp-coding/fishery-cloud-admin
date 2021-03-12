<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <TheHeader></TheHeader>
    <!-- 页面主体区域 -->
    <el-container style="height: 100%">
      <!-- 侧边栏(导航栏)区域 -->
      <TheNavbar></TheNavbar>
      <!-- 右侧主体区域 -->
      <el-main style="position: relative">
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
// 定义初始状态
.slide-fade-leave {
  opacity: 0.5;
}
.slide-fade-enter {
  transform: translate3d(-100%, 0, 0);
  // height: 1000%;
  opacity: 0.5;
  // 定义过渡时的动画
}
.slide-fade-enter-active {
  // transition: all 0.5s ease 500ms;
  transition: all 0.5s ease-out;
}
.slide-fade-leave-active {
  // transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
  transition: all 0.5s ease-out;
}
//定义最终状态（动画完成后会和active一起移除）
.slide-fade-leave-to {
  transform: translate3d(100%, 0, 0);
  // height: 1000%;
  opacity: 0;
}
.slide-fade-enter-to {
  position: absolute;
  top: 20px;
  opacity: 1;
}
::-webkit-scrollbar {
  display: none;
}
</style>
