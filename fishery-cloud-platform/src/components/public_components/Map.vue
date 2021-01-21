<!-- 
 * @FileDescription: 
 1.当组件作为 展示基地的地图位置 使用时，需要传入
 地图类型：map-name:"base"
 基地的经纬度：center-point:{lat:纬度(Float),lng:经度(Float)}

 2.当组件作为 展示物流发货地和目的地 使用时，需要传入
 地图类型：map-name:"logistics"
 发货地的经纬度：start-point:{lat:纬度(Float),lng:经度(Float)}
 目的地的经纬度：end-point:{lat:纬度(Float),lng:经度(Float)}
 * @Author: 吴泽鹏
 * @Date: 2021/1/20 0:00
 * @LastEditors: 吴泽鹏
 * @LastEditTime: 2021/1/20 15:09
-->
<template>
  <!--   定义地图显示容器   -->
  <el-card id="mapCard">
    <div id="mapContainer" style="width: 100%; height: 500px"></div>
  </el-card>
</template>

<script>
export default {
  name: "Map",
  props: {
    // 地图中心点坐标
    centerPoint: {
      type: Object,
      default() {
        return {
          lat: 23.123,
          lng: 113.134,
        };
      },
      validator(obj) {
        return obj.lat && obj.lng;
      },
    },

    // 物流出发地
    startPoint: {
      type: Object,
      default() {
        return {
          lat: 39.954104,
          lng: 116.357503,
        };
      },
      validator(obj) {
        return obj.lat && obj.lng;
      },
    },

    // 物流目的地
    endPoint: {
      type: Object,
      default() {
        return {
          lat: 39.994104,
          lng: 116.287503,
        };
      },
      validator(obj) {
        return obj.lat && obj.lng;
      },
    },
    
    // 控制显示地图的类型
    /**
     * 物流：logistics
     * 基地：base
     * 订单：order
     */
    mapName: {
      type: String,
      default: "base",
      required: true,
      validator(str) {
        return ["logistics", "base", "order"].includes(str);
      },
    },
  },
  methods: {
    // 动态引入腾讯地图
    // key = 4YUBZ-GEPK4-6URUL-DV5B4-Q3IWE-EZBCJ
    loadScript(key) {
      // console.log("key: ", key);
      return new Promise((resolve) => {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://map.qq.com/api/gljs?v=1.exp&key=${key}&callback=init`;
        document.body.appendChild(script);
        window.init = function () {
          resolve(TMap);
        };
      });
    },
    //设置自适应显示marker
    showMarker(obj) {
      const { markerArr, map } = obj;
      var bounds = new TMap.LatLngBounds();
      //判断标注点是否在范围内
      markerArr.forEach(function (item) {
        //若坐标点不在范围内，扩大bounds范围
        if (bounds.isEmpty() || !bounds.contains(item.position)) {
          bounds.extend(item.position);
        }
      });
      //设置地图可视范围
      map.fitBounds(bounds, {
        padding: 100, // 自适应边距
      });
    },
    //初始化基地地图
    async initBaseMap() {
      await this.$nextTick();
      //定义地图中心点坐标
      const center = new TMap.LatLng(
        this.centerPoint.lat,
        this.centerPoint.lng
      );
      //定义map变量，调用 TMap.Map() 构造函数创建地图
      let map = new TMap.Map(document.getElementById("mapContainer"), {
        center: center, //设置地图中心点坐标
      });
      // 创建中心点的标记
      const markerArr = [
        {
          id: "1", //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
          styleId: "myStyle", //指定样式id
          position: new TMap.LatLng(this.centerPoint.lat, this.centerPoint.lng), //点标记坐标位置
          properties: {
            //自定义属性
            title: "中心点",
          },
        },
      ];
      let markerLayer = new TMap.MultiMarker({
        map: map, //指定地图容器
        //样式定义
        styles: {
          //创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
          myStyle: new TMap.MarkerStyle({
            width: 25, // 点标记样式宽度（像素）
            height: 35, // 点标记样式高度（像素）
            src:
              "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png", //图片路径
            // src: "../../assets/markerDefault.png", //图片路径
            //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
            anchor: { x: 16, y: 32 },
          }),
        },
        //点标记数据数组
        geometries: markerArr,
      });
      // 创建中心点的信息窗口
      let infoCenter = new TMap.LatLng(
        this.centerPoint.lat,
        this.centerPoint.lng
      );
      console.log("infoCenter: ", infoCenter);
      //创建InfoWindow实例，并进行初始化
      let centerWindow = new TMap.InfoWindow({
        content: "infoCenter", //信息窗口内容
        position: infoCenter, //显示信息窗口的坐标
        map: map,
        offset: { x: -3, y: -35 }, //向上偏移35像素坐标，向左偏移3像素坐标
      });
      centerWindow.open();
    },
    //初始化物流地图
    async initLogisticsMap() {
      await this.$nextTick();
      //定义map变量，调用 TMap.Map() 构造函数创建地图
      let map = new TMap.Map(document.getElementById("mapContainer"), {});
      //创建并初始化出发点，目的地
      const markerArr = [
        {
          id: "1", //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
          styleId: "myStyle", //指定样式id
          position: new TMap.LatLng(this.startPoint.lat, this.startPoint.lng), //点标记坐标位置
          properties: {
            //自定义属性
            title: "出发点",
          },
        },
        {
          //第二个点标记
          id: "2",
          styleId: "myStyle",
          position: new TMap.LatLng(this.endPoint.lat, this.endPoint.lng),
          properties: {
            title: "目的地",
          },
        },
      ];
      let markerLayer = new TMap.MultiMarker({
        map: map, //指定地图容器
        //样式定义
        styles: {
          //创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
          myStyle: new TMap.MarkerStyle({
            width: 25, // 点标记样式宽度（像素）
            height: 35, // 点标记样式高度（像素）
            src:
              "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png", //图片路径
            // src: "../../assets/markerDefault.png", //图片路径
            //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
            anchor: { x: 16, y: 32 },
          }),
        },
        //点标记数据数组
        geometries: markerArr,
      });
      //自适应标记点显示出来
      this.showMarker({ markerArr, map });
      // 创建出发点的信息窗口
      let infoStart = new TMap.LatLng(this.startPoint.lat, this.startPoint.lng);
      let startWindow = new TMap.InfoWindow({
        content: "infoStart", //信息窗口内容
        position: infoStart, //显示信息窗口的坐标
        map: map,
        offset: { x: -3, y: -35 }, //向上偏移35像素坐标，向左偏移3像素坐标
      });
      startWindow.open();
      // 创建目的地的信息窗口
      let infoEnd = new TMap.LatLng(this.endPoint.lat, this.endPoint.lng);
      let endWindow = new TMap.InfoWindow({
        content: "infoEnd", //信息窗口内容
        position: infoEnd, //显示信息窗口的坐标
        map: map,
        offset: { x: -3, y: -35 }, //向上偏移35像素坐标，向左偏移3像素坐标
      });
      endWindow.open();
    },
    // 初始化订单地图
    async initOrderMap() {
      await this.$nextTick();
      
    },
  },
  created() {
    this.loadScript("4YUBZ-GEPK4-6URUL-DV5B4-Q3IWE-EZBCJ").then(() => {
      // console.log('TMap: ', TMap);
      switch (this.mapName) {
        case "logistics":
          this.initLogisticsMap();
          break;
        case "base":
          this.initBaseMap();
          break;
        case "order":
          this.initOrderMap();
          break;
      }
    });
  },
};
</script>
<style lang="less" scoped>
#mapCard {
  #mapContainer {
    border: 1px solid #ebeef5;
    border-radius: 4px;
  }
}
</style>
