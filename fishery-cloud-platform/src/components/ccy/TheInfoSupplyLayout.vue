<template>
  <div>
      <el-row :gutter="20">
          <el-col :span="9"><slot name="pre"></slot></el-col>
          <el-col :span="9"><slot name="after"></slot></el-col>
      </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>