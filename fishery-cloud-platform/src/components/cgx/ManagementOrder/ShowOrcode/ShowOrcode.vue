<template>
  <!-- 物流二维码 -->
  <el-dialog
    :title="title"
    width="40%"
    :visible.sync="isShowCode"
    :before-close="closeCode"
  >
    <div id="qrcode" ref="qrcode" style="margin: auto"></div>
    <p style="text-align: center; font-size: 20px">
      {{ title }} <br />{{ Id }}
    </p>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeCode">取 消</el-button>
      <el-button type="primary" @click="testToOcodeWeb">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    isShowCode: {
      type: Boolean,
    },
    Id: {
      type: String,
      required: true,
    },
    jQcode: {
      type: Boolean,
    },
  },
  data() {
    return {
      url1: "http://119.23.218.131:9301/IsArriveLcode?id=",
      url2: "http://119.23.218.131:9301/IsArriveOcode?id=",
    };
  },
  methods: {
    createcode() {
      var qrcode = new QRCode("qrcode", {
        width: 250,
        height: 250,
      });
      if (this.title == "物流二维码") {
        // console.log("this.url1+this.Id", this.url1);
        qrcode.makeCode(
          "http://119.23.218.131:9301/B-code-web?id=" + this.Id+"&type="+"logis"
        );
      }
      if (this.title == "溯源二维码") {
        // console.log("this.url2+this.Id", this.url2);
        qrcode.makeCode(
          "http://119.23.218.131:9301/#/B-code-web?id=" + this.Id+"&type="+"origin"
        );
      }
    },
    closeCode() {
      this.$refs.qrcode.innerHTML = "";
      this.$emit("notifyParent2");
    },
    testToOcodeWeb(){
      this.$router.push("/B-code-web?id=" + this.Id+"&type="+"origin")
    }
    // // 前往判断是否收货页面1
    // toLcodeWeb() {
    //   this.$router.push({
    //     path: "/BcodeWeb",
    //     query: { id: id },
    //   });
    // },
    // // 前往判断是否收货页面2
    // toOcodeWeb(id) {
    //   this.$router.push({
    //     path: "/BcodeWeb",
    //     query: { id: id },
    //   });
    // },
  },
  watch: {
    jQcode: {
     async handler(){
       await this.$nextTick();
        this.createcode();
      }
    },
  },
    // created(){
    //   this.createcode();
    // }
};
</script>
<style lang="less" scoped>
#qrcode {
  height: 250px;
  width: 250px;
  padding: 5px;
  border: 1px solid rgb(161, 161, 161);
  border-radius: 6px;
}
</style>