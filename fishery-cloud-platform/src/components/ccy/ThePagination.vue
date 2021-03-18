<template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="toPagination.page"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="toPagination.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="toPagination.total">
    </el-pagination>
</template>

<script>
  export default {
    name:'ThePagination',
    props:{
      toPagination:{
        type:Object,
      },
    },
    methods: {
      handleSizeChange(val) {
        this.$emit('fatherMethod',val,this.toPagination.page)
      },
      handleCurrentChange(val) {
        this.$emit('fatherMethod',this.toPagination.size,val)
      }
    },
    data() {
      return {
        currentSize:6,
        currentPage:1,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      };
    }
  }
</script>