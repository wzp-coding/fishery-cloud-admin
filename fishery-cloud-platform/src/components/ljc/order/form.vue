<template>
  <div>
    <!-- 修改按钮开始 -->
    <el-button
      type="success"
      icon="el-icon-document"
      size="mini"
      @click="dialogVisible = true"
    ></el-button>
    <!-- 修改按钮结束 -->

    <!-- 修改表单区域开始 -->
    <el-dialog
      :title="formTitle"
      :visible.sync="dialogVisible"
      @close="dialogClosed"
      width="40%"
    >
      <!-- 表单信息(按需改) -->
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="150px"
        label-position="left"
        :hide-required-asterisk="true"
      >
        <el-form-item :label="labels.phoneNumber" prop="phoneNumber">
          <el-input placeholder="请输入内容" v-model="form.phoneNumber">
          </el-input>
        </el-form-item>

        <el-form-item :label="labels.receiveAddress" prop="receiveAddress">
          <el-input placeholder="请输入内容" v-model="form.receiveAddress">
          </el-input>
        </el-form-item>

        <el-form-item
          :label="labels.refrigeratoryOutTime"
          prop="refrigeratoryOutTime"
        >
          <el-date-picker
            v-model="form.refrigeratoryOutTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          :label="labels.refrigeratoryOutDescription"
          prop="refrigeratoryOutDescription"
        >
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.refrigeratoryOutDescription"
          >
          </el-input>
        </el-form-item>

        <el-form-item :label="labels.warehousingPersonId" prop="warehousingPersonId">
          <el-select v-model="form.warehousingPersonId">
            <el-option
              v-for="item in createPersonList"
              :key="item.id"
              :label="item.username"
              :value="item.id"
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
        <el-button @click="addInfo()">创建</el-button>
      </div>
    </el-dialog>
    <!-- 添加表单区域结束 -->
  </div>
</template>
<script>
/* 路径（按需改） */
import ljc from "./order";
export default {
  props: {
    id: {},
    createPersonList: {},
    productName: {},
    tag: {},
  },
  data() {
    return {
      model: new ljc(this),
      // 表单名称
      formTitle: "创建订单",

      // 控制表单的显示与隐藏
      dialogVisible: false,

      // 表单
      form: {},
    };
  },
  computed: {
    // 验证规则
    formRules() {
      return this.model.formRules;
    },

    labels() {
      return this.model.labels;
    },
  },
  created() {},
  methods: {
    /* 监听窗口关闭事件开始 */
    dialogClosed() {
      this.form = {};
      this.$refs.formRef.resetFields();
    },
    /* 监听窗口关闭事件关闭 */

    /* 添加 */
    addInfo(tag) {
      this.$refs.formRef.validate(async (val) => {
        if (!val) return false;

        console.log(this.form);
        const { data: res } = await this.model.addInfo(this.form);
        if (res.statusCode == 20000) {
          this.elMessage.success(res.message);
        }
        this.dialogVisible = false;
      });
    },
  },
};
</script>


