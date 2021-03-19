<template>
  <div>
    <!-- 表格开始 -->
    <el-table
      :data="allList"
      border
      stripe
      :header-cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index"> </el-table-column>

      <el-table-column
        v-for="(val, key) in labels"
        :key="key"
        :prop="key"
        :label="val"
        align="center"
      ></el-table-column>

      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope"> <AddOrder :scope="scope" /> </template>
      </el-table-column>
    </el-table>
    <!-- 表格结束 -->
  </div>
</template>

<script>
import AddOrder from "./AddOrder";
export default {
  components: {
    AddOrder,
  },
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
  created() {},
  computed: {},
  methods: {
    getAllInfo() {
      this.$emit("getAllInfo");
    },
  },
};
</script>

