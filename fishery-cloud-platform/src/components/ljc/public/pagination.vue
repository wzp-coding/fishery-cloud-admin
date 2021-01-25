<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[4, 6, 8, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    // 数据总条数
    total: Number,
    // 当前页码
    pageNum: Number,
    // 每页显示条数
    pageSize: Number,
  },
  data() {
    return {};
  },
  methods: {
    // 监听(每页显示条数)改变事件
    handleSizeChange(newSize) {
      this.$emit("getAllInfo", newSize, this.pageNum);
    },

    // 监听(页码值)改变的事件
    handleCurrentChange(newPage) {
      this.$emit("getAllInfo", this.pageSize, newPage);
    },
  },
};
</script>

