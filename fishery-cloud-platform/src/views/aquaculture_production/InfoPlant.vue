<template>
  <div>
    <!-- 面包屑导航区开始 -->
    <Breadcrumb :breadcrumbInfo="breadcrumbInfo" />
    <!-- 面包屑导航区结束 -->

    <!-- 卡片视图开始 -->
    <el-card>
      <!-- 标题区域开始 -->
      <el-page-header @back="goBack" :content="myTitle"> </el-page-header>
      <!-- 标题区域结束 -->

      <!-- tab栏开始 -->
      <el-tabs class="tabs" type="card">
        <el-tab-pane label="加工产品管理"><Product /></el-tab-pane>
        <el-tab-pane label="工艺管理"><Craft /></el-tab-pane>
        <el-tab-pane label="投入品管理"><Input /></el-tab-pane>
      </el-tabs>
      <!-- tab栏结束 -->
    </el-card>
    <!-- 卡片视图结束 -->
  </div>
</template>
<script>
import Breadcrumb from "../../components/ljc/public/breadcrumb";
import Title from "../../components/ljc/public/title";
import Product from "../../components/ljc/product/TheProduct";
import Craft from "../../components/ljc/craft/TheCraft";
import Input from "../../components/ljc/input/TheInput";
export default {
  components: {
    Breadcrumb,
    Title,
    Product,
    Craft,
    Input,
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

