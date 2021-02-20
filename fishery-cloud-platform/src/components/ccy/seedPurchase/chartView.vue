<template>
  <div>
    <div class="chart1"></div>
    <div class="chart2"></div>
  </div>
</template>

<script>
var myVue = {};
export default {
  props: {},
  data() {
    return {
      baseId:this.$store.state.baseInfo.id,
      baseGermchitInfo:[],    //基地已有种苗信息
      nameList: [], //货物名称
      valueList: [], //进货量
    };
  },
  beforeCreate() {
    myVue = this;
  },
  created() {
    this.getChartInfo();      //查询基地已有的种苗信息   
  },
  methods: {
    async getChartInfo() {
      const {data : res} = await this.$germchitManagerController.get(`${this.baseId}`)
      console.log(res);
      let infoList = res.data;
      let arr = [];         //获取基地已有的种苗名称
      let arr1 = [];        //获取相应种苗的进货量
      let arr2 = [];        //获取基地已有的种苗及其进货量
      infoList.forEach((item) => {
          arr.push(item.germchitSpecies)
      });
      // 去重
      arr = arr.filter(function (item, index, array) {
        return array.indexOf(item) === index
      })
      // 循环将已经去重的名字赋予emptyObj，并加入arr1
      arr.forEach((item) => {
        // 空对象，存值
        let emptyObj = { name: '', value: 0 }
        let emptyOut = { name: '', value: 0 }
        emptyObj.name = item
        emptyOut.name = item
        arr1.push(emptyObj)
        arr2.push(emptyOut)
      })
      infoList.forEach((item) => {
        arr1.forEach((item1) => {
          if (item.germchitSpecies === item1.name) {
            item1.value += item.germchitNumber
          }
        })
  
      })
      this.nameList = arr;
      this.valueList = arr1;
      this.chartEvent1();
    },
    chartEvent1() {
      let chart1 = this.$echarts.init(document.querySelector(".chart1"));
      console.log(chart1);
      let option = {
        title: {
          text: "种苗进货量",
          subtext: "比例图",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: myVue.nameList,
        },
        series: [
          {
            name: "种苗进货量",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],

            label: {
              position: "inner",
            },
            labelLine: {
              show: false,
            },
            data: myVue.valueList,
          },
          {
            name: "种苗进货量",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#eee",
              borderColor: "#aaa",
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: "#999",
                  lineHeight: 16,
                  align: "center",
                },
               
                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0,
                },
                b: {
                  fontSize: 13,
                  lineHeight: 33,
                },
                per: {
                  color: "#eee",
                  backgroundColor: "#334455",
                  padding: [2, 4],
                  borderRadius: 2,
                },
              },
            },
            data: myVue.valueList,
          },
        ],
      };
      chart1.setOption(option);
    },
  },
};
</script>

<style>
.chart1 {
  width: 52%;
  height: 376px;
}
.chart2 {
  width: 45%;
  height: 376px;
}
</style>