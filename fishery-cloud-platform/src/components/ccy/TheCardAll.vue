<template>
  <div style="width:101%">
    <el-row
      class="globalHeader"
      style="margin-bottom: 20px; padding-bottom: 45px"
    >
      <slot name="CardTitle"></slot>
    </el-row>
    <el-table border stripe :data="toCardInfo" style="width:100%" >
      <!--通过slot-scope传值-->
      <slot></slot>
      <slot name="cardExpand"></slot>
      <slot name="ordinary"></slot>
    </el-table>
    <slot name="pagination"></slot>
  </div>
</template>

<script>
import TheCardHead from "./TheCardHead";

export default {
  components: {
    TheCardHead,
  },
  data(){
    return {
      
    }
  },
  props: {
    toCardInfo: {
      type:Array,
      id: String,
      ingredient: String, //投入品成分
      inspector: String, //检验人
      name: String, //投入品名称
      picture: String, //投入品照片
      produceDate: String, //生产日期
      shelfDate: String, //保质期
      specification: 0, //规格
      supplierAddress: String, //供应商地址
      supplierLicense: String, //供应商许可证
      supplierName: String, //供应商姓名
      supplierPhone: String, //供应商电话
      // type: "", //投入品编号 1鱼料 2饲料
      gmtCreate: String, //创造时间
    },
  },
};
</script>

<style>
</style>