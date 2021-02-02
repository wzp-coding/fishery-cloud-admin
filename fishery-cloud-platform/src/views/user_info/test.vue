<template>
  <div>
    <el-upload
      ref="upload"
      class="upload-demo"
      :action="url"
      accept="thumbnail-mode"
      :on-change="handleChange"
      :file-list="fileList"
      :on-success="handleSuccess"
      :on-progress="handleProgress"
      :auto-upload="false"
      :http-request="myHttp"
    >
      <el-button size="small" type="primary">选择文件</el-button>
    </el-upload>

    <el-divider></el-divider>
    <el-button size="small" type="primary" @click="handleSubmit"
      >开始上传</el-button
    >
    <el-divider></el-divider>
    <el-button size="small" type="primary" @click="cancleUpload"
      >中断上传</el-button
    >
    <el-divider></el-divider>
    <div>{{ process }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      file: {},
      process: "",
      url:"http://119.23.218.131:9103/base/file/breakpoint/upload?ip=223.73.142.78",
    };
  },
  methods: {
    handleChange(file, fileList) {
      console.log("file: ", file);
      this.file = file;
    },
    handleSuccess(res) {
      console.log("res: ", res);
      console.log("res.data: ", JSON.parse(res.data));
    },
    cancleUpload() {
      this.$refs.upload.abort(this.file);
    },
    handleSubmit() {
      this.$refs.upload.submit();
    },
    handleProgress(e, file, fileList) {
      console.log("file.percentage ", file.percentage);
      this.process = file.percentage * 100 + "%";
    },
    myHttp() {
      let formdata = new FormData();
      formdata.append("file",this.file);

      this.$originAxios.post(this.url, formdata).then(res=>{
          console.log(res);
      });
    },
  },
  created() {},
};
</script>
<style lang="less" scoped>
</style>