<template>
<el-dialog
      title="修改物流信息"
      :visible.sync="createdialogVisible"
      width="45%"
      @close="close"
    >
    <el-form 
    ref="form" 
    :model="logisticsobject" 
    label-width="80px">
   
     <el-form-item label="基地编号">
    <el-input v-model="logisticsobject.baseId" ></el-input>
   </el-form-item>
    <el-form-item label="产品编号" >
    <el-input clearable v-model="logisticsobject.productId " placeholder="请输入产品编号" style="width:35ex"></el-input>
   </el-form-item>
   <el-form-item label="订单创建者" >
    <el-input clearable v-model="logisticsobject.logisticsOrderCreateBy "  placeholder="请输入产品编号" style="width:35ex"></el-input>
   </el-form-item>
   <el-form-item label="起点站" >
    <el-input clearable v-model="logisticsobject.logisticsStartStation.logisticsStationAddress " disabled  placeholder="起点站" style="width:35ex"></el-input>
   </el-form-item>
   <el-form-item label="终点站" >
    <el-input clearable v-model="logisticsobject.logisticsArrivalStation.logisticsStationAddress " disabled placeholder="终点站" style="width:35ex"></el-input>
   </el-form-item>

  <el-form-item style="right">
    <el-button type="primary" @click="SubmitModify" style="margin:20px 0 0 0" >确认修改</el-button>
    <el-button @click="close">取消</el-button>
   </el-form-item>
  </el-form>
  
</el-dialog>
</template>
<script>
import StationForm from "./StationForm"
  export default {
      components:{
       StationForm
      },
      props:{
          createdialogVisible:{
              type:Boolean
          },
          id:{
            type:String
          },
          look:{
            type:Boolean
          },
      },
    data() {
      return {
          

          //修改对象
          logisticsobject:{
            baseId: "",
            gmtCreate: "",
            gmtModified: "",
            id: "",
            logisticsArrivalStation: {},
            logisticsArrivalStationId: "",
            logisticsOrderCreateBy: "",
            logisticsOrderStatus: "",
            logisticsStartStation: {},
            logisticsStartStationId: "",
            productId: "",
          },
      }
    },
    methods: {
        
        //设置传回来的站点
        setStation(station){
        this.logisticsobject.logisticsArrivalStation = station
        },
    // 关闭时设置为空
      setcloseorderobject(){
            this.logisticsobject.baseId=this.$store.state.userInfo.baseId
            this.logisticsobject.gmtCreate= ""
            this.logisticsobject.gmtModified= ""
            this.logisticsobject.id= ""
            this.logisticsobject.logisticsArrivalStation={}
            this.logisticsobject.logisticsArrivalStationId= ""
            this.logisticsobject.logisticsOrderCreateBy= ""
            this.logisticsobject.logisticsOrderStatus= ""
            this.logisticsobject.logisticsStartStation={},
            this.logisticsobject.logisticsStartStationId= ""
            this.logisticsobject.productId= "";
      },
    // 关闭表单
        close(){
            this.$emit("createnotifyParent");
            this.setcloseorderobject();
        },
    //获取物流信息
     async getlogisticsList(){
      const {data : res} = await this.$logistics.get(
        `order/${this.id}`
      );
      console.log("获取物流信息-->",res.data)
       if (res.statusCode !== 20000) {
        return this.$message.error("获取物流信息失败！");
      }
      this.logisticsobject = res.data
    },
        //提交修改订单
        async SubmitModify(){
          console.log('即将修改的物流信息--> ', this.logisticsobject);
          const { data: res } = await this.$logistics.put("order/",this.logisticsobject);
          console.log("handleSubmit: ", res);
          if (res.statusCode === 20000) {
            this.elMessage.success(res.message);
          } else {
            this.elMessage.error(res.message);
          }
          this.close();
        },
    },
        created(){
          this.logisticsobject.baseId=this.$store.state.userInfo.baseId
        },
        watch:{
            look(){
                this.getlogisticsList();
            }
        }
  }
</script>