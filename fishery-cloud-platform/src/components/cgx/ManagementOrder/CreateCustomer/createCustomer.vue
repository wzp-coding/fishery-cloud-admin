<template>
<el-dialog
      :title="customertitle"
      :visible.sync="customercard"
      width="45%"
      @close="close"
    >
    <el-form 
    ref="form" 
    :model="customerobject" 
    label-width="80px">
   
     <el-form-item label="客户类型">
    <el-select v-model="customerobject.customerType" placeholder="请选择客户类型">
      <el-option label="1.个人" value=1></el-option>
      <el-option label="2.企业" value=2></el-option>
      <el-option label="3.加工厂" value=3></el-option>
      <el-option label="4.冷库" value=4></el-option>
    </el-select>
   </el-form-item>
   <el-form-item label="客户名">
    <el-input clearable v-model="customerobject.customerName " style="width:35ex"></el-input>
  </el-form-item>
  <el-form-item label="联系电话 ">
    <el-input v-model="customerobject.phoneNumber "></el-input>
  </el-form-item>
  <el-form-item label="操作人">
    <el-input v-model="customerobject.contactPerson"></el-input>
  </el-form-item>
  <el-form-item label="基地id">
    <el-input v-model="customerobject.baseId"></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="customerobject.email "></el-input>
  </el-form-item>
  <el-form-item label="收货地址">
    <el-select v-model="customerobject.receiveAddress" placeholder="请选择收货地址" style="width:50ex"  >
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
          customercard:{
              type:Boolean
          },
          customertitle:{
            type:String
          },
          customerid:{
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
        customerobject: {
          // 接受坐标
          addressLatitude:"",
          addressLongitude:"",
          // 接收地址
          receiveAddress:"",
          baseId :"",
          phoneNumber :"",
        //   用户名字
          customerName:"",
        //   类型
          customerType:null,
          //操作人
          contactPerson:"",
          email:"",
        },
      }
    },
    methods: {
      
      // 关闭时设置为空
      setclose(){
        this.customerobject.addressLatitude="";
        this.customerobject.addressLongitude="";
        this.customerobject.receiveAddress="";
        this.customerobject.baseId="";
        this.customerobject.phoneNumber="";
        this.customerobject.customerName="";
        this.customerobject.customerType=null;
        this.customerobject.contactPerson="";
        this.customerobject.email="";
        },
       // 设置坐标
        setcoordinates(location){
            this.location=location;
            this.customerobject.addressLatitude=location.lat
            this.customerobject.addressLongitude=location.lng
            console.log("customerlocation-->",this.location)
        },
        // 关闭表单
        close(){
            this.$emit("createnotifyParent");
            this.setclose();
        },
        // 设置地图返回的定点位置
        setAddress(address){
            console.log("address2-->",address)
                this.customerobject.receiveAddress=address
        },
        // 设置地图返回的位置数组并把坐标设置好
        setpoi(poi){
            console.log("pio-->",poi)
            this.addressArray=poi;
            this.customerobject.addressLatitude=poi[0].location.lat
            this.customerobject.addressLongitude=poi[0].location.lng
        },
        //提交顾客信息
        async customerinfo(){
        console.log('即将提交的顾客--> ', this.customerobject);
          const {data:res} = await this.$Customer.post(`${this.customerobject}`)
          console.log('res: ', res);
          if (res.statusCode === 20000) {
                this.elMessage.success(res.message);
              } else {
                this.elMessage.error(res.message);
              }
              this.close();
        },
        //提交顾客信息
        async customerinfo(){
        console.log('即将提交的顾客--> ', this.customerobject);
          const {data:res} = await this.$Customer.post(`${this.customerobject}`)
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
          if(this.customertitle=="修改信息"){
              this.SubmitModify();
          }
          if(this.customertitle=="添加顾客"){
              this.handleSubmit();
          }
        },
        watch:{
          look:function(){
            this.judge();
          }
        },
    },
  }
</script>