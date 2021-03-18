<template>
  <div class="body">
    <header style="position: relative">
      <h1 class="wzp_style_leaderTitle">基地信息概览</h1>
      <!-- <div class="showTime">当前时间：{{}}</div> -->
    </header>
    <section class="mainbox">
      <div class="column">
        <div class="panel">
          <h2>基地种苗信息</h2>
          <div class="chart1 chart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel">
          <h2>各池塘投放种苗尾数</h2>
          <div
            class="chart2 chart"
            @mouseover="overEvent"
            @mouseleave="outEvent"
          ></div>
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
          <el-row class="columnSt" v-if="proInfo.length > 0">
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
          <el-row class="columnSt" v-if="baseRefInfo.length > 0">
            <el-col :span="12">
              <ul>
                <li>基地冷库数</li>
                <li class="specialLi">{{ baseRefInfo.amount }}</li>
              </ul>
            </el-col>
            <el-col :span="12">
              <ul>
                <li>冷库总面积(平方米)</li>
                <li class="specialLi">
                  {{ baseRefInfo.area ? "baseRefInfo.area" : "暂无数据" }}
                </li>
              </ul>
            </el-col>
          </el-row>
          <el-row class="columnSt" v-if="orderTimeList">
            <el-col :span="12">
              <ul>
                <li>近三个月订单数</li>
                <li class="specialLi">
                  {{ orderTimeList.amount ? orderTimeList.amount : 0 }}
                </li>
              </ul>
            </el-col>
            <el-col :span="12">
              <ul>
                <li>近三个月交易总额</li>
                <li class="specialLi">
                  {{ orderTimeList.money ? orderTimeList.money : 0 }}
                </li>
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
      </div>
      <div class="column">
        <div class="panel">
          <h2>养殖投入品入库信息</h2>
          <div class="chart chart4"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel">
          <h2>养殖投入品库存</h2>
          <div class="chart chart5"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel">
          <h2>养殖投入品出库信息</h2>
          <div class="chart6 chart"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { mapState } from "vuex";
// import echarts from "echarts"
var myVue = {};
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
      orderTimeList: [],
      nowLength: 0,
      timer: "",
      baseRefInfo: [],
      orderTimeInfo: {
        baseId: this.$store.state.baseInfo.id,
        end: "",
        begin: "",
      },
      chart1VM: undefined,
      chart2VM: undefined,
      chart3VM: undefined,
      chart4VM: undefined,
      chart5VM: undefined,
      chart6VM: undefined,
    };
  },
  watch: {
    "userInfo.theme": {
      handler(val) {
        this.chart1VM.dispose();
        this.chart2VM.dispose();
        this.chart3VM.dispose();
        this.chart4VM.dispose();
        this.chart5VM.dispose();
        this.chart6VM.dispose();
        this.putChart1();
        this.putChart3();
        this.getSupplyInInfo();
        this.getPondInfo();
        this.getSupplyInfo();
        this.putChart6();
      },
    },
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
    
  },
  mounted() {
    window["putChart2"] = () => {
      this.putChart2();
    };
    console.log(this.$store);
    window.nowLength = 0;
    window["myVue"] = this;
    this.putChart1();
    this.getBaseGermchit(); //获取各种类种苗进货量，库存量，使用量，产量信息
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
    this.getBaseRefInfo(); //获取冷库信息
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
      console.log(res);
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
        this.putChart2(this.pondInfo);
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
      currDate = this.timeFormat(currDate);
      this.orderTimeInfo.begin = resultDate;
      this.orderTimeInfo.end = currDate;
      console.log(this.orderTimeInfo);
      const { data: res } = await this.$leader.post(
        "order",
        this.orderTimeInfo
      );
      console.log(res);
      if (res.statusCode === 20000) {
        this.orderTimeList = res.data;
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
    async getBaseRefInfo() {
      const { data: res } = await this.$leader.get(
        `ref/${this.$store.state.baseInfo.id}`
      );
      console.log(res);
      if (res.statusCode === 20000) {
        this.baseRefInfo = res.data;
      }
    },
    putChart1(data = this.baseGermchitInfo) {
      let myChart = this.$echarts.init(
        document.querySelector(".chart1"),
        this.userInfo.theme
      );
      this.chart1VM = myChart;
      let name = [];
      let obj = [];
      let objSurp = [];
      data.forEach((e) => {
        if (name.indexOf(e.species) == -1) {
          name.push(e.species);
          let objData = {};
          let objSurpdata = {};
          objSurpdata.value = e.surplusAmount;
          objSurpdata.name = e.species;
          objData.value = e.purchaseAmount;
          objData.name = e.species;
          obj.push(objData);
          objSurp.push(objSurpdata);
        } else {
          obj[name.indexOf(e.species)].value += e.purchaseAmount;
          objSurp[name.indexOf(e.species)].value += e.surplusAmount;
        }
      });
      let option = {
        title: [
          {
            text: "种苗进货",
            left: "24.5%",
            top: "49%",
            textAlign: "center",
            textStyle: {
              fontSize: 14,
            },
            subtextStyle: {
              fontSize: 22,
            },
          },
          {
            text: "种苗库存",
            left: "74.5%",
            top: "49%",
            textAlign: "center",
            textStyle: {
              fontSize: 14,
            },
            subtextStyle: {
              fontSize: 22,
            },
          },
        ],
        tooltip: {
          trigger: "item",
          formatter: (v) =>
            `${v.name.replace("_legend1", "").replace("_legend2", "")} : ${(
              v.value 
            )}(${v.percent}%)`,
        },
        legend: [
          {
            left: "13%",
            type: "scroll",
            height: "10%",
            data: name,
            formatter: (v) => v.replace("_legend1", ""),
          },
        ],
        series: [
          {
            type: "pie",
            radius: [50, 55],     //数组的第一项是内半径，第二项是外半径。
            center: ["25%", "55%"],
            data: obj,
            label: {
              formatter: (v) =>
                `${v.name.replace("_legend1", "")}：${v.percent}%`,
            },
          },
          {
            type: "pie",
            radius: [50, 55],
            center: ["75%", "55%"],
            data: objSurp,
            label: {
              formatter: (v) =>
                `${v.name.replace("_legend2", "")}：${v.percent}%`,
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
      let myChart = this.$echarts.init(
        document.querySelector(".chart2"),
        this.userInfo.theme
      );
      this.chart2VM = myChart;
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
            color: "#fff",
            fontSize: 17,
          },
        },
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
        xAxis: {
          axisLabel: {
            color: "#c0c3cd",
            fontSize: 12,
            interval: 0,
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#384267",
              width: 1,
              type: "dashed",
            },
            show: true,
          },
          data: name,
          type: "category",
        },
        yAxis: {
          axisLabel: {
            color: "#c0c3cd",
            fontSize: 14,
          },

          splitLine: {
            show: true,
            lineStyle: {
              color: "#384267",
              type: "dashed",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#384267",
              width: 1,
              type: "dashed",
            },
            show: true,
          },
          name: "",
        },
        series: [
          {
            data: inputNum,
            type: "bar",
            barWidth: 30,
            itemStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: "linear",
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: "#3A1BFD",
                  },
                  {
                    offset: 1,
                    color: "#3BEFFD",
                  },
                ],
              },
            },
            label: {
              show: true,
              position: "top",
              distance: 10,
              color: "#fff",
            },
          },
          {
            data: [1, 1, 1, 1, 1, 1, 1, 1],
            type: "pictorialBar",
            barMaxWidth: "20",
            symbol: "diamond",
            symbolOffset: [0, "50%"],
            symbolSize: [30, 15],
          },
          {
            data: inputNum,
            type: "pictorialBar",
            barMaxWidth: "20",
            symbolPosition: "end",
            symbol: "diamond",
            symbolOffset: [0, "-50%"],
            symbolSize: [30, 12],
            zlevel: 2,
          },
        ],
      };

      myChart.setOption(option);
    },
    putChart3(data = this.baseGermchitInfo) {
      let myChart = this.$echarts.init(
        document.querySelector(".chart3"),
        this.userInfo.theme
      );
      this.chart3VM = myChart;
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
          type: "scroll",
          orient: "vertical",
          left: "left",
          top: 5,
          data: name,
        },
        series: [
          {
            name: "虾苗产量",
            type: "pie",
            radius: "55%",
            center: ["55%", "45%"],
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
      let myChart = this.$echarts.init(
        document.querySelector(".chart4"),
        this.userInfo.theme
      );
      this.chart4VM = myChart;
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
          type: "scroll",
          orient: "vertical",
          left: "left",
          top: 5,
          bottom: 20,
          data: name,
        },
        series: [
          {
            name: "入库量",
            type: "pie",
            radius: "55%",
            center: ["57%", "51%"],
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
    putChart6(data = this.supplyOutInfo) {
      let myChart = this.$echarts.init(
        document.querySelector(".chart6"),
        this.userInfo.theme
      );
      this.chart6VM = myChart;
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
          type: "scroll",
          orient: "vertical",
          left: "left",
          top: 5,
          bottom: 20,
          data: name,
        },
        series: [
          {
            name: "出库量",
            type: "pie",
            radius: "55%",
            center: ["66%", "60%"],
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
      let totalWeight = [];
      data.forEach((e) => {
        if (name.indexOf(e.name) != -1) {
          useWeight[name.indexOf(e.name)] += e.useWeight;
          surplusWeight[name.indexOf(e.name)] += e.surplusWeight;
          totalWeight[name.indexOf(e.name)] += e.totalWeight;
        } else {
          useWeight.push(e.useWeight);
          surplusWeight.push(e.useWeight);
          totalWeight.push(e.totalWeight);
          name.push(e.name);
        }
      });
      let myChart = this.$echarts.init(
        document.querySelector(".chart5"),
        this.userInfo.theme
      );
      this.chart5VM = myChart;
      let option = {
        tooltip: {
          //提示框组件
          trigger: "axis",
          formatter: "{b}<br/>{a2}: {c2}<br/>{a1}: {c1}<br/>{a5}: {c5}",
          axisPointer: {
            type: "shadow",
            label: {
              backgroundColor: "rgba(17, 27, 54, 1)",
            },
          },
        },
        grid: {
          left: "10%",
          right: "10%",
          bottom: "10%",
          top: "15%",
          height: "85%",
          containLabel: true,
        },
        legend: {
          //图例组件，颜色和名字
          itemGap: 16,
          itemWidth: 18,
          itemHeight: 10,
          selectedMode: false,
          data: [
            {
              name: "进货量",
            },
            {
              name: "使用量",
            },
            {
              name: "剩余量",
            },
          ],
          textStyle: {
            color: "#a8aab0",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 12,
          },
        },
        xAxis: [
          {
            type: "category",
            //	boundaryGap: true,//坐标轴两边留白
            data: name,
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
              //	margin:15,
              textStyle: {
                color: "#078ceb",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 10,
              },
              rotate: 50,
            },
            axisTick: {
              //坐标轴刻度相关设置。
              show: false,
            },
            axisLine: {
              //坐标轴轴线相关设置
              lineStyle: {
                color: "#fff",
                opacity: 0.2,
              },
            },
            splitLine: {
              //坐标轴在 grid 区域中的分隔线。
              show: false,
            },
          },
        ],
        yAxis: [
          {
            // max:1200,
            type: "value",
            splitNumber: 4,
            axisLabel: {
              textStyle: {
                color: "#a8aab0",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 10,
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#fff"],
                opacity: 0.06,
              },
            },
          },
        ],
        series: [
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [20, 10],
            symbolOffset: [-10, -6],
            symbolPosition: "end",
            z: 12,
            // "barWidth": "0",barGap
            label: {
              normal: {
                show: true,
                offset: [-10, 0],
                position: "top",
                textAlign: "left",
                // "formatter": "{c}%"
                fontSize: 10,
                fontWeight: "bold",
                color: "rgba(230, 230, 230, 1)",
              },
            },
            color: "rgba(230, 230, 230, 1)",
            data: useWeight,
          },
          {
            name: "使用量",
            type: "bar",
            stack: "1",
            data: useWeight,
            barWidth: 20,
            barGap: 0, //柱间距离
            itemStyle: {
              normal: {
                show: true,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(230, 230, 230, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(255, 255, 255, 0)",
                  },
                ]),
                opacity: 0.8,
              },
            },
          },
          {
            name: "进货量", //头部
            type: "pictorialBar",
            symbolSize: [20, 10],
            symbolOffset: [-10, -6],
            z: 12,
            symbolPosition: "end",
            label: {
              normal: {
                offset: [-10, 0],
                show: true,
                position: "top",
                // "formatter": "{c}%",
                fontSize: 10,
                fontWeight: "bold",
                color: "rgba(51,135,255, 1)",
              },
            },
            color: "rgba(51,135,255, 1)",
            data: totalWeight,
          },
          {
            name: "进货量",
            type: "bar",
            stack: "1",
            barWidth: 20,
            barGap: "-100%",
            z: 0,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(51,135,255, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(51,135,255, .2)",
                  },
                ]),
                opacity: 0.8,
              },
            },

            data: totalWeight,
          },
          {
            name: "剩余量",
            type: "pictorialBar",
            symbolSize: [20, 10],
            symbolOffset: [10, -6],
            symbolPosition: "end",
            z: 12,
            // "barWidth": "0",barGap
            label: {
              normal: {
                offset: [10, 0],
                show: true,
                position: "top",
                // "formatter": "{c}%",
                fontSize: 10,
                fontWeight: "bold",
                color: "rgba(0, 255, 255, 1)",
              },
            },
            color: "rgba(0, 255, 255, 1)",
            data: surplusWeight,
          },
          {
            name: "剩余量",
            type: "bar",
            data: surplusWeight,
            barWidth: 20,
            barGap: 0, //柱间距离
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(0, 255, 255, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(255, 255, 255, 0)",
                  },
                ]),
                opacity: 0.8,
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
    overEvent() {
      console.log("移入");
      clearInterval(this.timer);
    },
    outEvent() {
      console.log("移出");
      this.getPondInfo();
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
  // background: url(../../assets/images/bg.jpg) no-repeat transparent;
  background-size: 100% 100%;
  width: 100%;
}

ul {
  margin: 0;
  list-style: none;
}
header h1 {
  font-size: 2rem;
  text-align: center;
}

.mainbox {
  display: flex;
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
  // background: rgba(255, 255, 255, 0.04) url(../../assets/line.png);
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
  // background: rgba(255, 255, 255, 0.04) url(../../assets/line.png);
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
  height: 200px;
  width: 100%;
  // height: 100%;
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