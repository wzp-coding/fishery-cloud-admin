<!-- 
 * @FileDescription: 
 1.当组件作为 展示基地的地图位置 使用时，需要传入
 地图类型：map-name:"base"
 基地的经纬度：center-point:{lat:纬度(Float),lng:经度(Float),content:"内容"(String)}

 2.当组件作为 展示物流发货地和目的地 使用时，需要传入
 地图类型：map-name:"logistics"
 发货地的经纬度：start-point:{lat:纬度(Float),lng:经度(Float),content:"内容"(String)}
 目的地的经纬度：end-point:{lat:纬度(Float),lng:经度(Float),content:"内容"(String)}
 * @Author: 吴泽鹏
 * @Date: 2021/1/20 0:00
 * @LastEditors: 吴泽鹏
 * @LastEditTime: 2021/1/24 16:54
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
  data() {
    return {
      // 我个人注册腾讯地图的key
      key: "4YUBZ-GEPK4-6URUL-DV5B4-Q3IWE-EZBCJ",
      // map实例
      map: undefined,
    };
  },
  props: {
    // 地图中心点坐标
    centerPoint: {
      type: Object,
      default() {
        return {
          lat: JSON.parse(localStorage.getItem("location")).lat,
          lng: JSON.parse(localStorage.getItem("location")).lng,
          content: "中心点内容",
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
          content: "出发点内容",
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
          content: "终点内容",
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
     */
    mapName: {
      type: String,
      default: "base",
      required: true,
      validator(str) {
        return ["logistics", "base"].includes(str);
      },
      default() {
        return {
          a: "base",
        };
      },
    },
  },
  methods: {
    // 动态引入腾讯地图
    // key = 4YUBZ-GEPK4-6URUL-DV5B4-Q3IWE-EZBCJ
    loadScript() {
      // console.log("key: ", key);
      return new Promise((resolve) => {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://map.qq.com/api/gljs?v=1.exp&key=${this.key}&callback=init`;
        document.body.appendChild(script);
        window.init = function () {
          resolve(TMap);
        };
      });
    },

    // 创建map实例
    createMap(config = {}) {
      this.map = new TMap.Map(document.getElementById("mapContainer"), config);
    },

    //当有两个或者以上标记点，设置自适应显示marker(标记点)
    showMarker(markerArr) {
      var bounds = new TMap.LatLngBounds();
      //判断标注点是否在范围内
      markerArr.forEach(function (item) {
        //若坐标点不在范围内，扩大bounds范围
        if (bounds.isEmpty() || !bounds.contains(item.position)) {
          bounds.extend(item.position);
        }
      });
      //设置地图可视范围
      this.map.fitBounds(bounds, {
        padding: 100, // 自适应边距
      });
    },

    // 创建标记点的图层
    createMarkerLayer(markerArr) {
      new TMap.MultiMarker({
        map: this.map, //指定地图容器
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
    },

    /**
     * 创建坐标点的信息窗口
     * 参数latlngArr {Array}
     * 每个item {Object}
     * 示例item = {point:new TMap.LatLng(),content:"内容",marker:new }
     */
    createInfoWindow(latlngArr) {
      latlngArr.forEach((item) => {
        //创建InfoWindow实例，并进行初始化
        let window = new TMap.InfoWindow({
          content: item.content, //信息窗口内容
          position: item.point, //显示信息窗口的坐标
          map: this.map,
          offset: { x: -3, y: -35 }, //向上偏移35像素坐标，向左偏移3像素坐标
        });
        window.open();
      });
    },

    // 获取物流地图的路线（不是实际路线，只是为了好看）
    async getLogisticsRouteAndDisplay() {
      let url = "";
      // if (process.env.NODE_ENV === "development") {
        url = "/api/ws/direction/v1/driving/?";
      // } else {
      //   url = "https://apis.map.qq.com/ws/direction/v1/driving/?";
      // }
      // 路线出发点
      url += `from=${this.startPoint.lat},${this.startPoint.lng}`;
      // 路线终点
      url += `&to=${this.endPoint.lat},${this.endPoint.lng}`;
      // 返回格式 和 密钥key
      url += `&output=json&key=${this.key}`;
      const { data: res } = await this.$originAxios.get(url);
      //从结果中取出路线坐标串
      let coors = res.result.routes[0].polyline,
        pl = [];
      //坐标解压（返回的点串坐标，通过前向差分进行压缩，因此需要解压）
      let kr = 1000000;
      for (let i = 2; i < coors.length; i++) {
        coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
      }
      //将解压后的坐标生成LatLng数组
      for (let i = 0; i < coors.length; i += 2) {
        pl.push(new TMap.LatLng(coors[i], coors[i + 1]));
      }

      this.displayPolyline(pl);
    },

    // 创建路线图层
    displayPolyline(pl) {
      //创建 MultiPolyline显示折线
      new TMap.MultiPolyline({
        id: "polyline-layer", //图层唯一标识
        map: this.map, //绘制到目标地图
        //折线样式定义
        styles: {
          style_blue: new TMap.PolylineStyle({
            color: "#3777FF", //线填充色
            width: 6, //折线宽度
            borderWidth: 5, //边线宽度
            borderColor: "#FFF", //边线颜色
            lineCap: "round", //线端头方式
          }),
        },
        //折线数据定义
        geometries: [
          {
            id: "pl_1", //折线唯一标识，删除时使用
            styleId: "style_blue", //绑定样式名
            paths: pl,
          },
        ],
      });
    },

    //初始化基地地图
    async initBaseMap() {
      //定义地图中心点坐标
      const center = new TMap.LatLng(
        this.centerPoint.lat,
        this.centerPoint.lng
      );

      //createMap函数创建地图(并且有地图中心点)
      this.createMap({ center });

      // 创建中心点的标记
      const centerMarker = {
        id: "1", //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
        styleId: "myStyle", //指定样式id
        position: center, //点标记坐标位置
        properties: {
          //自定义属性
          title: "中心点",
        },
      };

      // createMarkerLayer函数创建标记点的层面
      this.createMarkerLayer([centerMarker]);

      // createInfoWindow函数创建信息窗口
      this.createInfoWindow([
        { point: center, content: this.centerPoint.content },
      ]);
    },

    //初始化物流地图
    async initLogisticsMap() {
      let start = new TMap.LatLng(this.startPoint.lat, this.startPoint.lng);
      let end = new TMap.LatLng(this.endPoint.lat, this.endPoint.lng);

      this.createMap();

      //创建出发点，目的地在地图上的标记点
      const markerArr = [
        {
          id: "1", //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
          styleId: "myStyle", //指定样式id
          position: start, //点标记坐标位置
          properties: {
            //自定义属性
            title: "出发点",
          },
        },
        {
          //第二个点标记
          id: "2",
          styleId: "myStyle",
          position: end,
          properties: {
            title: "目的地",
          },
        },
      ];
      this.createMarkerLayer(markerArr);

      //自适应标记点显示出来
      this.showMarker(markerArr);

      this.createInfoWindow([
        {
          point: start,
          content: this.startPoint.content,
        },
        {
          point: end,
          content: this.endPoint.content,
        },
      ]);

      this.getLogisticsRouteAndDisplay();
    },
  },
  created() {
    this.loadScript().then(() => {
      // console.log('TMap: ', TMap);
      switch (this.mapName) {
        case "logistics":
          this.initLogisticsMap();
          break;
        case "base":
          this.initBaseMap();
          break;
      }
    });
  },
  beforeDestroy() {
    this.map.destroy();
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
