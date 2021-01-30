<template>
  <div>
    <el-row
      class="globalHeader"
      style="margin-bottom: 20px; padding-bottom: 45px"
    >
      <slot name="CardTitle"></slot>
    </el-row>
    <el-table border stripe :data="toDialogInfo">
      <!--通过slot-scope传值-->
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
  props:{
    toDialogInfo:{
      type:Array
    }
  }
};
</script>

<style>
</style>