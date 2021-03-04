<template>
  <div>
    <!-- 添加区域开始 -->
    <el-button
      type="primary"
      @click="addDialogVisible = true"
      style="margin-top: 20px"
      >{{ formTitle }}</el-button
    >
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
        <el-form-item :label="labels.id" prop="id">
          <el-select v-model="addFrom.id">
            <el-option
              v-for="item in inputInfo[0]"
              :key="item.id"
              :label="item.inputName"
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
import ljc from "../craftInput/craftInput";
export default {
  props: {
    craftId: {},
    labels: {},
    inputInfo: {},
  },
  data() {
    return {
      model: new ljc(this),

      // 表单名称
      formTitle: "添加工艺投入品",

      // 控制添加表单的显示与隐藏
      addDialogVisible: false,

      // 添加信息
      addFrom: {},
    };
  },
  computed: {
    // 验证规则
    formRules() {
      return this.model.formRules;
    },

    craftInfos() {
      return this.craftInfo[0];
    },
  },
  created() {},
  methods: {
    /* 添加开始 */
    addInfo() {
      this.$refs.addFromRef.validate(async (val) => {
        if (!val) return false;
        this.addFrom.craftId = this.craftId;
        const { data: res } = await this.model.addInfo(this.addFrom);
        if (res.statusCode == 20000) {
          this.elMessage.success(res.message);
        }
        this.$emit("getAllInfo");
        this.addDialogVisible = false;
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

