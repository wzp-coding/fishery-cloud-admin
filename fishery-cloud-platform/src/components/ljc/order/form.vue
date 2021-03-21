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
        label-width="150px"
        label-position="left"
        :hide-required-asterisk="true"
      >
        <el-form-item label="客户类型">
          <el-select v-model="form.targetType">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="客户" v-if="form.targetType">
          <el-select
            v-model="form.target"
            v-if="form.targetType == 1 || form.targetType == 2"
            value-key="customerName"
          >
            <el-option
              v-for="item in customerList"
              :key="item.id"
              :label="item.customerName"
              :value="item"
            >
            </el-option>
          </el-select>

          <el-select
            v-model="form.target"
            v-if="form.targetType == 4"
            value-key="refrigeratoryName"
          >
            <el-option
              v-for="item in Storages"
              :key="item.id"
              :label="item.refrigeratoryName"
              :value="item"
            >
            </el-option>
          </el-select>

          <el-select
            v-model="form.target"
            v-if="form.targetType == 3"
            value-key="factoryName"
          >
            <el-option
              v-for="item in Factorys"
              :key="item.id"
              :label="item.factoryName"
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
import ljc from "./order";
import Public from "../public/public";
export default {
  props: {
    scope: {},
  },
  data() {
    return {
      model: new ljc(this),

      public: new Public(this),
      // 表单名称
      formTitle: "创建订单",

      // 控制表单的显示与隐藏
      dialogVisible: false,

      // 表单
      form: {},

      // 客户列表
      customerList: [],

      // 冷库列表
      Storages: [],

      // 加工厂列表
      Factorys: [],

      // 类型列表
      typeList: [
        {
          label: "个人",
          value: 1,
        },
        {
          label: "企业",
          value: 2,
        },
        {
          label: "加工厂",
          value: 3,
        },
        {
          label: "冷库",
          value: 4,
        },
      ],
    };
  },
  computed: {
    formRules() {
      return this.model.formRules;
    },

    labels() {
      return this.model.labels;
    },

    baseId() {
      return this.$store.state.userInfo.baseId;
    },
  },
  created() {
    this.getCustomer();
    this.getStorage();
    this.getFactory();
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
        console.log(this.form.targetType);
        switch (this.form.targetType) {
          case 1:
          case 2:
            this.form.addressLatitude = this.form.target.addressLatitude;
            this.form.addressLongitude = this.form.target.addressLongitude;
            this.form.targetName = this.form.target.customerName;
            this.form.targetId = this.form.target.id;
            this.form.receiveAddress = this.form.target.receiveAddress;
            this.form.phoneNumber = this.form.target.phoneNumber;
            break;
          case 3:
            break;
          case 4:
            break;
        }
        console.log(this.scope.row);
        this.form.productName = this.scope.row.productName;
        this.form.productId = this.scope.row.id;
        this.form.baseId = this.baseId;
        delete this.form.target;
        console.log(this.form);
        const { data: res } = await this.model.createOrder(this.form);
        console.log(res);
        if (res.statusCode == 20000) {
          this.elMessage.success(res.message);
          this.dialogVisible = false;
        } else {
          this.elMessage.error(res.message);
        }
      });
    },

    /* 获取所有客户信息 */
    async getCustomer() {
      const { data: res } = await this.public.getCustomer(this.baseId);
      this.customerList = res.data;
      console.log("客户", res.data);
    },

    /* 获取所有冷库 */
    async getStorage() {
      const { data: res } = await this.public.getRefrigeratoryInfo();
      this.Storages = res.data;
      console.log("冷库", res.data);
    },

    /* 获取所有加工厂 */
    async getFactory() {
      const { data: res } = await this.public.getFactoryAll();
      this.Factorys = res.data;
      console.log("加工厂", res.data);
    },
  },
};
</script>


