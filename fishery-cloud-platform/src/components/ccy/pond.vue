<template>
  <div class="main">
    <el-row>
      <el-col :span="24" class="infoTitle">
        <div class="pondName">{{toPond.name}}</div>
        <div><el-button size="mini" plain type="primary">更多</el-button></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="imgBox">
          <img src="../../assets/pond.jpg" alt="" />
        </div>
      </el-col>
      <el-col :span="15">
        <!-- <p>池塘名称：</p> -->
        <p>池塘面积/m²：{{toPond.area}}</p>
        <p>池塘深度/m：{{toPond.depth}}</p>
        <p>池塘类型：{{toPond.type}}</p>
        <!-- <p>投放尾数/尾：{{toPond.}}</p> -->
        <!-- <p>投放时间：{{toPond.}}</p> -->
        <!-- <p>上次捕捞时间：{{toPond.}}</p> -->
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
export default {
  props:{
    toPond:{
      type:[Object],
      area:String,
      depth:String,
      type:String,
      name:String,
      creator:String
    }
  },
  data(){
    return {
      
      baseId:'1248910886228332544',     //基地ID
    }
  },
  created(){
    // this.getPondList(3,1);  //获取池塘信息
  },
  methods:{
    async getPondList(size,page) {
      const { data: res } = await this.$pondController.get(
        `getInfo/${this.baseId}/${size}/${page}`
      );
      if (res.statusCode !== 2000) {
        console.log(res);
        this.addPondInfo.total = res.data.total
      } else {
        console.log("查询池塘信息失败");
      }
    },
  }
};
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
