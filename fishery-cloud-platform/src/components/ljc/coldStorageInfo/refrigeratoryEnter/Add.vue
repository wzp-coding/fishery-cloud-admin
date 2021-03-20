<template>
  <div>
    <!-- 按钮开始 -->
    <el-button
      type="primary"
      icon="el-icon-download"
      size="mini"
      @click="dialogVisible = true"
      v-auth="'traceability_refrigeratory'"
    ></el-button>
    <!-- 按钮结束 -->

    <!-- 表单区域开始 -->
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
        label-width="100px"
        label-position="left"
        :hide-required-asterisk="true"
      >
        <el-form-item label="冷库" prop="refrigeratoryId">
          <el-select v-model="form.refrigeratoryId">
            <el-option
              v-for="item in Refrigeratorys"
              :key="item.id"
              :label="item.refrigeratoryName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="操作人员" prop="warehousingPerson">
          <el-select v-model="form.warehousingPerson">
            <el-option
              v-for="item in Staffs"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品重量" prop="productWeight">
          <el-input-number
            v-model="form.productWeight"
            controls-position="right"
            :min="0"
            :max="scope.row.productWeight"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表单区域结束 -->
  </div>
</template>
<script>
import ljc from "./refrigeratoryEnter";
import publicFn from "../../public/public";
export default {
  props: {
    scope: {},
  },
  data() {
    return {
      model: new ljc(this),

      publicFn: new publicFn(this),
      // 表单名称
      formTitle: "添加入库",

      // 控制表单的显示与隐藏
      dialogVisible: false,

      // 信息
      form: {},

      // 冷库列表
      Refrigeratorys: [],

      // 人员列表
      Staffs: [],
    };
  },
  computed: {
    // 验证规则
    formRules() {
      return this.model.formRules;
    },

    // 标题
    labels() {
      return this.model.labels;
    },
  },
  created() {
    this.getRefrigeratory();
    this.getStaff();
  },
  methods: {
    /* 添加数量入库 */
    addInfo() {
      this.$refs.formRef.validate(async (val) => {
        if (!val) return false;
        this.form.id = this.scope.row.id;
        console.log(this.form);
        const { data: res } = await this.model.addInfo(this.form);
        if (res.statusCode == 20000) {
          this.$emit("getAllInfo");
          this.dialogVisible = false;
          this.elMessage.success(res.message);
        } else {
          this.elMessage.error(res.message);
        }
      });
    },

    /* 监听窗口关闭事件 */
    dialogClosed() {
      this.form = {};
      this.$refs.formRef.resetFields();
    },

    /* 获取所有加工厂 */
    async getRefrigeratory() {
      const { data: res } = await this.publicFn.getRefrigeratory();
      this.Refrigeratorys = res.data;
    },

    /* 获取人员列表 */
    async getStaff() {
      const { data: res } = await this.publicFn.getStaff();
      this.Staffs = res.data;
    },
  },
};
</script>


