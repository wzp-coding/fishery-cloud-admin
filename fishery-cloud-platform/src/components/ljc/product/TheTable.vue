<template>
  <div>
    <!-- 表格开始 -->
    <el-table :data="productList" border stripe>
      >
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="id" :label="labels.id"></el-table-column>
      <el-table-column
        prop="processingFactoryName"
        :label="labels.processingFactoryName"
      ></el-table-column>
      <el-table-column
        prop="processingFactoryAddress"
        :label="labels.processingFactoryAddress"
      ></el-table-column>
      <el-table-column
        prop="createPersonId"
        :label="labels.createPersonId"
      ></el-table-column>
      <el-table-column label="操作"> </el-table-column>
    </el-table>
    <!-- 表格结束 -->
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    // 表格数据
    productList: {},

    // 数据标签
    labels: {},
  },
  data() {
    return {};
  },
};
</script>

