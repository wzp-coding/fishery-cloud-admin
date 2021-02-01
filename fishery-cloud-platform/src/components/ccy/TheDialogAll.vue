<template>
  <div>
    <el-dialog
    class="dialog"
    :width="toDialogInfo.width"
      @close="addDialogClosed"
      :title="toDialogInfo.title"
      :visible.sync="toDialogInfo.dialogVisible"
    >
      <!--主体区域-->
      <slot name="forAdd"></slot>
      <el-form
        :model="FormInfo"
        label-width="100px"
        :rules="toDialogInfo.FormRules"
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
      FormRules: Object,
      width:String
    },
    FormInfo: {
      type: Object,
    },
  },
  
  data() {
    return {
      temp:10
    };
  },
  created() {
    this.setWidth()
  },
  methods: {
    //表单验证
    setWidth(){
      // console.log(document.getElementsByClassName('dialog'));
      // console.log(this.FormInfo);
    },
    dialogVerification() {
      this.$refs['addeFormRef'].validate((valid) => {
        if (valid) {
          console.log('验证通过');
          this.$refs.addeFormRef.resetFields()
          console.log(this);
          this.$parent.parentMehod()
        } else {
          console.log('验证不通过');
        }
      });
    },
    addDialogClosed(){
      this.$refs.addeFormRef.resetFields()
    }
  },
};
</script>

<style>
</style>