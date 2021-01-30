<template>
  <!-- 卡片信息 -->
  <div>
    <el-row
      class="globalHeader"
      style="margin-bottom: 20px; padding-bottom: 45px"
    >
      <slot name="CardTitle"></slot>
    </el-row>
    <slot name="bigBox"></slot>
    <!--池塘管理特有-->
  </div>
</template>
<script>
export default {};
</script>
