<!--
* @FileDescription:
这个组件是用来通过地图来选择地址（例如物流收货地址，发货地址等）

对于initPoint参数
如果是修改地址，那么初始化时必须传入
如果是添加地址，那么可以选择传或者不传（不传则默认是本地地址）

对于options参数（需要获取周边地址的时候传）
可以获取周边地址以及其他一些详细的信息，配置看下面

对于keywords参数（需要搜索关键字的时候传）
可以获取输入提示

对于selectedLocation参数（有下拉框点击的时候传）
更新地图的中心点位置

当地图拖拽时，对于子组件能返回的数据
在父组件中
绑定getCenterAddress事件，可以获取当前地图中心点的详细地址（String格式的中文地址）
绑定getAroundPoi事件，可以获取当前地图中心点的周边地址（Array格式的数据）
绑定getInputTip事件，可以获取输入的提示（Array格式的数据）

建议用法：
简单版：
父组件用一个普通输入框，value绑定一个变量（例如address）
当地图拖拽的时候
通过绑定getCenterAddress事件获取中心点的详细地址
将该地址赋值给address即可
再弄一个输入框，输入门牌号，街道等信息（嫌麻烦的话，这个也可以不用）

复杂版：
父组件用多选框（可搜索）组件，下面放当前这个组件
初始化时传入各种参数

当地图拖拽的时候
获取到中心地址，放到多选框作为value值
获取到周边地址，放到下拉框供用户选择

当用户在多选框输入时，将关键字传给子组件，同时关键字作为多选框的value值
获取到提示信息，放到下拉框供用户选择

点击下拉框的选项时
将该选项的坐标（location）传到子组件，这是为了同步地图的显示
将下拉框选中的地址作为value值

* @Author: 吴泽鹏
* @Date: 2021/1/25 15:00
* @LastEditors: 吴泽鹏
* @LastEditTime: 2021/1/25 18:27
-->
<template>
  <!--   定义地图显示容器   -->
  <el-card id="mapCard">
    <div id="mapContainer" style="width: 100%; height: 500px"></div>
  </el-card>
</template>
<script>
export default {
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
        return obj.lat != undefined && obj.lng != undefined;
      },
    },

    // 设置相关参数
    options: {
      type: Object,
      default() {
        return {
          // 是否返回周边POI(地址)列表
          getPoi: true,
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
          obj.radius <= 5000 &&
          obj.pageSize > 0 &&
          obj.pageSize <= 20 &&
          obj.pageIndex > 0 &&
          obj.pageIndex <= 20 &&
          obj.policy > 0 &&
          obj.policy < 6
        );
      },
    },

    // 搜索关键字
    keywords: {
      type: String,
    },

    // 通过下拉框选中的地址
    selectedLocation: {
      type: Object,
      validator(obj) {
        return obj.lat != undefined && obj.lng != undefined;
      },
    },
  },
  watch: {
    keywords(val) {
      this.debounceSearchInputTip(val);
    },
    selectedLocation(obj) {
      this.center = new TMap.LatLng(obj.lat, obj.lng);
      this.map.setCenter(this.center);
      this.updateMarkerLayer();
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
      // console.log("markerArr: ", JSON.parse(JSON.stringify(markerArr)));
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
      // 设置地图中心点
      this.map.setCenter(this.center);
      // 更新标注点图层
      this.updateMarkerLayer();
      // 解析坐标成地址发送到父组件
      this.pointToAddress();
    },

    // 更新标注点图层
    updateMarkerLayer() {
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

    // 根据关键字搜索提示
    async searchInputTip(keywords) {
      console.log("keywords: ", keywords);
      let url = "";
      // if (process.env.NODE_ENV === "development") {
      url = "/api/ws/place/v1/suggestion/?";
      // } else {
      //   url = "https://apis.map.qq.com/ws/place/v1/suggestion/?";
      // }
      url += `region=${this.city}`;
      url += `&keyword=${keywords}`;
      url += `&key=${this.key}`;
      let { data: res } = await this.$originAxios.get(url);
      // console.log("res: ", res);
      const tips = res.data;
      this.$emit("getInputTip", tips);
    },

    // 将中心点坐标逆解析成地址
    async pointToAddress() {
      let url = "";
      // if (process.env.NODE_ENV === "development") {
      url = "/api/ws/geocoder/v1/?";
      // } else {
      //   url = "https://apis.map.qq.com/ws/geocoder/v1/?";
      // }
      url += `location=${this.center.lat},${this.center.lng}`;
      url += `&get_poi=${this.options.getPoi ? 1 : 0}`;
      url += `&poi_options=`;
      if (this.options.addressFormat == 1) {
        // 如果要返回短地址才要传参
        url += `address_format=short;`;
      }
      url += `radius=${this.options.radius}`;
      url += `;page_size=${this.options.pageSize}`;
      url += `;page_index=${this.options.pageIndex}`;
      url += `;policy=${this.options.policy}`;
      url += `&key=${this.key}`;
      // console.log("url: ", url);
      let { data: res } = await this.$originAxios.get(url);
      // console.log("res: ", res);
      res = res.result;
      const province = res.address_component.province;
      const city = res.address_component.city;
      const detail = res.formatted_addresses.recommend;
      const address = province + city + detail;
      const pois = res.pois;
      this.$emit("getCenterAddress", address,this.center);
      this.$emit("getAroundPoi", pois);
    },

    // 初始化
    init() {
      //定义地图中心点坐标(默认是本地地址)
      this.center = new TMap.LatLng(this.center.lat, this.center.lng);
      //createMap函数创建地图(并且有地图中心点)
      this.createMap({ center: this.center });

      // 创建中心点的标记
      const centerMarker = {
        id: "1", //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
        styleId: "myStyle", //指定样式id
        position: this.center, //点标记坐标位置
        properties: {
          //自定义属性
          title: "中心点",
        },
      };

      // createMarkerLayer函数创建标记点的层面
      this.createMarkerLayer([centerMarker]);

      // 监听地图拖拽事件(节流函数)
      const throttle = this._.throttle(this.handleDragMap, 200);
      this.map.on("tilesloaded", () => {
        this.map.on("drag", throttle);
      });

      this.debounceSearchInputTip = this._.debounce(this.searchInputTip, 500);
    },
  },
  data() {
    return {
      // 我个人注册腾讯地图的key
      key: "4YUBZ-GEPK4-6URUL-DV5B4-Q3IWE-EZBCJ",
      // map实例
      map: undefined,
      // 本地地址
      location: JSON.parse(localStorage.getItem("location")),
      // 当前所在城市
      city: JSON.parse(localStorage.getItem("ad_info")).city,
      // 点标记图层
      markerLayer: undefined,
      // 中心标记点坐标
      center: this.initPoint,
      // 防抖关键字搜索函数
      debounceSearchInputTip: undefined,
    };
  },
  created() {
    this.loadScript().then(() => {
      this.init();
    });
  },
  beforeDestroy() {
    this.map.destroy();
  },
};
</script>