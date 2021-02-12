<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="paseSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>
<script>
export default {
    props: {
        func:{
            type:Function
        }
    },
    data:{
        currentPage:1,
        total:undefined,
        paseSize:undefined,
        pageSizes:[5,10,15,20],
    },
    methods: {
        // 改变currentPage
        handleCurrentChange(){
            
        },
        
        // 改变size
        handleSizeChange(){

        }
    },
};
</script>
<style lang="less" scoped>
</style>