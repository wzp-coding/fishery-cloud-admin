<template>
<el-dialog
      :title="ordertitle"
      :visible.sync="createdialogVisible"
      width="45%"
      @close="close"
    >
    <el-form 
    ref="form" 
    :model="orderobject" 
    label-width="80px">
   
     <el-form-item label="客户类型">
    <el-select v-model="orderobject.targetType" placeholder="请选择客户类型">
      <el-option label="1.个人" value=1></el-option>
      <el-option label="2.企业" value=2></el-option>
      <el-option label="3.加工厂" value=3></el-option>
      <el-option label="4.冷库" value=4></el-option>
    </el-select>
   </el-form-item>
   <el-form-item label="客户名" v-if="orderobject.targetType<=2">
    <el-input clearable v-model="orderobject.targetName " style="width:35ex"></el-input>
  </el-form-item>
  <el-form-item label="加工厂/冷库编号" v-if="orderobject.type>2||orderobject.type=='加工厂'||orderobject.targetType=='冷库'">
    <el-input v-model="orderobject.targetId "></el-input>
  </el-form-item>
    <el-form-item label="加工厂/冷库名字" v-if="orderobject.type>2||orderobject.type=='加工厂'||orderobject.targetType=='冷库'">
    <el-input v-model="orderobject.targetName "></el-input>
  </el-form-item>
  <el-form-item label="联系电话 ">
    <el-input v-model="orderobject.phoneNumber "></el-input>
  </el-form-item>
  <el-form-item label="联系人">
    <el-input v-model="orderobject.baseId"></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="orderobject.amount "></el-input>
  </el-form-item>
  <el-form-item label="收货地址">
    <el-select v-model="orderobject.receiveAddress" placeholder="请选择收货地址" style="width:50ex"  >
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
    <el-button type="primary" @click="submitorder" style="margin:20px 0 0 0">立即创建</el-button>
    <el-button @click="close">取消</el-button>
   </el-form-item>
    
  </el-form>

</el-dialog>
</template>
<script>
import Map from "../../../public_components/MyLocationPicker"
  export default {
      components:{
          Map,
      },
      props:{
          createdialogVisible:{
              type:Boolean
          },
          ordertitle:{
            type:String
          },
          orderid:{
            type:String
          },
          look:{
            type:Boolean
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
        orderobject: {
          // 接受坐标
          addressLatitude:"",
          addressLongitude:"",
          // 接收地址
          receiveAddress:"",
          //   产品数量
          amount:0,
          baseId :"",
          money:0,
          weight:0,
          phoneNumber :"",
          productId:"",
          productName:"",
        //   用户id
          targetId :"",
        //   用户名字
          targetName:"",
        //   类型
          targetType:{},
        },
        // 控制顾客表单
        CustomerVisible:false,

      }
    },
    methods: {
      
      // 关闭时设置为空
      setcloseorderobject(){
        this.orderobject.targetName="";
        this.orderobject.baseId="";
        this.orderobject.phoneNumber="";
        this.orderobject.targetId="";
        this.orderobject.targetType="";
        this.orderobject.receiveAddress="";
        this.orderobject.addressLatitude="";
        this.orderobject.amount="";
        this.orderobject.money="";
        this.orderobject.productId="";
        this.orderobject.productName="";
        this.orderobject.addressLongitude="";
        },
       // 设置坐标
        setcoordinates(location){
            this.location=location;
            this.orderobject.addressLatitude=location.lat
            this.orderobject.addressLongitude=location.lng
            console.log("location-->",this.location)
        },
        // 关闭表单
        close(){
            this.$emit("createnotifyParent");
            this.setcloseorderobject();
        },
        // 设置地图返回的定点位置
        setAddress(address){
            console.log("address-->",address)
                this.orderobject.receiveAddress=address
        },
        // 设置地图返回的位置数组
        setpoi(poi){
            console.log("pio-->",poi)
            this.addressArray=poi;
            this.orderobject.addressLatitude=poi[0].location.lat
            this.orderobject.addressLongitude=poi[0].location.lng
        },

    },
  }
</script>