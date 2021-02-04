<template>
  <div>
    <UploadFile
      :upload-success="handleSuccess"
      :close-modal="handleClose"
      :is-open="isOpen"
    ></UploadFile>
    <el-button @click="handleOpen">打开</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    handleSuccess(ret) {
      console.log("ret: ", ret);
    },
    handleClose() {
      console.log("close");
      this.isOpen = false;
    },
    handleOpen() {
      this.isOpen = true;
    },
  },
};
</script>
<style lang="less" scoped>
</style>