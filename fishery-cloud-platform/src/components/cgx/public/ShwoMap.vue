<template>
<el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="DialogClosed"
  >
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
  :centerPoint="centerPoint"
  :path="path"
  >
  </Map>
    </div>
</el-dialog>
</template>
<script>
import Map from "../../public_components/Map"
export default {
    components: {
          Map,
      },
      props:{
          dialogVisible:{
            type:Boolean
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
            reverse:false,
            centerPoint:{},
            mapname:"",
            activities:[{
            content: '开始发货'}],
            path:[],
        }
    },
    methods:{
      //关闭前清空
      setnull(){
        this.centerPoint = {}
      },
      //关闭对话框
      DialogClosed(){
      // 通知父组件的dialogVisible变为false
      this.$emit("notifyParent");
      this.setnull()
      },
        // 展示物流信息的对话框
    async getLogisticsById() {
      // 调用根据ID查询
     const { data: res } = await this.$managementOrder.get(`${this.id}`);
      if (res.statusCode !== 20000) {
         this.elMessage.info("查询该物流信息失败！！");
      }
      console.log("获取到的物流信息",res.data)
    //   this.form = res.data || {};
    //   console.log("物流信息的form: ", this.form);
      let a={
        lat:"",
        lng:"",
        content:""
      }
      a.lat=res.data.addressLatitude
      a.lng=res.data.addressLongitude
      a.content = "商品当前位置"
      this.centerPoint=a
      console.log("111111: ", this.centerPoint);
    },

    // 展示物流信息的对话框
    async getLogisticsById2() {
      // 调用根据ID查询
     const {data : res} = await this.$logistics.get(`path/${this.id}`);
      console.log("获取到的物流位置信息-->",res.data)
      if(res.statusCode != 20000){
        return this.$message.error("获取物流位置列表失败！");
      }
      for(let i=0;i<res.data.length;i++){
        let a={
        lat:"",
        lng:"",
        content:"",
      }
      a.lat = res.data[i].logisticsPathStation.logisticsStationLatitude
      a.lng = res.data[i].logisticsPathStation.logisticsStationLongitude
      a.content = res.data[i].logisticsPathStation.logisticsStationAddress
      this.path.push(a);
      let b = {
        content:"",
        timestamp:""
      }
      b.content = res.data[i].logisticsPathStation.logisticsStationAddress
      b.timestamp = res.data[i].logisticsPathArrivalTime
      this.activities.push(b);
      }
      // if(res.logisticsOrderStatus==1){
      //   let c = {
      //     content:""
      //   }
      //   c.content = "货物已送达",
      // this.activities.push(c)
      // }
    },
    },
    watch:{
        id(id){
             if(this.title=="订单出发点"){
               this.getLogisticsById()
               this.mapname = "base"
             }
             if(this.title=="物流运输"){
              this.getLogisticsById2()
               this.mapname = "logistics"
             }

        }
    }
    
}
</script>