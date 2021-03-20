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
        <el-tab-pane label="入库信息管理"
          ><In :createPersonList="createPersonList" :seedInfo="seedInfo"
        /></el-tab-pane>
        <el-tab-pane label="出库信息管理"
          ><Out :createPersonList="createPersonList" :seedInfo="seedInfo"
        /></el-tab-pane>
        <el-tab-pane label="待入库信息管理"><Enter/></el-tab-pane>
      </el-tabs>
      <!-- tab栏结束 -->
    </el-card>
    <!-- 卡片视图结束 -->
  </div>
</template>
<script>
import Breadcrumb from "../public/breadcrumb";
import Title from "../public/title";
import In from "../coldStorageInfo/In/InInfo";
import Out from "../coldStorageInfo/Out/OutInfo";
import Public from "../public/public";
import Enter from "./refrigeratoryEnter/TheRefrigeratoryEnter";

export default {
  components: {
    Breadcrumb,
    Title,
    In,
    Out,
    Enter,
  },
  data() {
    return {
      model: new Public(this),

      /* 面包屑导航区信息开始 */
      breadcrumbInfo: ["养殖生产", "冷库", "冷库信息管理"],
      /* 面包屑导航区信息结束 */

      myTitle: "冷库出入信息管理",

      // 管理员信息
      createPersonList: [],

      // 种苗信息
      seedInfo: [],
    };
  },
  computed: {},
  created() {
    this.getStaff();
    this.getSeedInfo();
  },
  methods: {
    /* 返回开始 */
    goBack() {
      this.$router.push({
        path: "/cold-storage",
      });
    },
    /* 返回结束 */

    // 获取员工
    async getStaff() {
      const { data: res } = await this.model.getStaff();
      this.createPersonList = res.data.records;
      console.log(this.createPersonList);
    },

    // 获取种苗信息
    async getSeedInfo() {
      const { data: res } = await this.model.getSeedInfo();
      this.seedInfo = res.data;
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  margin-top: 20px;
}
</style>

