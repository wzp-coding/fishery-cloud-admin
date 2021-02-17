<template>
  <el-pagination
    v-if="total > pageSize"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>
<script>
export default {
  props: {
    func: {
      type: Function,
    },
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      pageSizes: [5, 10, 15, 20],
    };
  },
  methods: {
    // 改变currentPage
    handleCurrentChange(page) {
      //   console.log(page);
      this.currentPage = page;
      this.func(page, this.pageSize);
    },

    // 改变size
    handleSizeChange(size) {
      //   console.log(size);
      this.pageSize = size;
      this.func(this.currentPage, size);
    },
  },
  async created() {
    const { total, size, page, sizes } = await this.func();
    this.total = total;
    size ? (this.pageSize = size) : "";
    page ? (this.currentPage = page) : "";
    sizes ? (this.pageSizes = sizes) : "";
  },
};
</script>