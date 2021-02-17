<template>
  <div>
    <UploadFile
      :upload-success="handleSuccess"
      :close-modal="handleClose"
      :is-open="isOpen"
    ></UploadFile>
    <el-button @click="handleOpen">打开UploadFile</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false,
      config: {
        headers: {
          xip: "112.97.167.193",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMzUyODU0MjYyMDIyOTcxMzk0Iiwic3ViIjoic3RyaW5nIiwiaWF0IjoxNjEzMTg5NTEwLCJyb2xlcyI6MywiYmFzZUlkIjoiMTM1MDY1NzIyMjM3MjgzNTMzMCIsImF1dGhvcml0eSI6W10sImV4cCI6MTYxMzE5MzExMH0.W-cnCzcG_fHz7Sjb-BFzJWZUl8b4-7kXf7ZzogRI-MQ",
        },
      },
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
    consoleApiData(obj, isProxy) {
      for (let key in obj) {
        if (isProxy) {
          console.log(`Proxy: ${key}:`,obj[key]);
        } else {
          console.log(`${key}:`,obj[key]);
        }
      }
    },
    async testApiByProxy() {
      const { config } = this.$data;
      const { data: selfApi } = await this.$originAxios.get(
        "/host/authority/user/self",
        config
      );
      const { data: funcApi } = await this.$originAxios.get(
        "/host/function",
        config
      );
      const { data: baseApi } = await this.$originAxios.get(
        "/host/authority/user/getBase",
        config
      );
      const { data: roleApi } = await this.$originAxios.get(
        "/host/authority/role/1/10",
        config
      );
      this.consoleApiData({ selfApi, funcApi, baseApi,roleApi }, true);
    },
    async testApi() {
      const { data: selfApi } = await this.$user.get("/self");
      const { data: funcApi } = await this.$function.get("");
      const { data: baseApi } = await this.$user.get("/getBase");
      this.consoleApiData({ selfApi, funcApi, baseApi });
    },
  },
  created() {
    this.testApiByProxy();
    // this.testApi();
    // console.log(this.$store.state.permissionList)
  },
};
</script>
<style lang="less" scoped>
</style>