<template>
  <el-dialog
    :visible="dialogVisible"
    :before-close="
      (done) => {
        this.$emit('close');
        done();
      }
    "
    
    width="30%"
    center
    title="添加角色"
  >
    <Form
      :callback="handleSubmit"
      :options="['roleName', 'roleRemark']"
      button="添加角色"
      ref="form"
    >
    </Form>
  </el-dialog>
</template>
<script>
import Form from "../Form";
export default {
  components: {
    Form,
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    //   添加角色 按钮
    async handleSubmit(form) {
    //   console.log("form: ", form);
      const sForm = {
        name: form.roleName,
        remarks: form.roleRemark,
        useable: true,
      };
      const { data: res } = await this.$role.post("/save", sForm);
      if (res.statusCode === 20000) {
        this.elMessage.success(res.message);
        this.$emit("close");
      } else {
        this.elMessage.error(res.message);
      }
    },

    
  },
};
</script>