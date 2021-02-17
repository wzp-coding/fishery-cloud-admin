<template>
<el-dialog
      title="创建订单"
      :visible.sync="createdialogVisible"
      width="45%"
      @close="close"
    >
    <el-form 
    ref="form" 
    :model="orderobject" 
    label-width="80px">
   
     <el-form-item label="客户类型">
    <el-select v-model="orderobject.type" placeholder="请选择客户类型">
      <el-option label="个人" value="个人"></el-option>
      <el-option label="企业" value="企业"></el-option>
      <el-option label="加工厂" value="加工厂"></el-option>
      <el-option label="冷库" value="冷库"></el-option>
    </el-select>
   </el-form-item>
   <el-form-item label="客户名" v-if="orderobject.type=='个人'||orderobject.type=='企业'||orderobject.type<=2">
    <el-input clearable v-model="orderobject.targetName " style="width:35ex"></el-input>
    <el-button type="primary" plain @click.prevent="CustomerVisible=true" style="margin:0 10px;">从已有客户表中选择</el-button>
  </el-form-item>
  <el-form-item label="加工厂/冷库编号" v-if="orderobject.type>2||orderobject.type=='加工厂'||orderobject.type=='冷库'">
    <el-input v-model="orderobject.targetId "></el-input>
  </el-form-item>
    <el-form-item label="加工厂/冷库名字" v-if="orderobject.type>2||orderobject.type=='加工厂'||orderobject.type=='冷库'">
    <el-input v-model="orderobject.targetName "></el-input>
  </el-form-item>
  
  <el-form-item label="联系电话 ">
    <el-input v-model="orderobject.phoneNumber "></el-input>
  </el-form-item>
  <el-form-item label="基地编号 ">
    <el-input v-model="orderobject.baseId"></el-input>
  </el-form-item>
  <el-form-item label="数量">
    <el-input v-model="orderobject.amount "></el-input>
  </el-form-item>
  <el-form-item label="金额(万元)">
    <el-input v-model="orderobject.money "></el-input>
  </el-form-item>
  <el-form-item label="产品名">
    <el-input v-model="orderobject.productName "></el-input>
  </el-form-item>
  <el-form-item label="产品编号">
    <el-input v-model="orderobject.productId "></el-input>
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
    <el-button type="primary" @click="handleSubmit" style="margin:20px 0 0 0">立即创建</el-button>
    <el-button @click="close">取消</el-button>
   </el-form-item>
    
  </el-form>

  <Customerfrom
  :CustomerVisible="CustomerVisible"
  @CustomerClose="CustomerClose"
  @setCustomer="setCustomer"
  >
  </Customerfrom>
</el-dialog>
</template>
<script>
import Map from "../../../public_components/MyLocationPicker"
import Customerfrom from './Customerfrom.vue'
  export default {
      components:{
          Map,
          Customerfrom,
      },
      props:{
          createdialogVisible:{
              type:Boolean
          },
      },
    data() {
      return {
        //   给地图传参数
        options:{
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
        },
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
          type:"",
        },
        // 控制顾客表单
        CustomerVisible:false,

      }
    },
    methods: {
      // 提交表单
      async handleSubmit(){
      console.log('form: ', this.orderobject);
      // let {phoneCode} = form; 
      // const url = `/user/retrievePassword/${OrderVo }`
      const {data:res} = await this.$managementOrder.post(this.orderobject)
      console.log('res: ', res);
    },
      // 关闭时设置为空
      setcloseorderobject(){
        this.orderobject.targetName="";
        this.orderobject.baseId="";
        this.orderobject.phoneNumber="";
        this.orderobject.targetId="";
        this.orderobject.type="";
        this.orderobject.receiveAddress="";
        this.orderobject.addressLatitude="";
        this.orderobject.addressLongitude="";
        },
      // 设置子组件传来的顾客信息
      setCustomer(row){
        this.orderobject.targetName=row.customerName;
        this.orderobject.baseId=row.baseId;
        this.orderobject.phoneNumber=row.phoneNumber;
        this.orderobject.targetId=row.id;
        this.orderobject.type=row.customerType;
        this.orderobject.receiveAddress=row.receiveAddress;
        this.orderobject.addressLatitude=row.addressLatitude;
        this.orderobject.addressLongitude=row.addressLongitude;
        var a={
          lat:"",
          lng:"",
        };
        a.lat=row.addressLatitude;
        a.lng=row.addressLongitude;
        this.location=a;
        // this.location.lat=row.addressLatitude;
        // this.location.lng=row.addressLongitude;
        console.log("location->>",this.location)
      },

        // 设置坐标
        setcoordinates(location){
            this.location=location;
            console.log("location-->",this.location)
        },
        // 提交表单
        onSubmit(){
           this.setcloseorderobject();
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
        },
        // 关闭顾客表单
        CustomerClose(){
          this.CustomerVisible=false;
        },
    }
  }
</script>