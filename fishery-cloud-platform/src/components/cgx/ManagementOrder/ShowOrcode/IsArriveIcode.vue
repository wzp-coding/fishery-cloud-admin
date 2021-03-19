<template>
  <div id="isarrive-ocode">
    <p class="errorMes">查看该产品朔源信息需先确认是否收货</p>
  </div>
</template>

<script>
export default {
  name: "IsArriveOcode",
  data() {
    return {
      isShowError: false,
    };
  },
  methods: {
    // 判断是否确认收货
    async getOriginById(id) {
      // 调用根据ID查询
      const { data: res } = await this.$traceability.get("/product/" + id);
      if (res.code !== 20000) {
        return this.elMessage.error(res.message);
      }
      // 1养殖 2冷库 3加工厂
      console.log(res.data);
      this.$router.push({
        path: "/OcodeWeb",
        query:  res.data,
      });
      // if (res.data !== null) {
      //   this.isShowError = true;
      // } else {
      // }
    },
  },
  created() {
    this.getOriginById(this.$route.query.id);
  },
};
</script>

<style lang="less" scoped>
.errorMes {
  color: rgb(53, 52, 52);
  padding: 10px;
  font-size: 30px;
  width: 50%;
  margin: 100px auto;
  border: 2px dotted rgb(156, 155, 155);
  border-radius: 6px;
  text-align: center;
}
</style>
