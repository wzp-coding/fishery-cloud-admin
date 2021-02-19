<template>

  <div class="body">
    <header>
      <h1>基地信息概览</h1>
      <div class="showTime">当前时间：{{date}}</div>
    </header>
    <section class="mainbox">
      <div class="column">1</div>
      <div class="column">2</div>
      <div class="column">3</div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseId: "",
      date: new Date(),
    };
  },
  // beforeCreate(){
  //     this.baseId = this.$store.state.baseInfo.id
  // },

  created() {
    // this.getBaseAmount()
  },
  methods: {
    async getBaseAmount() {
      const { data: res } = await this.$leader.get(
        `base/amount/${this.$store.state.baseInfo.id}`
      );
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.body {
  background: url(../../assets/bg.jpg) no-repeat #000;
  background-size: 100% 100%;
  width:100%;
  height: 100%;
}
.bigBox {
  display: flex;
}
header h1 {
  font-size: 2rem;
  color: #fff;
  text-align: center;
  line-height: 4rem;
}
.mainbox .column {
  flex: 3;
}
.mainbox .column:nth-child(2) {
  flex: 4;
  margin: 0 0.125rem 0.1875rem;
  overflow: hidden;
}
.mainbox .column:nth-child(3) {
  flex: 3;
  margin: 0 0.125rem 0.1875rem;
  overflow: hidden;
}
header .showTime {
  position: absolute;
  top: 0;
  right: 0.375rem;
  line-height: 5rem;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
}
</style>