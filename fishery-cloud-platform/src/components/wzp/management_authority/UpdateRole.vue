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
    title="修改角色"
  >
    <Form
      :callback="handleSubmit"
      :options="['roleName', 'roleRemark']"
      button="修改角色"
      :defaultForm="infoForm"
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
  data() {
    return {
      infoForm: {},
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
    roleId: {
      type: String,
    },
  },
  methods: {
    // 根据角色Id查询角色信息
    async getRoleInfo(id) {
      const { data: res } = await this.$role.get(`/get/${id}`);
      if (res.statusCode === 20000) {
        const { name: roleName, remarks: roleRemark } = res.data;
        this.infoForm = { roleName, roleRemark };
      }else{
        this.elMessage.error(res.message);
      }
    },

    // 修改角色 按钮
    async handleSubmit(form) {
      //   console.log("form: ", form);
      const sForm = {
        id:this.roleId,
        name: form.roleName,
        remarks: form.roleRemark,
        useable: true,
      };
      const { data: res } = await this.$role.post("/uodate", sForm);
      if (res.statusCode === 20000) {
        this.elMessage.success(res.message);
        this.$emit("close");
      } else {
        this.elMessage.error(res.message);
      }
    },

    // 打开之前获取角色信息
    async openProxy() {
      if (this.roleId) {
        await this.getRoleInfo(this.roleId);
      } 
    },
  },
};
</script>