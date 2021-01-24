<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>基地管理</el-breadcrumb-item>
      <el-breadcrumb-item>基地信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <TheCardHead>
        <div slot="CardTitle">
          <i class="el-icon-document-copy"></i>
          <span>基地信息</span>
        </div>
      </TheCardHead>
      
    </el-card>
  </div>
</template>

<script>
import TheCardHead from "../components/ccy/TheCardHead";
export default {
  components: {
    TheCardHead,
  },
};
</script>

<style>
</style>