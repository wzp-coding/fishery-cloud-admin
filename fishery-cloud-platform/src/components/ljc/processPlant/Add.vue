<template>
  <div>
    <!-- 添加区域开始 -->
    <el-button type="primary" @click="addDialogVisible = true" v-auth="'traceability_process_add'">{{
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
        <el-form-item :label="labels.processingType" prop="processingType">
          <el-input v-model="addFrom.processingType"></el-input>
        </el-form-item>
        <el-form-item
          :label="labels.processingFactoryAddress"
          prop="processingFactoryAddress"
        >
          <el-input v-model="addFrom.processingFactoryAddress"></el-input>
        </el-form-item>

        <el-form-item
          :label="labels.processingFactoryArea"
          prop="processingFactoryArea"
        >
          <el-input-number
            v-model="addFrom.processingFactoryArea"
            controls-position="right"
            :min="1"
          ></el-input-number>
        </el-form-item>

        <el-form-item :label="labels.createPersonId" prop="createPersonId">
          <el-select v-model="addFrom.createPersonId">
            <el-option
              v-for="item in createPersonList"
              :key="item.id"
              :label="item.username"
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
export default {
  props: {
    baseId: {},
    labels: {},
    createPersonList: {},
  },
  data() {
    return {
      model: new ljc(this),

      // 表单名称
      formTitle: "添加加工厂",

      // 控制添加表单的显示与隐藏
      addDialogVisible: false,

      // 添加信息
      addFrom: {},
    };
  },
  computed: {
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
        const { data: res } = await this.model.addInfo(this.addFrom);
        if (res.statusCode !== 20000) {
          this.elMessage.error(res.message);
        } else {
          this.elMessage.success(res.message);
          this.$emit("getAllInfo");
          this.addDialogVisible = false;
        }
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

