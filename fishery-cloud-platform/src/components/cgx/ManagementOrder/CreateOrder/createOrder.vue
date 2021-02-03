<template>
    <el-form ref="form" :model="orderobject" label-width="80px">
  <el-form-item label="基地编号 ">
    <el-input v-model="orderobject.baseId"></el-input>
  </el-form-item>
  <el-form-item label="数量">
    <el-input v-model="orderobject.amount "></el-input>
  </el-form-item>
  <el-form-item label="金额(万元)">
    <el-input v-model="orderobject.money "></el-input>
  </el-form-item>
  <el-form-item label="联系电话 ">
    <el-input v-model="orderobject.phoneNumber "></el-input>
  </el-form-item>
  <el-form-item label="产品编号">
    <el-input v-model="orderobject.productId "></el-input>
  </el-form-item>
  <el-form-item label="产品名">
    <el-input v-model="orderobject.productName "></el-input>
  </el-form-item>
  <el-form-item label="加工厂/冷库编号" v-if="orderobject.type>2">
    <el-input v-model="orderobject.targetId "></el-input>
  </el-form-item>
  <el-form-item label="顾客名字">
    <el-input v-model="orderobject.targetName "></el-input>
  </el-form-item>
  <el-form-item label="客户类型">
    <el-select v-model="orderobject.type" placeholder="请选择客户类型">
      <el-option label="个人" value=1></el-option>
      <el-option label="企业" value=2></el-option>
      <el-option label="加工厂" value=3></el-option>
      <el-option label="冷库" value=4></el-option>
    </el-select>
   </el-form-item>
  <el-form-item label="收货地址">
    <el-select v-model="orderobject.receiveAddress" placeholder="请选择收货地址">
      <el-option label="区域一" value="shanghai" @click="setcoordinates()"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select> 
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</template>
<script>
  export default {
    data() {
      return {
        orderobject: {
            // 地图传来的地址数组
            addressArray:[],
            // 横纵坐标
          addressLatitude :"",
          addressLongitud:"",
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
          type:1,
        }
      }
    },
    methods: {
        // 设置坐标
        setcoordinates(){

        },

      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>