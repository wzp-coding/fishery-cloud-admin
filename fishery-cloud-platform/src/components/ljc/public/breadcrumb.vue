<template>
  <div>
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="item in breadcrumbInfo"
        :to="item.paths"
        :key="item.name"
        :disabled="item.paths == {} ? true : false"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb> -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in breadcrumbInfo" :key="item">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    breadcrumbInfo: {},
  },
};
</script>

<style scoped>
</style>
