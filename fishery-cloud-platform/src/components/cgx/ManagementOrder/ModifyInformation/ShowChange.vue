<template>
    <!-- 修改订单信息的对话框 -->
    <el-dialog
      title="修改订单信息"
      :visible.sync="aditDialogVisible"
      width="30%"
      @close="aditDialogClosed"
    >
      <!-- 内容主题区 -->
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="120px"
      >
        <el-form-item label="客户名" prop="customerName">
          <el-input v-model="editForm.customerName"></el-input>
        </el-form-item>
        <el-form-item label="客户类型" prop="customerType">
          <el-select v-model="editForm.customerType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额/元" prop="money">
          <el-input-number
            v-model="editForm.money"
            controls-position="right"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="重量/kg" prop="weight">
          <el-input-number
            v-model="editForm.weight"
            controls-position="right"
            :min="0"
            :max="remain + constWeight"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="操作人" prop="createBy">
          <el-select v-model="editForm.createBy" placeholder="请选择">
            <el-option
              v-for="(item, i) in personInfoList"
              :key="i"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建日期" prop="createDate">
          <el-date-picker
            v-model="editForm.createDate"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="收货地址" prop="receiptAddress">
          <el-input v-model="editForm.receiptAddress"></el-input>
        </el-form-item>
      </el-form>
      <!-- 页脚 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closechange">取 消</el-button>
        <el-button type="primary" @click="editOrderInfo">确 定</el-button>
      </span>
    </el-dialog>

</template>
<script>
export default {
    props:{
        editFormRules:{
            type:Object,
        },
        editForm:{
            type:Object,
        },
        aditDialogVisible:{
            type:Boolean,
        },
        options:{
            type:Array,
            default: () => []
        },
        remain:{
            type:Number,
        },
        personInfoList:{
            type:Array,
        },
        constWeight:{
            type:Number,
        }
    },
    data(){
        return{

        }
    },
    methods:{
        // 监听修改订单信息对话框的关闭事件，关闭时重置
    aditDialogClosed() {
        this.$refs.editFormRef.resetFields();
        this.$emit("changenotifyParent");
      
    },
    // 向父组件发送关闭对话框请求
    closechange(){
        this.$emit("changenotifyParent");
    },
      // 修改信息并提交
    editOrderInfo() {
      // 先进行表单的预验证
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return false;
        // 正确，则会发起修改用户信息的请求
        // 转化时间为标准形式
        if (this.editForm.createDate !== null) {
          var date = new Date(this.editForm.createDate);
          this.editForm.createDate = `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        }
        const { data: res } = await this.$http.post(
          `/order/${this.editForm.id}?oldNum=${this.constWeight}`,
          {
            customerName: this.editForm.customerName,
            customerType: this.editForm.customerType,
            money: this.editForm.money,
            shrimpId: this.editForm.shrimpId,
            weight: this.editForm.weight,
            createBy: this.editForm.createBy,
            createDate: this.editForm.createDate,
            receiptAddress: this.editForm.receiptAddress,
            addressLongitude: this.editForm.addressLongitude,
            addressLatitude: this.editForm.addressLatitude,
            baseId: this.editForm.baseId,
            shrimpBatchName: this.editForm.shrimpBatchName,
            logisticsId: this.editForm.logisticsId,
            adultShrimpId: this.editForm.adultShrimpId,
          }
        );
        // console.log(res)
        if (res.code !== 20000) {
          return this.$message.error("更新该虾苗订单信息失败！！");
        }
        // 提示修改成功
        this.$message.success("更新该虾苗订单信息成功！！");
        
        // 刷新列表
        this.$emit("getOrderList");
        // 关闭对话框
         this.$emit("changenotifyParent"); 
         this.$refs.editFormRef.resetFields();
        // console.log("1212")
      });
    },
   
    
    }
}
</script>