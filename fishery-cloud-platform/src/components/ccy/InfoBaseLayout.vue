<template>
  <div>
      <el-row :gutter="20">
          <el-col :span="8"><slot name="pre"></slot></el-col>
          <el-col :span="8"><slot name="after"></slot></el-col>
          <el-col :span="7"><slot name="posLpng"></slot></el-col> <!--经度--->
          <el-col :span="7"><slot name="posLat"></slot></el-col>  <!--维度--->
          <slot></slot>
      </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>