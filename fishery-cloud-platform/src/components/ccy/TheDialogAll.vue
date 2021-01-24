<template>
  <div>
      <el-dialog :title="info">
          <el-form>      <!--主体区域-->
              <slot name="dialogMain"></slot>
          </el-form>
          <slot name="footer"></slot>   <!--底部区域-->
      </el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return {
            info:'操作'
        }
    },
}
</script>

<style>

</style>