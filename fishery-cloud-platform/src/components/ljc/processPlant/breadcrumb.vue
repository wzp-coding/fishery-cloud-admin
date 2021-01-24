<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>{{ myClassify }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ myTitle }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    myClassify: {},
    myTitle: {},
  },
};
</script>

<style scoped>
</style>
