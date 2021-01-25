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
      // 中心标记点坐标
      center: new TMap.LatLng(this.initPoint.lat, this.initPoint.lng),
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

    // 设置相关参数
    options: {
      type: Object,
      default() {
        return {
          // 是否返回周边POI(地址)列表
          getPoi: false,
          // 返回短地址 或者 长地址，0返回长地址，1返回短地址
          addressFormat: 0,
          // 半径，取值范围 1-5000（米）
          radius: 5000,
          // 每页条数，取值范围 1-20
          pageSize: 10,
          // 页码，取值范围 1-20(注：分页时pageSize与pageIndex参数需要同时使用)
          pageIndex: 1,
          /**
           * 控制返回场景
           * 1[默认] 以地标+主要的路+近距离POI为主，着力描述当前位置；
           * 2 到家场景：筛选合适收货的POI，并会细化收货地址，精确到楼栋；
           * 3 出行场景：过滤掉车辆不易到达的POI(如一些景区内POI)，增加道路出入口、交叉口、大区域出入口类POI，排序会根据真实API大用户的用户点击自动优化。
           * 4 社交签到场景，针对用户签到的热门 地点进行优先排序。
           * 5 位置共享场景，用户经常用于发送位置、位置分享等场景的热门地点优先排序
           */
          policy: 2,
        };
      },
      validator(obj) {
        return (
          [true, false].includes(obj.getPoi) &&
          [0, 1].includes(obj.addressFormat) &&
          obj.radius > 0 &&
          obj.radius < 5000 &&
          obj.pageSize > 1 &&
          obj.pageSize < 20 &&
          obj.pageIndex > 1 &&
          obj.pageIndex < 20 &&
          obj.policy > 0 &&
          obj.policy < 6
        );
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
      this.center = this.map.getCenter();
      this.map.setCenter(this.center);
      // 创建新的中心点的标记
      const centerMarker = {
        id: "1", //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
        styleId: "myStyle", //指定样式id
        position: this.center, //点标记坐标位置
        properties: {
          //自定义属性
          title: "中心点",
        },
      };
      // 更新标注点
      this.markerLayer.updateGeometries([centerMarker]);
    },
    // 将中心点坐标逆解析成地址
    pointToAddress() {
      console.log(this.center.lat, this.center.lng);
      let url = "/api/ws/geocoder/v1/?";
      url += `location=${this.center.lat},${this.center.lng}`;
      url += `&get_poi=${this.options.getPoi ? 1 : 0}`;
      url += `&poi_options=`;
      if (this.options.addressFormat == 1) {
        // 如果要返回短地址才要传参
        url += `address_format=short`;
      }
      url += `;radius=${this.options.radius}`;
      url += `;page_size=${this.options.pageSize}`;
      url += `;page_index=${this.options.pageIndex}`;
      url += `;policy=${this.options.policy}`;
      url += `&key=${this.key}`;
      console.log('url: ', url);
      this.$originAxios.get(url);
    },

    // 初始化
    init() {
      //定义地图中心点坐标(默认是本地地址)

      //createMap函数创建地图(并且有地图中心点)
      this.createMap({ center: this.center });

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

      // 监听地图拖拽事件(节流函数)
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