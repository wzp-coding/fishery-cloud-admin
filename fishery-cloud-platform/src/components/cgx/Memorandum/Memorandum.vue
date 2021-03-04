<template>
    <div>
        <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>基地管理</el-breadcrumb-item>
      <el-breadcrumb-item>备忘录</el-breadcrumb-item>
    </el-breadcrumb>

    </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          region: '',
          date2: '',
          desc: '',
          userId :""
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    },
    created(){
        this.form.userId = this.$store.state.userInfo.id
    }
  }
</script>