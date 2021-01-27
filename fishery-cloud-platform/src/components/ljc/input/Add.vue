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
    >
      <!-- 表单信息(按需改) -->
      <el-form :model="addFrom" ref="addFromRef">
        <el-form-item
          :label="labels.inputName"
          prop="inputName"
          :rules="formRules"
        >
          <el-input v-model="addFrom.inputName"></el-input>
        </el-form-item>
        <el-form-item label="有效期" prop="inputName">
          <el-date-picker
            v-model="inputDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="labels.inspector" prop="inspector">
          <el-select v-model="addFrom.inspector">
            <el-option
              v-for="item in createPersonList"
              :key="item.id"
              :label="item.personName"
              :value="item.personName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="labels.craftTime" prop="craftTime">
          <el-input-number
            v-model="addFrom.craftTime"
            controls-position="right"
            :min="1"
          ></el-input-number>
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
/* 导入路径(改) */
import ljc from "../input/input";
import ljcPublic from "../public/public";
export default {
  props: {
    processingFactoryId: {},
    labels: {},
  },
  data() {
    return {
      model: new ljc(this),
      public: new ljcPublic(this),

      // 表单名称(改)
      formTitle: "添加加工投入品",

      // 控制添加表单的显示与隐藏
      addDialogVisible: false,

      // 添加信息
      addFrom: {},

      // 日期
      inputDate: "",
    };
  },
  computed: {
    // 管理员数组(按需改)
    createPersonList() {
      return this.public.createPersonList;
    },

    // 验证规则
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
        /* 传入表单逻辑处理开始（按需改） */
        this.addFrom.processingFactoryId = this.processingFactoryId;
        /* 传入表单逻辑处理结束 */
        const { data: res } = await this.model.addInfo(this.addFrom);
        if (res.statusCode == 20000) {
          this.$message.success(res.message);
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

