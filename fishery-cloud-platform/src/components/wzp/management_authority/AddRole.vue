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
import { mapState } from 'vuex';
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
  computed:{
    ...mapState(['baseInfo'])
  },
  methods: {
    //   添加角色 按钮
    async handleSubmit(form) {
    //   console.log("form: ", form);
      const sForm = {
        name: form.roleName,
        remarks: form.roleRemark,
      };
      const { data: res } = await this.$role.post("/save?baseId="+this.baseInfo.id, sForm);
      if (res.statusCode === 20000) {
        await this.synMenuByRole(form.roleName);
        this.elMessage.success(res.message);
        this.$emit("close");
      } else {
        this.elMessage.error(res.message);
      }
    },

    // 调用涛哥的接口更新用户角色权限
    async synMenuByRole(role) {
      console.log('role: ', role);
      const params = {
        baseId:this.baseInfo.id,
        role,
      }
      const{data:res} = await this.$label.post('/role/generate',params);
      if(res.statusCode !== 20000){
        console.error(res.message);
      }
    },
    
  },
};
</script>