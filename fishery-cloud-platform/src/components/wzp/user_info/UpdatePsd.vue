<template>
  <Form
    :callback="handleSubmit"
    :options="['phone', 'password', 'phoneCode']"
    button="修改密码"
    ref="form"
  ></Form>
</template>
<script>
import Form from "../Form";
export default {
  components: {
    Form,
  },
  methods: {
    async handleSubmit(form) {
      // console.log('form: ', form);
      let { phoneCode } = form;
      const url = `/retrievePassword/${phoneCode}`;
      const { data: res } = await this.$user.post(url, form);
      if (res.statusCode === 20000) {
        this.elMessage.success(res.message);
        this.elMessage.warning("请您用新密码重新登录！");
        this.$router.push("/login");
      } else {
        this.elMessage.error(res.message);
        console.error(res.message);
      }
    },
  },
};
</script>
<style lang="less" scoped>
</style>