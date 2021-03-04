<template>
<div>
    <el-dialog
      :title="stationtitle"
      :visible.sync="stationcard"
      width="45%"
      @close="close"
    >
    <el-form 
    ref="form" 
    :model="stationobject" 
    label-width="80px">
   
     <el-form-item label="站点类型">
    <el-select v-model="stationobject.logisticsStationType " placeholder="请选择站点类型">
         <el-option label="1.养殖基地" :value="0"></el-option>
      <el-option label="2.个人" :value="1"></el-option>
      <el-option label="3.企业" :value="2"></el-option>
      <el-option label="4.加工厂" :value="3"></el-option>
      <el-option label="5.冷库" :value="4"></el-option>
    </el-select>
   </el-form-item>
   <el-form-item label="基地编号">
    <el-input clearable v-model="stationobject.baseId  " style="width:35ex"></el-input>
  </el-form-item>
  <el-form-item label="联系电话">
    <el-input v-model="stationobject.phoneNumber"></el-input>
  </el-form-item>
  <el-form-item label="站点地址">
    <el-select v-model="stationobject.logisticsStationAddress " placeholder="请选择站点地址" style="width:50ex"  >
      <el-option v-for="(item,index) in addressArray" 
                      :key="item+index" :label="item.address+item.title"
                      :value="item.address+item.title "
                      @click.native="setcoordinates(item.location)">
            </el-option>
    </el-select> 
    </el-form-item>
    <Map
    :selectedLocation="location"
    @getCenterAddress="setAddress"
    @getAroundPoi="setpoi"
    >
    </Map>
    
  <el-form-item style="right">
    <el-button type="primary" @click="submitorder" style="margin:20px 0 0 0" v-if="this.stationtitle==='添加站点'">立即创建</el-button>
    <el-button type="primary" @click="submitorder" style="margin:20px 0 0 0" v-if="this.stationtitle==='修改站点信息'">确认修改</el-button>
    <el-button @click="close">取消</el-button>
   </el-form-item>
    
  </el-form>

</el-dialog>
</div>
</template>
<script>
import Map from "../../public_components/MyLocationPicker"
  export default {
      components:{
          Map,
      },
      props:{
          stationcard:{
              type:Boolean,
              
          },
          stationtitle:{
            type:String,
          },
          stationData:{
            type:Object,
          },
          look2:{
            type:Boolean,
          }
          
      },
    data() {
      return {
        // 地图传来的地址数组
            addressArray:[],
        // 传入地图的中心坐标
            location:{
              lat:"",
              lng:"",
            },
      // --------列表数据-------
        stationobject: {
          // 接受坐标
          logisticsStationLatitude:"",
          logisticsStationLongitude:"",
          // 接收地址
          logisticsStationAddress:"",
          baseId :"",
          phoneNumber :"",
        //   类型
          logisticsStationType:1,
        },
      }
    },
    methods: {
      
      // 关闭时设置为空
      setclose(){
        this.stationobject.logisticsStationAddress="";
        this.stationobject.logisticsStationLatitude="";
        this.stationobject.logisticsStationLongitude="";
        this.stationobject.baseId=this.$store.state.userInfo.baseId
        this.stationobject.phoneNumber="";
        this.stationobject.logisticsStationType=null;
       
        },
       // 设置坐标
        setcoordinates(location){
            this.location=location;
            this.stationobject.logisticsStationLatitude=location.lat
            this.stationobject.logisticsStationLongitude=location.lng
            console.log("customerlocation-->",this.location)
        },
        // 关闭表单
        close(){
            this.$emit("createnotifyParent2");
            this.setclose();
        },
        // 设置地图返回的定点位置
        setAddress(address){
            console.log("address2-->",address)
                this.stationobject.logisticsStationAddress=address
        },
        // 设置地图返回的位置数组并把坐标设置好
        setpoi(poi){
            console.log("pio-->",poi)
            this.addressArray=poi;
            this.stationobject.logisticsStationLatitude=poi[0].location.lat
            this.stationobject.logisticsStationLongitude=poi[0].location.lng
        },
        //提交站点信息
        async customerinfo(){
        console.log('即将提交的站点--> ', this.customerobject);
          const {data:res} = await this.$logistics.post("station/",this.stationobject)
          console.log('res: ', res);
          if (res.statusCode === 20000) {
                this.elMessage.success(res.message);
              } else {
                this.elMessage.error(res.message);
              }
              this.close();
        },
        //提交修改的站点信息
        async Editcustomerinfo(){
        console.log('即将提交的站点--> ', this.stationobject);
          const {data:res} = await this.$logistics.put("station/",this.stationobject)
          console.log('res: ', res);
          if (res.statusCode === 20000) {
                this.elMessage.success(res.message);
              } else {
                this.elMessage.error(res.message);
              }
              this.close();
        },
        //提交订单（修改或创建）
        submitorder(){
          if(this.stationtitle=="修改站点信息"){
              this.Editcustomerinfo();
          }
          if(this.stationtitle=="添加站点"){
              this.customerinfo();
          }
        },
        //修改表单
        Modifyorder(){
          this.stationobject=this.stationData;
          let a={
          lat:"",
          lng:"",
        };
        a.lat=this.stationData.logisticsStationLatitude;
        a.lng=this.stationData.logisticsStationLongitude;
        this.location=a;
        },
        //判断为创建表单还是修改
        judge(){
        if(this.stationtitle=="修改站点信息"){
            console.log(111111111)
          this.Modifyorder();
          console.log("customerdata2222-->",this.stationData)

        }
        },
    },
    watch:{
          look2:function(){
              console.log("77777")
            this.judge();
            
          }
        },
        created(){
              this.stationobject.baseId=this.$store.state.userInfo.baseId
          }
  }
  </script>