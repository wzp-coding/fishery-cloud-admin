<template>
  <div>
    <el-dialog
      width="21%"
      :title="toDialogInfo.title"
      :visible.sync="toDialogInfo.dialogVisible"
    >
      <!--主体区域-->
      <el-form
        :model="addFormInfo"
        label-width="110px"
        :rules="toDialogInfo.addeFormRules"
        ref="addeFormRef"
      >
        <slot></slot>
      </el-form>
      <slot name="footer"></slot>
      <!--底部区域-->
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    toDialogInfo: {
      type: Object,
      title: String,
      dialogVisible: Boolean,
      addeFormRules: Object,
    },
    addFormInfo: {
      type: Object,
    },
  },
  data() {
    return {
      //   info: "操作",
    };
  },
  created() {
    
  },
  methods: {
    //表单验证
    dialogVerification() {
      this.$refs['addeFormRef'].validate((valid) => {
        if (valid) {
          console.log('验证通过');
          console.log(this);
          this.$parent.createPond()
        } else {
          console.log('验证不通过');
        }
      });
    },
  },
};
</script>

<style>
</style>