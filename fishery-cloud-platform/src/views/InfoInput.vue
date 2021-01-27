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
    </el-card>
    <!-- 卡片视图结束 -->
  </div>
</template>
<script>
import Breadcrumb from "../components/ljc/public/breadcrumb";
export default {
  components: { Breadcrumb },
  data() {
    return {
      /* 面包屑导航区信息开始 */
      breadcrumbInfo: ["养殖生产", "加工厂", "加工信息管理", "工艺投入品信息"],
      /* 面包屑导航区信息结束 */

      myTitle: "工艺投入品信息",
    };
  },
  methods: {
    /* 返回开始 */
    goBack() {
      this.$router.push({
        path: "/info-plant",
        // 防止返回的时候工厂编号的丢失
        query: { ID: this.$route.query.processingFactoryId },
      });
    },
    /* 返回结束 */
  },
};
</script>

<style lang="less" scoped>
.steps {
  margin-top: 20px;
}
</style>
