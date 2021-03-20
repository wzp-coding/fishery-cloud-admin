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

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-row :gutter="20"
            ><el-col> <Add :scope="scope" /> </el-col
          ></el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Add from "./Add";
export default {
  components: {
    Add,
  },
  props: {
    // 表格数据
    allList: {},

    // 数据标签
    labels: {},
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

