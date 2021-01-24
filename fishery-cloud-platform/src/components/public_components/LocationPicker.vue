<!-- 
 * @FileDescription: 
不推荐使用该组件，这是腾讯地图的自带的地图选点组件
由于不是企业开发者，并发配额不够，导致报错
因此先暂时作废，自己做一个MyLocationPicker
 * @Author: 吴泽鹏
 * @Date: 2021/1/23 23:43
 * @LastEditors: 
 * @LastEditTime: 
-->
<template lang="">
    <div>
        <iframe id="mapPage" :width="width" :height="height" frameborder=0 :src="src"></iframe>
    </div>
</template>
<script>
export default {
  data() {
    return {
      /**
       * 	该参数代表该组件的两种不同的调用方法。
       * 0：表示该组件是以页面跳转的方式调用的，此时需要加上backurl参数，backurl参数表示用户点击选择的位置点后的回跳地址。
       * 1：表示该组件是以iframe内嵌页面的形式调用的。
       * 示例1，type=0&backurl=XXX
       * 示例2，type=1
       */
      type: 1,
      /**
       * 0：不显示搜索区域
       * 1：显示搜索区域（缺省值）
       */
      search: 1,
      //   iframe链接
      src: "",
      //   开发密钥(key)
      key: "4YUBZ-GEPK4-6URUL-DV5B4-Q3IWE-EZBCJ",
      //   调用来源，一般为您的应用名称，为了保障对您的服务，请务必填写！
      referer: "fishery-cloud-platform",
      //   iframe宽度
      width: "100%",
      //   iframe高度
      height: "800px",
      //   地图区域的缩放级别，取值范围是1-18，默认值是15
      zoom: 15,
      //   周边检索的半径，默认值是在1000米范围内检索，取值范围是1000-5000
      radius: 2000,
      // 在指定位置附近进行位置选择,coord用英文逗号分隔，纬度在前，经度在后
      coord: "40.022964,116.319723",
      /**
       * 0：地图区域不可拖动
       * 1：地图区域可拖动（缺省值）
       */
      mapdraggable: 0,
      //   显示周边检索的结果数
      total: 10,
    };
  },
  methods: {
      postDataToParent(loc){
          console.log('loc: ', loc);
      }
  },
  created() {
    const vm = this;
    window.addEventListener(
      "message",
      function (event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data;
        if (loc && loc.module == "locationPicker") {
          //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          vm.postDataToParent(loc);
        }
      },
      false
    );
    this.src = `https://apis.map.qq.com/tools/locpicker?
    search=${this.search}&
    type=${this.type}&
    key=${this.key}&
    mapdraggable=${this.mapdraggable}&
    referer=${this.referer}`
  },
};
</script>