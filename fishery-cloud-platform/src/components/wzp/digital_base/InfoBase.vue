<template>
  <el-card shadow="always">
    <el-carousel height="180px" indicator-position="outside">
      <el-carousel-item v-for="item in carousels" :key="item">
        <el-image :src="item"></el-image>
      </el-carousel-item>
    </el-carousel>
    <el-row class="baseInformation">
      <p>
        <i class="el-icon-office-building"></i>
        {{ baseInfo.name }}
      </p>
      <p>
        <i class="el-icon-user"></i>
        {{ baseInfo.creator }}
      </p>
      <p>
        <i class="el-icon-map-location"></i>
        {{ baseInfo.address }}
      </p>
      <p>
        <i class="el-icon-pie-chart"></i>
        池塘总面积：{{ pondInfo.totalAmount }}m²
      </p>
      <p>
        <i class="el-icon-data-line"></i>
        池塘数量：{{ pondInfo.totalArea || 0 }}个
      </p>
    </el-row>
  </el-card>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      baseInfo: {},
      pondInfo: {},
      carousels: [],
    };
  },
  methods: {
    ...mapMutations(["setBaseInfo"]),
    // 获取基地信息
    async getBaseInfo(baseId) {
      const { data: res } = await this.$base.get(`/${baseId}`);
      console.log("getBaseInfo: ", res);
      if (res.statusCode === 20000) {
        this.baseInfo = res.data;
        this.carousels = this.baseInfo.picture?this.baseInfo.picture.split(","):[];
        this.$store.commit("setBaseInfo", res.data);
      } else {
        console.error(res.message);
      }
    },

    // 获取基地池塘的总数量、总面积
    async getPondInfo(baseId) {
      const { data: res } = await this.$pondController.get(`/count/${baseId}`);
      console.log("getPondInfo: ", res);
      if (res.statusCode === 20000) {
        this.pondInfo = res.data;
      } else {
        console.error(res.message);
      }
    },
  },
  created() {
    this.getBaseInfo(this.$store.state.userInfo.baseId);
    this.getPondInfo(this.$store.state.userInfo.baseId);
  },
};
</script>
<style lang="less">
.el-carousel__item .el-image {
  width: 100%;
  height: 180px;
}
.el-carousel__item {
  border-radius: 4px;
  border: 1px solid rgb(179, 176, 176);
}
.el-carousel {
  border-radius: 4px;
  padding: 2px;
}
.baseInformation {
  margin: 0;
}
.baseInformation i {
  color: rgb(45, 46, 46);
  font-size: 18px;
  margin-right: 10px;
}
.baseInformation p {
  color: #6f7074;
  font-size: 14px;
  margin: 0;
}
</style>