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
        {{ baseInfoForm.baseName }}
      </p>
      <p>
        <i class="el-icon-user"></i>
        {{ baseInfoForm.createBy }}
      </p>
      <p>
        <i class="el-icon-map-location"></i>
        {{ baseInfoForm.baseAddr }}
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
      baseInfoForm: {
        baseAddr: "广州市海珠区",
        baseIntroduction:
          "仲恺农业工程学院（Zhongkai University of Agriculture and Engineering）简称仲恺，创办于1927年，是一所以伟大的爱国主义者、近代民主革命家廖仲恺先生名字命名，以现代农业科学为特色，农学、工学为优势，农、工、理、经、管、文、艺、法八大学科协调发展的广东省省属应用研究型大学，是教育部本科教学评估优秀学校及全国首批卓越农林人才教育培养计划高校。↵学校办学历史悠久，文脉深厚，坐落在历史文化名城——广州。现有海珠校区、白云校区、番禺教学科研基地，占地面积2264余亩。校园集云山之神秀，汇珠水之灵气，是读书治学的理想地。",
        baseName: "Super基地",
        basePic:
          "http://134.175.208.235/group1/M00/00/28/rBAAD1_YZIyAHq-UAAGH2TCKbN0940.jpg;http://134.175.208.235/group1/M00/00/29/rBAAD1_5Q3eAB1JXAAFNS57b_0o146.jpg;http://134.175.208.235/group1/M00/00/29/rBAAD1_5Q3qAYZdLAACvnk9mlZg029.jpg",
        basePositionLatitude: "23.08331",
        basePositionLongitude: "113.3172",
        createBy: "大老板",
        createDate: "2020-08-06 23:25:00",
        funds: 10000,
        id: "1248910886228332544",
        registNumber: "10101010101010",
        scope: "虾类养殖",
      },
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