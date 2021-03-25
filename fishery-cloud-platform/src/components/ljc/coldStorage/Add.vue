<template>
  <div>
    <!-- 添加区域开始 -->
    <el-button
      type="primary"
      @click="addDialogVisible = true"
      v-auth="'traceability_refrigeratory_add'"
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
        label-width="120px"
        label-position="left"
        :hide-required-asterisk="true"
      >
        <el-form-item
          :label="labels.refrigeratoryName"
          prop="refrigeratoryName"
        >
          <el-input v-model="addFrom.refrigeratoryName"></el-input>
        </el-form-item>
        <el-form-item
          :label="labels.refrigeratoryAddress"
          prop="refrigeratoryAddress"
        >
          <el-input v-model="addFrom.refrigeratoryAddress"></el-input>
        </el-form-item>
        <el-form-item
          :label="labels.refrigeratoryIntroduce"
          prop="refrigeratoryIntroduce"
        >
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="addFrom.refrigeratoryIntroduce"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          :label="labels.refrigeratoryCapacity"
          prop="refrigeratoryCapacity"
        >
          <el-input-number
            v-model="addFrom.refrigeratoryCapacity"
            controls-position="right"
            :min="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          :label="labels.refrigeratoryArea"
          prop="refrigeratoryArea"
        >
          <el-input-number
            v-model="addFrom.refrigeratoryArea"
            controls-position="right"
            :min="1"
          ></el-input-number>
        </el-form-item>

        <el-form-item
          :label="labels.refrigeratoryTemperature"
          prop="refrigeratoryTemperature"
        >
          <el-input-number
            v-model="addFrom.refrigeratoryTemperature"
            controls-position="right"
          ></el-input-number>
        </el-form-item>
        <el-form-item :label="labels.createPersonId" prop="createPersonId">
          <el-select v-model="addFrom.createPersonId">
            <el-option
              v-for="item in createPersonList"
              :key="item.id"
              :label="item.username"
              :value="item.username"
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
import ljc from "../coldStorage/coldStorage";
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
      formTitle: "添加冷库",

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
  },
  methods: {
    /* 添加开始 */
    addInfo() {
      this.$refs.addFromRef.validate(async (val) => {
        if (!val) return false;
        this.addFrom.baseId = this.baseId;
        // this.addFrom.refrigeratoryPositionLatitude = "111";
        // this.addFrom.refrigeratoryPositionLongitude = "20";
        // this.addFrom.refrigeratoryUsedCapacity = "0";
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

