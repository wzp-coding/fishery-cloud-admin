<template>
  <el-dialog :visible.sync="ProductVisible">

  </el-dialog>
</template>

<script>
export default {
    props:{
        ProductVisible:{
            type:Boolean
        }
    }
}
</script>

<style>

</style>