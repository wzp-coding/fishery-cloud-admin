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
      config: {
        headers: {
          xip: "112.97.167.193",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMzUyODU0MjYyMDIyOTcxMzk0Iiwic3ViIjoiMTl1c2VyIiwiaWF0IjoxNjEyOTI0MjkyLCJyb2xlcyI6MiwiYmFzZUlkIjoiMTM1MDY1NzIyMjM3MjgzNTMzMCIsImF1dGhvcml0eSI6W3siYXV0aG9yaXR5IjoidHJhY2VhYmlsaXR5X2FncmljdWx0dXJhbF9hZGQifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV93YXRlcnF1YWxpdHkifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9maXNoZXJ5X3NlbGVjdCJ9LHsiYXV0aG9yaXR5IjoidHJhY2VhYmlsaXR5X3Byb2Nlc3NfZGVsZXRlIn0seyJhdXRob3JpdHkiOiJ0cmFjZWFiaWxpdHlfaW5wdXRzX3VwZGF0ZSJ9LHsiYXV0aG9yaXR5IjoidHJhY2VhYmlsaXR5X3Byb2R1Y3QifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9wcm9jZXNzIn0seyJhdXRob3JpdHkiOiJhdXRob3JpdHlfcm9sZV9kZWxldGUifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9wb25kX3NlbGVjdCJ9LHsiYXV0aG9yaXR5IjoidHJhY2VhYmlsaXR5X2lucHV0c19kZWxldGUifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9tb25pdG9yX3NlbGVjdCJ9LHsiYXV0aG9yaXR5IjoidHJhY2VhYmlsaXR5X2F0bW9zcGhlcmUifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9wcm9jZXNzX3VwZGF0ZSJ9LHsiYXV0aG9yaXR5IjoiYXV0aG9yaXR5X3JvbGVfdXBkYXRlIn0seyJhdXRob3JpdHkiOiJ0cmFjZWFiaWxpdHlfZmlzaGVyeUluZm9fdXBkYXRlIn0seyJhdXRob3JpdHkiOiJ0cmFjZWFiaWxpdHlfYWdyaWN1bHR1cmFsX2RlbGV0ZSJ9LHsiYXV0aG9yaXR5IjoidHJhY2VhYmlsaXR5X3dhdGVycXVhbGl0eV9hZGQifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV93YXRlcnF1YWxpdHlfdXBkYXRlIn0seyJhdXRob3JpdHkiOiJhdXRob3JpdHlfYWRtaW4ifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9wb25kX2FkZCJ9LHsiYXV0aG9yaXR5IjoidHJhY2VhYmlsaXR5X21vbml0b3JfdXBkYXRlIn0seyJhdXRob3JpdHkiOiJ0cmFjZWFiaWxpdHlfcmVmcmlnZXJhdG9yeV9zZWxlY3QifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9hZ3JpY3VsdHVyYWxfc2VsZWN0In0seyJhdXRob3JpdHkiOiJ0cmFjZWFiaWxpdHkifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9maXNoZXJ5SW5mb19zZWxlY3QifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9yZWZyaWdlcmF0b3J5X2FkZCJ9LHsiYXV0aG9yaXR5IjoiYXV0aG9yaXR5X3JvbGVfdXBkYXRlUm9sZUZ1bmN0aW9uIn0seyJhdXRob3JpdHkiOiJ0cmFjZWFiaWxpdHlfcHJvZHVjdF91cGRhdGUifSx7ImF1dGhvcml0eSI6ImVudGVycHJpc2VfZW50ZXJwcmlzZV91c2VyIn0seyJhdXRob3JpdHkiOiJhdXRob3JpdHlfcm9sZV9hZGQifSx7ImF1dGhvcml0eSI6ImF1dGhvcml0eSJ9LHsiYXV0aG9yaXR5IjoiZW50ZXJwcmlzZV9lbnRlcnByaXNlX3VwZGF0ZSJ9LHsiYXV0aG9yaXR5IjoidHJhY2VhYmlsaXR5X3BvbmRfZGVsZXRlIn0seyJhdXRob3JpdHkiOiJlbnRlcnByaXNlX2VudGVycHJpc2UifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9tb25pdG9yIn0seyJhdXRob3JpdHkiOiJ0cmFjZWFiaWxpdHlfZmlzaGVyeUluZm9fYWRkIn0seyJhdXRob3JpdHkiOiJhdXRob3JpdHlfZnVuY3Rpb24ifSx7ImF1dGhvcml0eSI6ImF1dGhvcml0eV9yb2xlX3NlbGVjdCJ9LHsiYXV0aG9yaXR5IjoidHJhY2VhYmlsaXR5X2F0bW9zcGhlcmVfZGVsZXRlIn0seyJhdXRob3JpdHkiOiJ0cmFjZWFiaWxpdHlfZmlzaGVyeSJ9LHsiYXV0aG9yaXR5IjoidHJhY2VhYmlsaXR5X2Zpc2hlcnlfdXBkYXRlIn0seyJhdXRob3JpdHkiOiJ0cmFjZWFiaWxpdHlfYXRtb3NwaGVyZV91cGRhdGUifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9wcm9jZXNzX3NlbGVjdCJ9LHsiYXV0aG9yaXR5IjoiYXV0aG9yaXR5X3VzZXJfYWRkIn0seyJhdXRob3JpdHkiOiJhdXRob3JpdHlfcm9sZSJ9LHsiYXV0aG9yaXR5IjoiZW50ZXJwcmlzZV9lbnRlcnByaXNlX2RlbGV0ZSJ9LHsiYXV0aG9yaXR5IjoiYXV0aG9yaXR5X3VzZXJfdXBkYXRlIn0seyJhdXRob3JpdHkiOiJ0cmFjZWFiaWxpdHlfcHJvY2Vzc19hZGQifSx7ImF1dGhvcml0eSI6ImVudGVycHJpc2VfZW50ZXJwcmlzZV9hZGQifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9wb25kIn0seyJhdXRob3JpdHkiOiJ0cmFjZWFiaWxpdHlfcmVmcmlnZXJhdG9yeV9kZWxldGUifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9pbnB1dHMifSx7ImF1dGhvcml0eSI6ImF1dGhvcml0eV9hZG1pbl9kZWxldGUifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9pbnB1dHNfYWRkIn0seyJhdXRob3JpdHkiOiJ0cmFjZWFiaWxpdHlfbW9uaXRvcl9hZGQifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV93YXRlcnF1YWxpdHlfc2VsZWN0In0seyJhdXRob3JpdHkiOiJhdXRob3JpdHlfdXNlcl9kZWxldGUifSx7ImF1dGhvcml0eSI6ImF1dGhvcml0eV9hZG1pbl91cGRhdGUifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9maXNoZXJ5X2RlbGV0ZSJ9LHsiYXV0aG9yaXR5IjoidHJhY2VhYmlsaXR5X3Byb2R1Y3RfYWRkIn0seyJhdXRob3JpdHkiOiJ0cmFjZWFiaWxpdHlfcmVmcmlnZXJhdG9yeV91cGRhdGUifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV93YXRlcnF1YWxpdHlfZGVsZXRlIn0seyJhdXRob3JpdHkiOiJ0cmFjZWFiaWxpdHlfYWdyaWN1bHR1cmFsIn0seyJhdXRob3JpdHkiOiJhdXRob3JpdHlfdXNlcl9zZWxlY3QifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9hZ3JpY3VsdHVyYWxfdXBkYXRlIn0seyJhdXRob3JpdHkiOiJ0cmFjZWFiaWxpdHlfZmlzaGVyeUluZm8ifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9maXNoZXJ5SW5mb19kZWxldGUifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9hdG1vc3BoZXJlX2FkZCJ9LHsiYXV0aG9yaXR5IjoidHJhY2VhYmlsaXR5X3JlZnJpZ2VyYXRvcnkifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9wcm9kdWN0X3NlbGVjdCJ9LHsiYXV0aG9yaXR5IjoidHJhY2VhYmlsaXR5X2Zpc2hlcnlfYWRkIn0seyJhdXRob3JpdHkiOiJhdXRob3JpdHlfYWRtaW5fYWRkIn0seyJhdXRob3JpdHkiOiJ0cmFjZWFiaWxpdHlfaW5wdXRzX3NlbGVjdCJ9LHsiYXV0aG9yaXR5IjoiYXV0aG9yaXR5X3VzZXIifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9wb25kX3VwZGF0ZSJ9LHsiYXV0aG9yaXR5IjoidHJhY2VhYmlsaXR5X2F0bW9zcGhlcmVfc2VsZWN0In0seyJhdXRob3JpdHkiOiJ0cmFjZWFiaWxpdHlfcHJvZHVjdF9kZWxldGUifSx7ImF1dGhvcml0eSI6InRyYWNlYWJpbGl0eV9tb25pdG9yX2RlbGV0ZSJ9XSwiZXhwIjoxNjEyOTI3ODkyfQ.QntfPHHzHEkKDxCV4VqW1I6YDqX8WJwTiinZo4WV0ps",
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
      this.consoleApiData({ selfApi, funcApi, baseApi }, true);
    },
    async testApi() {
      const { data: selfApi } = await this.$user.get("/self");
      const { data: funcApi } = await this.$function.get("");
      const { data: baseApi } = await this.$user.get("/getBase");
      this.consoleApiData({ selfApi, funcApi, baseApi });
    },
  },
  created() {
    // this.testApiByProxy();
    // this.testApi();
    // console.log(this.$store.state.permissionList)
  },
};
</script>
<style lang="less" scoped>
</style>