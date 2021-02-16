<template>
  <el-row :gutter="20">
      <el-col :span="10"><slot name="pre"></slot></el-col>
      <el-col :span="10"><slot name="after"></slot></el-col>
  </el-row>
</template>

<script>
export default {

}
</script>

<style>

</style>