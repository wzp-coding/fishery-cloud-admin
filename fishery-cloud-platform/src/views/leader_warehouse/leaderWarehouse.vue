<template>
  <div class="body">
    <header>
      <h1>基地信息概览</h1>
      <div class="showTime">当前时间：</div>
    </header>
    <section class="mainbox">
      <div class="column">
        <div class="panel">
          <h2>基地种苗进货信息</h2>
          <div class="chart1 chart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel">
          <h2>各池塘投放种苗尾数</h2>
          <div class="chart2 chart" @mouseover="overEvent" @mouseleave ="outEvent"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel">
          <h2>种苗产量</h2>
          <div class="chart3 chart"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <div class="column">
        <div>
          <h3>基地概况</h3>
          <el-row class="columnSt">
            <el-col :span="12"
              ><ul>
                <li>基地名称</li>
                <li class="specialLi">{{ baseInfo.name }}</li>
              </ul></el-col
            >
            <el-col :span="12"
              ><ul>
                <li>负责人</li>
                <li class="specialLi">{{ baseInfo.creator }}</li>
              </ul></el-col
            >
          </el-row>
          <el-row class="columnSt">
            <el-col :span="12">
              <ul>
                <li>地址</li>
                <li class="specialLi">{{ this.baseInfo.address }}</li>
              </ul>
            </el-col>
            <el-col :span="12">
              <ul>
                <li>养殖类型</li>
                <li class="specialLi">{{ this.baseInfo.scope }}</li>
              </ul>
            </el-col>
          </el-row>
          <el-row class="columnSt">
            <el-col :span="12">
              <ul>
                <li>基地池塘数</li>
                <li class="specialLi">{{ basePondInfo.totalAmount }}</li>
              </ul>
            </el-col>
            <el-col :span="12">
              <ul>
                <li>池塘总面积(平方米)</li>
                <li class="specialLi">{{ basePondInfo.totalArea }}</li>
              </ul>
            </el-col>
          </el-row>
          <el-row class="columnSt">
            <el-col :span="12">
              <ul>
                <li>基地加工厂数</li>
                <li class="specialLi">{{ proInfo.count }}</li>
              </ul>
            </el-col>
            <el-col :span="12">
              <ul>
                <li>加工厂总面积(平方米)</li>
                <li class="specialLi">{{ proInfo.area }}</li>
              </ul>
            </el-col>
          </el-row>
          <div class="panel-footer"></div>
        </div>
        <div>
          <h3>大额订单</h3>
          <div class="order">
            <el-row class="orderTitle">
              <el-col :span="12"><span>客户名</span></el-col>
              <el-col :span="12"><span>金额</span></el-col>
            </el-row>
            <div class="orderInfo">
              <el-row v-for="(item, index) in orderList" :key="index">
                <el-col :span="12">{{ item.name }}</el-col>
                <el-col :span="12">{{ item.money }}</el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div v-if="orderTimeList.length">
          <h3>近期订单</h3>
          <div class="order">
            <el-row class="orderTitle">
              <el-col :span="12"><span>客户名</span></el-col>
              <el-col :span="12"><span>金额</span></el-col>
            </el-row>
            <div class="orderInfo">
              <el-row v-for="(item, index) in orderTimeList" :key="index">
                <el-col :span="12">{{ item.name }}</el-col>
                <el-col :span="12">{{ item.money }}</el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div v-else>
          <h3>暂无近期订单</h3>
        </div>
      </div>
      <div class="column">
        <div class="panel">
          <h2>基地入库信息</h2>
          <div class="chart chart4"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel">
          <h2>基地投入品库存</h2>
          <div class="chart chart5"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel">
          <h2>基地投入出库信息</h2>
          <div class="chart6 chart"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
// var myVue = {};
export default {
  data() {
    return {
      baseId: "",
      date: new Date(),
      baseInfo: [],
      baseGermchitInfo: [],
      pondInfo: [],
      basePondInfo: [],
      supplyOutInfo: [],
      supplyInInfo: [],
      proInfo: [],
      orderList: [],
      orderTimeList:[],
      nowLength: 0,
      timer: "",
      orderTimeInfo:{
        baseId:this.$store.state.baseInfo.id,
        end:'',
        begin:''
      }
    };
  },
  created() {
    this.getBaseAmount(); //获取基地总人数
    this.getBaseInfo(); //获取基地基本信息
    this.getBaseGermchit(); //获取各种类种苗进货量，库存量，使用量，产量信息
    this.getPondInfo(); //获取所有池塘信息
    this.getBasePondInfo(); //获取基地总体池塘信息
    this.getSupplyOutInfo(); //获取出库信息
    this.getSupplyInInfo(); //获取入库信息
    this.getSupplyInfo(); //获取基地投入品信息
    this.getProInfo(); //获取基地加工厂信息
    this.getOrderBySize(10); //获取基地订单
    this.getOrderBytime(); //选择日期获取订单
  },
  mounted() {
    window["putChart2"] = () => {
      this.putChart2();
    };
    console.log(this.$store);
    window.nowLength = 0;
    window["myVue"] = this;
  },
  methods: {
    async getBaseAmount() {
      const { data: res } = await this.$leader.get(
        `base/amount/${this.$store.state.baseInfo.id}`
      );
      console.log(res);
    },
    async getBaseGermchit() {
      const { data: res } = await this.$leader.get(
        `base/germchit/${this.$store.state.baseInfo.id}`
      );
      if (res.statusCode === 20000) {
        this.baseGermchitInfo = res.data;
        this.putChart1(res.data);
        this.putChart3(res.data);
      }

      console.log(res);
    },
    async getBaseInfo() {
      const { data: res } = await this.$leader.get(
        `base/info/${this.$store.state.baseInfo.id}`
      );
      if (res.statusCode === 20000) {
        this.baseInfo = res.data;
        console.log(res);
      }
    },
    async getPondInfo() {
      const { data: res } = await this.$leader.get(
        `pondInfo/${this.$store.state.baseInfo.id}`
      );
      console.log(res);
      if (res.statusCode === 20000) {
        this.pondInfo = res.data;
        this.Chart2(this.pondInfo.length, this.pondInfo);
      }
    },
    async getSupplyOutInfo() {
      const { data: res } = await this.$leader.get(
        `supply/out/${this.$store.state.baseInfo.id}`
      );
      if (res.statusCode === 20000) {
        console.log(res);
        this.supplyOutInfo = res.data;
        this.putChart6(res.data);
      }
    },
    async getBasePondInfo() {
      const { data: res } = await this.$leader.get(
        `pond/${this.$store.state.baseInfo.id}`
      );
      if (res.statusCode === 20000) {
        this.basePondInfo = res.data;
      }
    },
    async getSupplyInInfo() {
      const { data: res } = await this.$leader.get(
        `supply/in/${this.$store.state.baseInfo.id}`
      );
      if (res.statusCode === 20000) {
        this.putChart4(res.data);
      }
    },
    async getSupplyInfo() {
      const { data: res } = await this.$leader.get(
        `supply/${this.$store.state.baseInfo.id}`
      );
      if (res.statusCode === 20000) {
        console.log(res);
        this.putChart5(res.data);
      }
    },
    async getProInfo() {
      const { data: res } = await this.$leader.get(
        `pro/${this.$store.state.baseInfo.id}`
      );
      if (res.statusCode === 20000) {
        this.proInfo = res.data;
      }
    },
    async getOrderBytime() {
      var resultDate, year, month, date, hms;
      var currDate = new Date();
      year = currDate.getFullYear();
      month = currDate.getMonth() + 1;
      date = currDate.getDate();
      hms =
        currDate.getHours() +
        ":" +
        currDate.getMinutes() +
        ":" +
        (currDate.getSeconds() < 10
          ? "0" + currDate.getSeconds()
          : currDate.getSeconds());
      switch (month) {
        case 1:
        case 2:
        case 3:
          month += 9;
          year--;
          break;
        default:
          month -= 3;
          break;
      }
      month = month < 10 ? "0" + month : month;
      resultDate = year + "-" + month + "-" + date + " " + hms;
      console.log(resultDate);
      currDate = this.timeFormat(currDate)
      this.orderTimeInfo.begin = currDate
      this.orderTimeInfo.end = resultDate
      console.log(this.orderTimeInfo);
      const {data: res} = await this.$leader.post('order',this.orderTimeInfo)
      console.log(res);
      if(res.statusCode === 20000){
        this.orderTimeList = res.data
      }
    },
    async getOrderBySize(size) {
      const { data: res } = await this.$leader.get(
        `customer/${this.$store.state.baseInfo.id}/${size}`
      );
      if ((res.statusCode = 20000)) {
        this.orderList = res.data;
        console.log(this.orderList);
      }
    },
    putChart1(data) {
      let myChart = this.$echarts.init(document.querySelector(".chart1"));
      let name = [];
      let obj = [];
      data.forEach((e) => {
        if (name.indexOf(e.species) == -1) {
          name.push(e.species);
          let objData = {};
          objData.value = e.purchaseAmount;
          objData.name = e.species;
          obj.push(objData);
        } else {
          obj[name.indexOf(e.species)].value += e.purchaseAmount;
        }
      });
      let option = {
        color: ["#FDB434", "#59CA9E", "#F76968", "#4BCCD3"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}尾 ({d}%)",
        },
        width: "250px",
        legend: {
          orient: "vertical",
          left: "left",
          data: name,
          textStyle: {
            color: "white",
          },
        },
        series: [
          {
            name: "虾苗进货量",
            type: "pie",
            radius: "70%",
            center: ["70%", "60%"],
            data: obj,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },

    Chart2(length, pondList) {
      this.timer = setInterval(function () {
        let array = [];
        if (this.nowLength + 5 > length) {
          array = pondList.slice(this.nowLength, length);
          this.nowLength = 0;
          this.myVue.putChart2(array);
        } else {
          array = pondList.slice(this.nowLength, this.nowLength + 5);
          this.nowLength += 5;
          this.myVue.putChart2(array);
        }
      }, 3000);
    },
    putChart2(data) {
      let myChart = this.$echarts.init(document.querySelector(".chart2"));
      let name = [];
      let inputNum = [];
      data.forEach((e) => {
        name.push(e.name);
        if (!e.inputNum) {
          inputNum.push(2);
        } else {
          inputNum.push(e.inputNum);
        }
      });
      let option = {
        title: {
          text: "投苗量",
          textStyle: {
            color: "#c1c2c5",
          },
        },
        color: ["white"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "1%",
          top: "35px",
          right: "0%",
          bottom: "4%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: name,
            axisLabel: {
              color: "white",
            },
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#b7b7b7",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "white",
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#b7b7b7",
              },
            },
          },
        ],
        series: [
          {
            name: "池塘投苗量",
            type: "bar",
            barWidth: "40%",
            data: inputNum,
            itemStyle: {
              barBorderRadius: 5,
              normal: {
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    "#c23531",
                    "#2f4554",
                    "#61a0a8",
                    "#d48265",
                    "#91c7ae",
                    "#749f83",
                    "#ca8622",
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
      };

      myChart.setOption(option);
    },
    putChart3(data) {
      let myChart = this.$echarts.init(document.querySelector(".chart3"));
      let name = [];
      let obj = [];
      data.forEach((e) => {
        if (name.indexOf(e.species) == -1) {
          name.push(e.species);
          let objData = {};
          if (e.productAmount) {
            objData.value = e.productAmount;
          } else {
            objData.value = 0;
          }
          objData.name = e.species;
          obj.push(objData);
        } else if (e.productAmount) {
          obj[name.indexOf(e.species)].value += e.productAmount;
        }
      });
      let option = {
        color: ["#FDB434", "#59CA9E", "#F76968", "#4BCCD3"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}尾 ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: name,
          textStyle: {
            color: "white",
          },
        },
        series: [
          {
            name: "虾苗产量",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: obj,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      myChart.setOption(option);
    },
    putChart4(data) {
      let myChart = this.$echarts.init(document.querySelector(".chart4"));
      let name = [];
      let obj = [];
      data.forEach((e) => {
        name.push(e.name);
        let objData = {};
        objData.value = e.weight;
        objData.name = e.name;
        obj.push(objData);
      });
      let option = {
        color: ["#FF9F7F", "#C23531", "#61A0A8"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}kg ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: name,
          textStyle: {
            color: "white",
          },
        },
        series: [
          {
            name: "入库量",
            type: "pie",
            radius: "55%",
            center: ["50%", "71%"],
            data: obj,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
      // 自适应盒子大小,以及屏幕大小
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    putChart6(data) {
      let myChart = this.$echarts.init(document.querySelector(".chart6"));
      let name = [];
      let obj = [];
      data.forEach((e) => {
        name.push(e.name);
        let objData = {};
        objData.value = e.weight;
        objData.name = e.name;
        obj.push(objData);
      });
      let option = {
        color: ["#FF9F7F", "#C23531", "#61A0A8"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}kg ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: name,
          textStyle: {
            color: "white",
          },
        },
        series: [
          {
            name: "出库量",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: obj,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
      // 自适应盒子大小,以及屏幕大小
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    putChart5(data) {
      let name = [];
      let surplusWeight = [];
      let useWeight = [];
      data.forEach((e) => {
        if (name.indexOf(e.name) != -1) {
          useWeight[name.indexOf(e.name)] += e.useWeight;
          surplusWeight[name.indexOf(e.name)] += e.surplusWeight;
        } else {
          useWeight.push(e.useWeight);
          surplusWeight.push(e.useWeight);
          name.push(e.name);
        }
      });
      let myChart = this.$echarts.init(document.querySelector(".chart5"));
      let option = {
        color: ["#FF9F7F", "grey"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ["剩余量", "使用量"],
          textStyle: {
            color: "white",
          },
        },
        grid: {
          left: "3%",
          right: "8%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          name: "kg",
          nameTextStyle: {
            color: "white",
          },
          type: "value",
          axisLabel: {
            color: "white",
          },
        },
        yAxis: {
          type: "category",
          axisLabel: {
            color: "white",
          },
          data: name,
        },
        series: [
          {
            name: "剩余量",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: surplusWeight,
          },
          {
            name: "使用量",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: useWeight,
          },
        ],
      };
      myChart.setOption(option);
      // 自适应盒子大小,以及屏幕大小
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    overEvent(){
      console.log('移入');
      clearInterval(this.timer)
    },
    outEvent(){
      console.log('移出');
      this.getPondInfo()
    },
    timeFormat(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
  },
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: electronicFont;
  src: url(../../assets/fonts/DS-DIGIT.TTF);
}
.body {
  background: url(../../assets/bg.jpg) no-repeat #000;
  background-size: 100% 100%;
  width: 100%;
}

ul {
  margin: 0;
  list-style: none;
}
header h1 {
  font-size: 2rem;
  color: #fff;
  text-align: center;
}
header {
  background-color: aqua;
  background: url(../../assets/head_bg.png) no-repeat top center;
}
.mainbox {
  display: flex;
  color: #fff;
  padding: 5px;
  justify-content: space-between;
}
.mainbox .column {
  text-align: center;
}
.specialLi {
  font-family: electronicFont;
  font-weight: bold;
  font-size: 30px;
  color: #ffeb7b;
}
.mainbox .column:nth-child(1) {
  width: 29.5%;
}
.mainbox .column:nth-child(2) {
  width: 38%;
  margin-left: 7px;
  overflow: hidden;
}
.columnSt {
  margin: 0 0 5px 0;
  border: 1px solid rgba(25, 186, 139, 0.17);
  background: rgba(255, 255, 255, 0.04) url(../../assets/line.png);
  ul::before {
    content: "";
    position: absolute;
    width: 30px;
    height: 10px;
    border-top: 2px solid #02a6b5;
    border-left: 2px solid #02a6b5;
    top: 0;
    left: 0;
  }
  ul::after {
    content: "";
    position: absolute;
    width: 30px;
    height: 10px;
    border-bottom: 2px solid #02a6b5;
    border-right: 2px solid #02a6b5;
    right: 0;
    bottom: 0;
  }
}
.mainbox .column:nth-child(3) {
  // flex: 3;
  width: 30%;
  margin-right: 10px;
  // overflow: hidden;
}
header .showTime {
  position: absolute;
  top: 0;
  right: 0.375rem;
  line-height: 5rem;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
}
.panel h3 {
  color: rgb(231, 246, 250);
  height: 12px;
  line-height: 12px;
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  margin: 1rem 0;
}
.panel {
  position: relative;
  height: 17rem;
  width: 100%;
  border: 1px solid rgba(25, 186, 139, 0.17);
  background: rgba(255, 255, 255, 0.04) url(../../assets/line.png);
  padding: 0 0.1875rem 0.5rem;
  margin-bottom: 0.1875rem;
  .el-row {
    ul {
      position: relative;
      border: 1px solid rgba(25, 186, 139, 0.17);
      background: rgba(101, 132, 226, 0.1);
    }
  }
}
.panel::before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}
.panel::after {
  position: absolute;
  top: 0;
  right: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
}
.panel .panel-footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.panel .panel-footer::before {
  position: absolute;
  bottom: 0;
  left: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}
.panel .panel-footer::after {
  position: absolute;
  bottom: 0;
  right: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
}
.chart {
  height: 150px;
  width: 100%;
}
.order {
  text-align: center;
  .el-row {
    background: rgba(101, 132, 226, 0.1);
    margin-bottom: 3px;
  }
  width: 100%;
  .orderInfo {
    font-family: electronicFont;
    font-size: 18px;
    color: #ffeb7b;

    .el-row {
      margin: 0 0 3px 0;
    }
  }
}
</style>