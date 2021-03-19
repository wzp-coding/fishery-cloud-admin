<template>
  <div>
    <!-- 表格开始 -->
    <el-table
      :data="allList"
      border
      stripe
      :header-cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column
        v-for="(val, key) in labels"
        :key="key"
        :prop="key"
        :label="val"
        align="center"
      ></el-table-column>
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
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
  },
};
</script>

