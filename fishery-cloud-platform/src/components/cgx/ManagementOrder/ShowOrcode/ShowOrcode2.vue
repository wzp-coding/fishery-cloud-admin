<template>
    <!-- 物流二维码 -->
    <el-dialog
      title=""
      width="30%"
      :visible.sync="isShowCode"
      @close="closeCode()"
    >
      <div id="orcode" ref="orcode" style="margin: auto"></div>
      <p style="text-align: center; font-size: 20px">
        {{ortitle}} <br>{{ adultShrimpId }}
      </p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeCode()">取 消</el-button>
        <el-button type="primary" @click="toLcodeWeb(adultShrimpId)"
          >确 定</el-button>
      </div>
    </el-dialog>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
    props:{
        ortitle:{
            type:String,
            required:true,
        },
        isShowCode:{
            type:Boolean,
        },
        adultShrimpId:{
            type:String,
            required:true,
        }
    },
    data(){
        return{
          url1:"http://119.23.218.131:9301/IsArriveLcode?id="

        }
    },
    methods:{
       createlcode() {
      new QRCode("orcode", {
        width: 250,
        height: 250,
      }).makeCode(
        "http://119.23.218.131:9301/IsArriveLcode?id=" + this.adultShrimpId
      );
    },
        closeCode(){
            this.$refs.orcode.innerHTML = ''
            this.$emit("notifyParent2");
        },
        toLcodeWeb(){
           this.$router.push({
        path: "../../../../views/order_logistics/",
        query: { id: id },
      });
        }
    },
  created() {
    this.createlcode();
      },
    
}
</script>
<style lang="less" scoped>
#orcode {
  height: 250px;
  width: 250px;
  padding: 5px;
  border: 1px solid rgb(161, 161, 161);
  border-radius: 6px;
  }
</style>