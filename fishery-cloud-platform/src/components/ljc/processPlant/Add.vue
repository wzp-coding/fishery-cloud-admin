<template>
  <div>
    <!-- 添加区域开始 -->
    <el-button type="primary" @click="addDialogVisible = true">{{
      formTitle
    }}</el-button>
    <!-- 添加区域结束 -->

    <!-- 添加表单区域开始 -->
    <el-dialog
      :title="formTitle"
      :visible.sync="addDialogVisible"
      @close="addDialogClosed"
      width="40%"
    >
      <el-form
        :model="addFrom"
        ref="addFromRef"
        :rules="formRules"
        label-width="100px"
        label-position="left"
        :hide-required-asterisk="true"
      >
        <el-form-item
          :label="labels.processingFactoryName"
          prop="processingFactoryName"
        >
          <el-input v-model="addFrom.processingFactoryName"></el-input>
        </el-form-item>
        <el-form-item
          :label="labels.processingFactoryAddress"
          prop="processingFactoryAddress"
        >
          <el-input v-model="addFrom.processingFactoryAddress"></el-input>
        </el-form-item>
        <el-form-item :label="labels.createPersonId" prop="createPersonId">
          <el-select v-model="addFrom.createPersonId">
            <el-option
              v-for="item in createPersonList"
              :key="item.id"
              :label="item.personName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加表单区域结束 -->
  </div>
</template>
<script>
import ljc from "../processPlant/processPlant";
import ljcPublic from "../public/public";
export default {
  props: {
    baseId: {},
    labels: {},
  },
  data() {
    return {
      model: new ljc(this),
      public: new ljcPublic(this),

      // 表单名称
      formTitle: "添加加工厂",

      // 控制添加表单的显示与隐藏
      addDialogVisible: false,

      // 添加信息
      addFrom: {},

      /* 提示信息开始 */
      addSuccessInfo: "添加加工厂成功！！",
      addErrorInfo: "加工厂已存在，请重新输入",
      /* 提示信息结束 */
    };
  },
  computed: {
    // 管理员数组
    createPersonList() {
      return this.public.createPersonList;
    },

    // 表单验证规则对象
    formRules() {
      return this.model.formRules;
    },
  },
  created() {},
  methods: {
    /* 添加开始 */
    addInfo() {
      this.$refs.addFromRef.validate(async (val) => {
        if (!val) return false;
        this.addFrom.baseId = this.baseId;
        console.log(this.addFrom);
        await this.model.addInfo(this.addFrom).then((val) => {
          if (val.status !== 200) {
            this.$message.error(this.addErrorInfo);
          }
          this.$message.success(this.addSuccessInfo);
          this.$emit("getAllInfo");
          this.addDialogVisible = false;
        });
      });
    },
    /* 添加结束 */

    /* 监听窗口关闭事件开始 */
    addDialogClosed() {
      this.addFrom = {};
      this.$refs.addFromRef.resetFields();
    },
    /* 监听窗口关闭事件关闭 */
  },
};
</script>

