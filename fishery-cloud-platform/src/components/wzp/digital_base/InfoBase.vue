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
        {{ baseInfo.baseName }}
      </p>
      <p>
        <i class="el-icon-user"></i>
        {{ baseInfo.createBy }}
      </p>
      <p>
        <i class="el-icon-map-location"></i>
        {{ baseInfo.baseAddr }}
      </p>
      <p>
        <i class="el-icon-pie-chart"></i>
        池塘总面积：{{ pondInfo.volume }}m²
      </p>
      <p>
        <i class="el-icon-data-line"></i>
        池塘数量：{{ pondInfo.pondNum }}
      </p>
    </el-row>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      baseInfo: {},
      pondInfo: {
        volume: 0,
        pondNum: 0,
      },
      carousels: [
        "http://134.175.208.235/group1/M00/00/28/rBAAD1_YZIyAHq-UAAGH2TCKbN0940.jpg",
        "http://134.175.208.235/group1/M00/00/29/rBAAD1_5Q3eAB1JXAAFNS57b_0o146.jpg",
        "http://134.175.208.235/group1/M00/00/29/rBAAD1_5Q3qAYZdLAACvnk9mlZg029.jpg",
      ],
    };
  },
  methods: {},
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