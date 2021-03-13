<template>
    <div>
  <el-timeline :reverse="reverse">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp">
      {{activity.content}}
    </el-timeline-item>
  </el-timeline>
  <Map
  :map-name="mapname"
  :start-point="startPoint"
  :end-point="endPoint"
  >
  </Map>
    </div>
</template>
<script>
import Map from "../../public_components/Map"
export default {
    components: {
          Map,
      },
      props:{
          mapname:{
              type:String
          },
          id:{
              type:String
          },
          title:{
              type:String
          }
      },
    data(){
        return{
            startPoint:{},
            endPoint:{},
            poi:{},
        }
    },
    methods:{
        // 展示物流信息的对话框
    async getLogisticsById(id) {
      // 调用根据ID查询
     const { data: res } = await this.$managementOrder.get(`${id}`);
      if (res.statusCode !== 20000) {
         this.elMessage.info("查询该物流信息失败！！");
      }
      console.log(res)
    //   this.form = res.data || {};
    //   console.log("物流信息的form: ", this.form);
      let a={
        lat:"",
        lng:"",
      }
      a.lat=res.data.addressLatitude
      a.lng=res.data.addressLongitude
      this.poi=a
      console.log("111111: ", this.pio);
    },

    // 展示物流信息的对话框
    async getLogisticsById2(id) {
      // 调用根据ID查询
     const {data : res} = await this.$logistics.get(`path/${id}`);
      console.log("获取到的物流位置信息-->",res.data)
      if(res.statusCode != 20000){
        return this.$message.error("获取物流位置列表失败！");
      }
      let a={
        lat:"",
        lng:"",
      }
       a.lat = res.data[res.data.length-1].logisticsPathStation.logisticsStationLatitude
       a.lng = res.data[res.data.length-1].logisticsPathStation.logisticsStationLongitude
      this.pio=a
    },
    },
    watch:{
        id(id){
             if(this.title=="订单出发点"){

             }
             if(this.title=="物流运输"){

             }

        }
    }
    
}
</script>