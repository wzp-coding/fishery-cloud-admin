<template>
  <div>
    <!-- 面包屑导航区开始 -->
    <TheBreadcrumb :breadcrumbInfo="breadcrumbInfo" />
    <!-- 面包屑导航区结束 -->

    <!-- 卡片视图开始 -->
    <el-card>
      <!-- 标题区域开始 -->
      <el-page-header @back="goBack" :content="myTitle"> </el-page-header>
      <!-- 标题区域结束 -->

      <!-- tab栏开始 -->
      <el-tabs class="tabs">
        <el-tab-pane label="加工产品管理">加工产品管理</el-tab-pane>
        <el-tab-pane label="工艺管理">工艺管理</el-tab-pane>
        <el-tab-pane label="投入品管理">投入品管理</el-tab-pane>
      </el-tabs>
      <!-- tab栏结束 -->
    </el-card>
    <!-- 卡片视图结束 -->
  </div>
</template>
<script>
import TheBreadcrumb from "../components/ljc/public/breadcrumb";
import TheTitle from "../components/ljc/public/title";
export default {
  components: {
    TheBreadcrumb,
    TheTitle,
  },
  data() {
    return {
      /* 面包屑导航区信息开始 */
      breadcrumbInfo: ["养殖生产", "加工厂", "加工信息管理"],
      /* 面包屑导航区信息结束 */

      myTitle: "加工信息管理",
    };
  },
  created() {},
  methods: {
    /* 返回开始 */
    goBack() {
      this.$router.push({
        path: "/process-plant",
      });
    },
    /* 返回结束 */
  },
};
</script>

<style lang="less" scoped>
.tabs {
  margin-top: 20px;
}
</style>

