<template>
  <div class="info-logitis">
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
          logisticsStationAddress
        } = item.logisticsPathStation;
        cPath.push({
          lng: logisticsStationLongitude,
          lat: logisticsStationLatitude,
          content:logisticsStationAddress
        });
      });
      console.log('cPath: ', cPath);
      return cPath;
    },
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
    console.log("id: ", id);
    this.getLogisticsPath(id);
  },
};
</script>
<style lang="less" scoped>
</style>