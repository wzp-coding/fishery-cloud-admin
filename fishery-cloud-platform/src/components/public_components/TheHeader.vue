<template>
  <div>
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>智慧渔业云服务平台</span>
      </div>
      <span @click="backLogin" style="cursor: pointer">退出登录</span>
    </el-header>
  </div>
</template>
<script>
export default {
  methods: {
    // 退出登录操作
    backLogin() {
      localStorage.setItem('token','');
      this.$router.push('/login');
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
  font-size: 20px;
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