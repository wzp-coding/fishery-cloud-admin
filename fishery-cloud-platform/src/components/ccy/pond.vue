<template>
  <div class="main">
    <el-row>
      <el-col :span="24" class="infoTitle">
        <div class="pondName">池塘名字</div>
        <div>更多</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="imgBox">
          <img src="../../assets/pond.jpg" alt="" />
        </div>
      </el-col>
      <el-col :span="15">
        <p>虾苗品种：</p>
        <p>池塘面积/m²：</p>
        <p>池塘深度/m：</p>
        <p>池塘类型：</p>
        <p>投放尾数/尾：</p>
        <p>投放时间：</p>
        <p>上次捕捞时间：</p>
        <p>投放状态：未投放</p>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18" :offset="5">
        <el-tooltip
          effect="dark"
          content="捕捞"
          placement="left"
          :enterable="false"
        >
          <el-button
            type="success"
            icon="el-icon-wind-power"
            size="mini"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="投料"
          placement="top"
          :enterable="false"
        >
          <el-button
            icon="el-icon-caret-bottom"
            type="warning"
            size="mini"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="投苗"
          placement="top"
          :enterable="false"
        >
          <el-button
            type="success"
            icon="el-icon-arrow-down"
            size="mini"
          ></el-button>
        </el-tooltip>
        <el-button size="mini" icon="el-icon-edit"></el-button>
        <el-button size="mini" icon="el-icon-delete"></el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
* {
  margin: 0;
}
.main {
  border: 1px solid rgb(179, 179, 179);
  width: 31.5%;
  padding: 5px;
  margin: 0 0 10px 10px;
  border-radius: 4px;
}
.el-row {
  margin-bottom: 0;
}
p {
  color: #636e7b;
  padding-left: 9px;
  line-height: 17px;
}
el-col {
  border: 1px solid rgb(26, 25, 25);
  height: 100px;
}
.infoTitle {
  display: flex;
  justify-content: space-between;
  .pondName {
    color: #000;
    font-size: 20px;
  }
}
.imgBox {
  width: 120px;
  height: 120px;
  .imgBox {
    border: 1px solid rgb(175, 172, 172);
    padding: 5px;
    border-radius: 100%;
    width: 100%;
    height: 100%;
  }
}
</style>
