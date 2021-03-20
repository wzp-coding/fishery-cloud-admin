<template>
  <!-- 物流二维码 -->
  <el-dialog
    :title="ortitle"
    width="40%"
    :visible.sync="isShowCode"
    :before-close="closeCode"
  >
    <div id="qrcode" ref="qrcode" style="margin: auto"></div>
    <p style="text-align: center; font-size: 20px">
      {{ ortitle }} <br />{{ orderId }}
    </p>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeCode">取 消</el-button>
      <el-button type="primary" @click="testToBcodeWeb">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  props: {
    ortitle: {
      type: String,
      required: true,
    },
    isShowCode: {
      type: Boolean,
    },
    orderId: {
      type: String,
      required: true,
    },
    jQcode: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  methods: {
    createcode() {
      var qrcode = new QRCode("qrcode", {
        width: 250,
        height: 250,
      });
      let codeUrl = `http://119.23.218.131:9301/`;
      if (this.ortitle == "物流二维码") {
        codeUrl += `info-farm-p?id=${this.orderId}&type=logitis`;
      } else {
        codeUrl += `info-logitis-p?id=${this.orderId}&type=origin`;
      }
      qrcode.makeCode(codeUrl);
    },
    closeCode() {
      this.$refs.qrcode.innerHTML = "";
      this.$emit("notifyParent2");
    },
    // 测试：手动跳转到二维码对应的页面
    testToBcodeWeb() {
      console.log("this.orderId: ", this.orderId);
      let type, path;
      if (this.ortitle == "物流二维码") {
        type = `logitis`;
        path = "info-logitis-p";
      } else {
        type = `origin`;
        path = "info-farm-p";
      }
      this.$router.push({
        path,
        query: {
          id: this.orderId,
          type,
        },
      });
    },
  },
  watch: {
    async jQcode() {
      await this.$nextTick();
      this.createcode();
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