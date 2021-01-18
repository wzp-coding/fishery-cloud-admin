<template>
  <div>
    <!-- 头部区域 -->
    <iframe src="http://106.75.132.85:9001/#/basePage" hidden></iframe>
    <el-header>
      <div>
        <img src="" />
        <span>智慧渔业云服务平台</span>
      </div>
      <span @click="backLogin" style="cursor: pointer">{{
        way === "1" ? "退出登录" : "返回前台"
      }}</span>
    </el-header>
  </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex';
export default {
  data() {
    return {
      way: window.localStorage.getItem("way"),
    };
  },
  computed:{
    ...mapState(["permissionVisable"])
  },
  methods: {
    // 获取设置权限的方法
    ...mapMutations(["setPermissionList"]),
    // 退出登录操作
    backLogin() {
      window.localStorage.clear();
      this.defines.setBaseId("");
      this.setPermissionList(JSON.parse("{}"));
      if (this.way !== "1") {
        window.location.href = "http://106.75.132.85:9001/#/basePage";
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.el-header {
  background-color: #062f4f;
  display: flex;
  // 左右贴边对齐
  justify-content: space-between;
  // 去掉左内边距
  padding-left: 0;
  // y轴居中对齐
  align-items: center;
  //文本颜色
  color: #fff;
  //字体大小
  font-size: 24px;
  > div {
    display: flex;
    // y轴居中对齐
    align-items: center;
    span {
      // 图标与字体距离
      margin-left: 15px;
    }
  }
}
</style>