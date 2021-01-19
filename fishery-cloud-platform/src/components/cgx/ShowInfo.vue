<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="DialogClosed"
  >
    <!-- 内容主题区 虾苗信息-->
    <el-form
      v-if="!isLogistics"
      :model="form"
      ref="FormRef"
      label-width="120px"
    >
      <el-form-item label="虾苗批次名称" prop="shrimpBatchName">
        <el-input v-model="form.shrimpBatchName" disabled></el-input>
      </el-form-item>
      <el-form-item label="虾苗品种" prop="shrimpSpecies">
        <el-input v-model="form.shrimpSpecies" disabled></el-input>
      </el-form-item>
      <el-form-item label="虾苗产地" prop="shrimpOrigin">
        <el-input v-model="form.shrimpOrigin" disabled></el-input>
      </el-form-item>
      <el-form-item label="虾苗供应商" prop="shrimpSupplier">
        <el-input v-model="form.shrimpSupplier" disabled></el-input>
      </el-form-item>
      <el-form-item label="放苗时间" prop="seedlingTime">
        <el-date-picker
          v-model="form.seedlingTime"
          type="datetime"
          placeholder="选择日期时间"
          disabled
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="捕捞时间" prop="fishingTime">
        <el-date-picker
          v-model="form.fishingTime"
          type="datetime"
          placeholder="选择日期时间"
          disabled
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="（捕捞）审核人" prop="createBy">
        <el-input v-model="form.createBy" disabled></el-input>
      </el-form-item>
      <el-form-item label="投放尾数/尾" prop="inputNum">
        <el-input v-model="form.inputNum" disabled></el-input>
      </el-form-item>
      <el-form-item label="产量kg" prop="yield">
        <el-input v-model="form.yield" disabled></el-input>
      </el-form-item>
      <el-form-item label="剩余量kg" prop="remain">
        <el-input v-model="form.remain" disabled></el-input>
      </el-form-item>
    </el-form>
    <!-- 内容主题区 物流信息-->
    <div id="map" v-else></div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      // 地图
      // 出发位置
      startPos: "",

      // 抵达位置
      endPos: "",

      // 地图设置
      map: "",

      // 初始点信息窗口
      infoWin1: "",

      // 抵达点信息窗口
      infoWin2: "",

      // 初始点标
      mark1: "",

      // 抵达点标记
      mark2: "",

      // 折线区
      polyline: "",
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    dialogVisible: {
      type: Boolean,
    },
    isLogistics: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
    },
  },
  methods: {
    // 监听修改对话框的关闭事件，关闭时重置
    DialogClosed() {
      // 通知父组件的dialogVisible变为false
      this.$emit("notifyParent");
    },
    // 获取虾苗信息
    async getShrimpById(id) {
      // 调用根据ID查询用户信息接口
      const { data: res } = await this.$http.get("/shrimp/" + id);
      if (res.code !== 20000) {
        return this.$message.error("查询该虾苗信息失败！！");
      }
      this.form = res.data || {};
      console.log("this.form: ", this.form);
    },
    // 展示物流信息的对话框
    async getLogisticsById(id) {
      // 调用根据ID查询
      const { data: res } = await this.$http.get("/logistics/findForQR/" + id);
      if (res.code !== 20000) {
        return this.$message.error("查询该物流信息失败！！");
      }
      // console.log(res)
      this.form = res.data || {};
      console.log("this.form: ", this.form);
      this.init();
    },
    // 地图
    init() {
      var This = this;
      // 经纬度设置
      This.startPos = new qq.maps.LatLng(
        This.form.logisticsStartLatitude,
        This.form.logisticsStartLongitude
      );
      This.endPos = new qq.maps.LatLng(
        This.form.logisticsArrivalLatitude,
        This.form.logisticsArrivalLongitude
      );
      // 开始画地图
      This.map = new qq.maps.Map(document.getElementById("map"), {
        // 地图的中心地理坐标，这里设为西安市。
        center: new qq.maps.LatLng(34.01, 108.41),
        zoom: 4,
      });
      // InfoWindow表示信息窗口
      This.infoWin1 = new qq.maps.InfoWindow({
        map: This.map,
      });
      This.infoWin2 = new qq.maps.InfoWindow({
        map: This.map,
      });
      This.infoWin1.open();
      This.infoWin1.setContent(
        '<div style="width:200px;padding-top:10px;">' +
          "离开地址:" +
          This.form.departureAddr +
          "<br/>离开时间:" +
          This.form.departureTime +
          "</div>"
      );
      This.infoWin1.setPosition(This.startPos);
      This.infoWin2.open();
      This.infoWin2.setContent(
        '<div style="width:200px;padding-top:10px;">' +
          "抵达地址:" +
          This.form.arrivalAddr +
          "<br/>抵达时间:" +
          This.form.arrivalTime +
          "</div>"
      );
      This.infoWin2.setPosition(This.endPos);
      This.mark1 = new qq.maps.Marker({
        position: This.startPos,
        map: This.map,
      });
      This.mark2 = new qq.maps.Marker({
        position: This.endPos,
        map: This.map,
      });
      This.polyline = new qq.maps.Polyline({
        path: [This.startPos, This.endPos],
        strokeColor: "#39bf3e",
        strokeWeight: 4,
        map: This.map,
      });
    },
  },
  watch: {
    //   这里是id变化的时候重新获取信息
    id(id) {
      console.log("id: ", id);
      // 对话框出现才请求数据
      if (this.isLogistics) {
        //   如果是物流信息
        this.getLogisticsById(this.id);
      } else {
        // 否则是对虾信息
        this.getShrimpById(this.id);
      }
    },
  },
};
</script>
<style lang="less">
</style>