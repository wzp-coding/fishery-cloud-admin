<template>
  <div>
    <el-button
      type="success"
      icon="el-icon-s-order"
      size="mini"
      @click="dialogVisible = true"
      v-auth="'traceability_refrigeratory'"
    ></el-button>

    <el-dialog
      :title="formTitle"
      :visible.sync="dialogVisible"
      @close="dialogClosed"
      width="40%"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="auto"
        label-position="left"
        :hide-required-asterisk="true"
      >
        <el-form-item :label="labels.targetName">
          <el-select v-model="form.target" value-key="customerName">
            <el-option
              v-for="item in customerList"
              :key="item.id"
              :label="item.customerName"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="labels.amount" prop="amount">
          <el-input-number
            v-model="form.amount"
            controls-position="right"
            :min="1"
          ></el-input-number>
        </el-form-item>

        <el-form-item :label="labels.money" prop="money">
          <el-input-number
            v-model="form.money"
            controls-position="right"
            :min="1"
          ></el-input-number>
        </el-form-item>

        <el-form-item :label="labels.weight" prop="weight">
          <el-input-number
            v-model="form.weight"
            controls-position="right"
            :min="1"
            :max="scope.weight"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="createOrder()">创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ljc from "./ProductBatch";
import Public from "../public/public";
export default {
  props: {
    scope: {},
  },
  data() {
    return {
      model: new ljc(this),

      public: new Public(this),

      formTitle: "创建订单",

      dialogVisible: false,

      form: {},

      customerList: [],
    };
  },
  computed: {
    formRules() {
      return this.model.formRules;
    },

    labels() {
      return this.model.formLabels;
    },

    baseId() {
      return this.$store.state.userInfo.baseId;
    },
  },
  created() {
    this.getCustomer();
  },
  methods: {
    /* 监听窗口关闭事件开始 */
    dialogClosed() {
      this.form = {};
      this.$refs.formRef.resetFields();
    },
    /* 监听窗口关闭事件关闭 */

    /* 添加 */
    createOrder() {
      this.$refs.formRef.validate(async (val) => {
        if (!val) return false;
        this.form.refrigeratoryInId = this.id;
        this.form.productId = this.id;
        this.form.type = this.form.target.customerType;
        this.form.productName = this.productName;
        this.form.receiveAddress = this.form.target.receiveAddress;
        this.form.addressLatitude = this.form.target.addressLatitude;
        this.form.addressLongitude = this.form.target.addressLongitude;
        this.form.phoneNumber = this.form.target.phoneNumber;
        this.form.baseId = this.form.target.baseId;
        this.form.targetName = this.form.target.customerName;
        this.form.targetType = this.form.target.customerType;
        this.form.status = 0;
        this.form.targetId = this.form.target.id;

        console.log(JSON.parse(JSON.stringify(this.form)));

        const { data: res } = await this.model.createOrder(
          JSON.parse(JSON.stringify(this.form)),
          this.tag
        );
        console.log(res);
        if (res.statusCode == 20000) {
          this.elMessage.success(res.message);
        } else {
          this.elMessage.error(res.message);
        }
        this.dialogVisible = false;
      });
    },

    /* 获取所有客户信息 */
    async getCustomer() {
      const { data: res } = await this.public.getCustomer(this.baseId);
      this.customerList = res.data;
    },
  },
};
</script>


