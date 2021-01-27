<template>
    <el-pagination
    @size-change="handleSizeChange" 
    @current-change="handleCurrentChange" 
    :current-page="page.pageindex" 
    :page-sizes="[5,10,15]" 
    :page-size="page.pagesize"
    layout="total, sizes, prev, pager, next, jumper" 
    :total="total">
    </el-pagination>
</template>

<script>
export default {
  props: {
      total: {
          type: Number
      },
      page_index: {
          type: Number,
          default: 1
      },
      page_size: {
        type:Number,
        default: 5
      }
   },
  data() {
    return {
      page: {
        pageindex: this.page_index,
        pagesize: this.page_size
      }
    };
  },
  methods: {
    // 每页查看条数变化
    handleSizeChange(newsize) {
      this.page.pagesize = newsize;
      this.$emit('pageChange', this.page);
    },
    // 当前页码变化
    handleCurrentChange(newindex) {
      this.page.pageindex = newindex;
      this.$emit('pageChange', this.page);
    }
  },

}
</script>

<style lang="less" scoped>
</style>
