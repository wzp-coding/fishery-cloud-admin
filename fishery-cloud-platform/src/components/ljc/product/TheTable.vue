<template>
  <div>
    <!-- 表格开始 -->
    <el-table :data="allList" border stripe>
      >
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="id" :label="labels.id"></el-table-column>
      <el-table-column
        prop="productName"
        :label="labels.productName"
      ></el-table-column>
      <el-table-column
        prop="germchitId"
        :label="labels.germchitId"
      ></el-table-column>
      <el-table-column
        prop="processingFactoryId"
        :label="labels.processingFactoryId"
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
    allList: {},

    // 数据标签
    labels: {},

    // 主题
    title: {},
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

