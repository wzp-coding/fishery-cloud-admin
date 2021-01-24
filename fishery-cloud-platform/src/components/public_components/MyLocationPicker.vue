<!--
* @FileDescription: 
* @Author: 吴泽鹏
* @Date: 
* @LastEditors: 吴泽鹏
* @LastEditTime: 
-->
<template>
  <!--   定义地图显示容器   -->
  <el-card id="mapCard">
    <div id="mapContainer" style="width: 100%; height: 500px"></div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      // 我个人注册腾讯地图的key
      key: "4YUBZ-GEPK4-6URUL-DV5B4-Q3IWE-EZBCJ",
      // map实例
      map: undefined,
      // 本地地址
      location: JSON.parse(localStorage.getItem("location")),
      // 点标记图层
      markerLayer: undefined,
    };
  },
  props: {
    // 初始的地图中心点(默认为本地地址)
    initPoint: {
      type: Object,
      default() {
        return {
          lat: JSON.parse(localStorage.getItem("location")).lat,
          lng: JSON.parse(localStorage.getItem("location")).lng,
        };
      },
      validator(obj) {
        return obj.lat && obj.lng;
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
    // 创建标记点的图层
    createMarkerLayer(markerArr) {
      this.markerLayer = new TMap.MultiMarker({
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
    // 拖拽地图设置中心点
    handleDragMap() {
      const center = this.map.getCenter();
      this.map.setCenter(center);
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
      // 更新标注点
      this.markerLayer.updateGeometries([centerMarker]);
    },
    // 初始化
    init() {
      //定义地图中心点坐标
      const center = new TMap.LatLng(this.initPoint.lat, this.initPoint.lng);

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

      // 监听地图拖拽事件
      const throttle = this._.throttle(this.handleDragMap, 200);
      this.map.on("drag", throttle);
    },
  },
  created() {
    this.loadScript().then(() => {
      this.init();
    });
  },
};
</script>
<style lang="">
</style>