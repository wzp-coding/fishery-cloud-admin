<template>
  <el-dialog
    :visible="dialogVisible"
    :before-close="
      (done) => {
        this.$emit('close');
        done();
      }
    "
    @open="openProxy"
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
import { mapState } from 'vuex';
import Form from "../Form";
export default {
  components: {
    Form,
  },
  computed:{
    ...mapState(['userInfo'])
  },
  data() {
    return {
      infoForm: {},
      oldName:""
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
    flushData:{
      type:Function
    }
  },
  computed:{
    ...mapState(['userInfo'])
  },
  methods: {
    // 根据角色Id查询角色信息
    async getRoleInfo(id) {
      const { data: res } = await this.$role.get(`/get/${id}`);
      console.log('getRoleInfo: ', res);
      if (res.statusCode === 20000) {
        this.infoForm = res.data;
        this.oldName = res.data.name;
      }else{
        console.error(res.message);
      }
    },

    // 修改角色 按钮
    async handleSubmit(form) {
      //   console.log("form: ", form);
      const sForm = {
        id:this.roleId,
        name: form.roleName,
        remarks: form.roleRemark,
        useable:true
      };
      const { data: res } = await this.$role.post("/update", sForm);
      if (res.statusCode === 20000) {
        await this.synMenuByRole(sForm.name);
        this.flushData();
        this.elMessage.success(res.message);
        this.$emit("close");
      } else {
        this.elMessage.error(res.message);
      }
    },

    // 调用涛哥的接口更新用户角色权限
    async synMenuByRole(newName) {
      const params  = {
        baseId:this.userInfo.baseId,
        newName,
        oldName:this.oldName
      }
      const {data:res} = await this.$label.put('/role/name',params);
      if(res.statusCode !== 20000){
        console.error(res.message)
      }
    },

    // 打开之前获取角色信息
    async openProxy() {
      console.log('this.roleId: ', this.roleId);
      if (this.roleId && this.roleId !== this.userInfo.roleId) {
        await this.getRoleInfo(this.roleId);
      }else{
        this.elMessage.warning('不能修改自己的权限！！')
        this.$emit('close')
      }
    },
  },
};
</script>