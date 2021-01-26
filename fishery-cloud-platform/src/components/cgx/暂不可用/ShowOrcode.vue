<template>
    <!-- 物流二维码 -->
    <el-dialog
      title=""
      width="30%"
      :visible.sync="isShowCode"
      @close="closeCode()"
    >
      <div>
      		<Qrcode sid="url" :text="codeText" :swidth="swidth"></Qrcode>
      	</div>
      <p style="text-align: center; font-size: 20px">
        {{title}} {{ adultShrimpId }}
      </p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeCode()">取 消</el-button>
        <el-button type="primary" @click="toLcodeWeb(adultShrimpId)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
</template>
<script>
import QRCode from "./qrcode";
export default {
    components:{
        QRCode,
    },
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
        },

    },
    data(){
        return{
            url:'',
            codeText:'' 
        };
    },
     computed:{
                  swidth(){
                      return ((window.innerWidth*0.9)*0.4)*320/(window.innerWidth)/20;     //370*320/(window.innerWidth)/20
                  }
             },
    methods:{
        // 清空二维码 关闭对话框
        closeCode(){
            this.$refs.orcode.innerHTML = "";
            this.$emit("notifyParent2");
        },
        // 前往判断是否收货页面(路径暂时不知道，到时候合并再写进去)
    //  toLcodeWeb(id) {
    //  switch(this.title){
    //      case "物流二维码":
    //      this.$router.push({
    //     path: "/",
    //     query: { id: id },
    //   });
    //   break;
    //      case "溯源二维码":
    //           this.$router.push({
    //     path: "/",
    //     query: { id: id },
    //   });
    //   break;
    //  }
    //  },
    },
    mounted(){
         this.url = this.QrcodeUrl;
         this.codeText = this.QrcodeText;
              }
    
}

</script>
<style lang="less">

</style>