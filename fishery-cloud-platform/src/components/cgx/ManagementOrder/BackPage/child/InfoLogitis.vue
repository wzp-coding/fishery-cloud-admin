<template>
  <div class="info-logitis">
    <el-timeline>
      <el-timeline-item
        v-for="(route, index) in routes"
        :key="index"
        :timestamp="route.arrivalTime"
      >
        {{ route.content }}
      </el-timeline-item>
    </el-timeline>

    <Map :path="formatPath" mapName="logistics"></Map>
  </div>
</template>
<script>
export default {
  data() {
    return {
      path: [],
    };
  },
  computed: {
    formatPath() {
      let cPath = [];
      this.path.forEach((item) => {
        let {
          logisticsStationLongitude,
          logisticsStationLatitude,
          logisticsStationAddress,
        } = item.logisticsPathStation;
        cPath.push({
          lng: logisticsStationLongitude,
          lat: logisticsStationLatitude,
          content: logisticsStationAddress,
        });
      });
      console.log("cPath: ", cPath);
      return cPath;
    },
    routes(){
      let cRoutes = [{
        content:"已发货",
        arrivalTime:""
      }];
      this.path.forEach(item=>{
        cRoutes.push({
          content:item.logisticsPathStation.logisticsStationAddress,
          arrivalTime:item.logisticsPathArrivalTime
        })
      })
      return cRoutes;
    }
  },
  methods: {
    async getLogisticsPath(id) {
      const { data: res } = await this.$logistics.get(`/path/${id}`);
      console.log("res: ", res);
      if (res.statusCode != 20000) {
        console.error(res.message);
      }
      this.path = res.data;
    },
  },
  created() {
    const { id } = this.$route.query;
    console.log("logisticsId: ", id);
    this.getLogisticsPath(id);
  },
};
</script>
<style lang="less" scoped>
.info-logitis{
  padding: 10px;
  padding-top: 20px;
}
</style>