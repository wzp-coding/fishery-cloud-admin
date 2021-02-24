<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="DialogClosed"
  >
    <!-- 内容主题区 虾苗信息-->
    <el-form
      v-if="!isLogistics"
      :model="form"
      ref="FormRef"
      label-width="120px"
    >
    <Form-e 
    :form="form"
    :label="label1"
    :prop="prop1"
    ></Form-e>
     <Form-e
    :form="form"
    :label="label2"
    :prop="prop2"
    ></Form-e>
     <Form-e 
    :form="form"
    :label="label3"
    :prop="prop3"
    ></Form-e>
     <Form-e 
    :form="form"
    :label="label4"
    :prop="prop4"
    ></Form-e>
   
   <Time-e1
   :form="form"
   :label="tiemlabel1"
   :prop="tiemprop1"
   >
   </Time-e1>   
    <Time-e1
   :form="form"
   :label="tiemlabel2"
   :prop="tiemprop2"
   >
   </Time-e1>
      
    <Form-e
    :form="form"
    :label="label5"
    :prop="prop5"
    ></Form-e>
     <Form-e 
    :form="form"
    :label="label6"
    :prop="prop6"
    ></Form-e>
      <Form-e 
    :form="form"
    :label="label7"
    :prop="prop7"
    ></Form-e>
      <Form-e 
    :form="form"
    :label="label8"
    :prop="prop8"
    ></Form-e >
    </el-form>
    <!-- 内容主题区 物流信息 -->
    <Map
    v-if="isLogistics"
    :selectedLocation="pio"
    ></Map>
     <!-- 页脚 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogClosed">取 消</el-button>
      </span>
  </el-dialog>
  
</template>
<script>
import Map from "../../../public_components/MyLocationPicker";
import FormE from "./elFormItem";
import TimeE1 from "./elFormtime";
import FormE2 from "../../Memorandum/Memorandum"
export default {
  components: {
     Map,
     FormE,
     TimeE1,
     FormE2
  },
  data() { 
    return {
      form: {},
      //传入地图坐标
      pio:{
        lat:"",
        lng:"",
      },
      label1:"虾苗批次名称",
      prop1:"shrimpBatchName",
      label2:"虾苗品种",
      prop2:"shrimpSpecies",
      label3:"虾苗产地",
      prop3:"shrimpOrigin",
      label4:"虾苗供应商",
      prop4:"shrimpSupplier",
      label5:"（捕捞）审核人",
      prop5:"createBy",
      label6:"投放尾数/尾",
      prop6:"inputNum",
      label7:"产量kg",
      prop7:"yield",
      label8:"剩余量kg",
      prop8:"remain",
      tiemlabel1:"放苗时间",
      tiemprop1:"seedlingTime",
      tiemlabel2:"捕捞时间",
      tiemprop2:"fishingTime",
    };
  },
  
  props: {
    title: {
      type: String,
      required: true,
    },
    dialogVisible: {
      type: Boolean,
    },
    isLogistics: {
      type: Boolean,
    },
      required: true,
    id: {
      type: String,
    },
  },
  methods: {
    // 监听修改对话框的关闭事件，关闭时重置
    DialogClosed() {
      // 通知父组件的dialogVisible变为false
      this.$emit("notifyParent");
      // this.pio={}
    },
    // 获取虾苗信息
    async getShrimpById(id) {
      // 调用根据ID查询用户信息接口
      const { data: res } = await this.$managementOrder.get('order/'+id);
      console.log("this.$managementOrder--->",this.$managementOrder)
      if (res.statusCode !== 20000) {
        return this.elMessage.info("查询该虾苗信息失败！！");
      }
      this.form = res.data;
      console.log("this.form->> ", this.form);
    },
    // 展示物流信息的对话框
    async getLogisticsById(id) {
      // 调用根据ID查询
     const { data: res } = await this.$managementOrder.get(`${this.id}`);
      if (res.statusCode !== 20000) {
        return this.elMessage.info("查询该物流信息失败！！");
      }
      console.log(res)
      this.form = res.data || {};
      console.log("物流信息的form: ", this.form);
      this.pio.lat=res.data.addressLatitude
      this.pio.lng=res.data.addressLongitude
      console.log("111111: ", this.pio);
    },
    
  },
  watch: {
    //   这里是id变化的时候重新获取信息
    id() {
      // 对话框出现才请求数据
      if (this.isLogistics) {
        //   如果是物流信息
        this.getLogisticsById(this.id);
      } else {
        // 否则是对虾信息
        this.getShrimpById(this.id);
      }
    },
  },
};
</script>
<style lang="less">
</style>