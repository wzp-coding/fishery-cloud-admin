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
      <!-- 表单信息(按需改) -->
      <el-form
        :model="addFrom"
        ref="addFromRef"
        :rules="formRules"
        label-width="100px"
        label-position="left"
        :hide-required-asterisk="true"
      >
        <el-form-item :label="labels.inputName" prop="inputName">
          <el-input v-model="addFrom.inputName"></el-input>
        </el-form-item>
        <el-form-item label="有效期" prop="inputDate">
          <el-date-picker
            v-model="inputDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="labels.inspector" prop="inspector">
          <el-select v-model="addFrom.inspector">
            <el-option
              v-for="item in createPersonList"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="labels.specification" prop="specification">
          <el-input-number
            v-model="addFrom.specification"
            controls-position="right"
            :min="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item :label="labels.supplierName" prop="supplierName">
          <el-input v-model="addFrom.supplierName"></el-input>
        </el-form-item>
        <el-form-item :label="labels.supplierAddr" prop="supplierAddr">
          <el-input v-model="addFrom.supplierAddr"></el-input>
        </el-form-item>
        <el-form-item :label="labels.supplierPhone" prop="supplierPhone">
          <el-input v-model="addFrom.supplierPhone"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="labels.inputPicture">
              <TheUploadPic
                :picLimit="picLimitInput"
                :uploadUrl="uploadUrl"
                tag="input"
                :imageUrlArray="[]"
                @getPic="getPic"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="labels.supplierLicense">
              <TheUploadPic
                :picLimit="picLimitLicense"
                :uploadUrl="uploadUrl"
                :imageUrlArray="[]"
                @getPic="getPic"
                tag="license"
              />
            </el-form-item>
          </el-col>
        </el-row>
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
import TheUploadPic from "../public/uploadPic";
export default {
  components: {
    TheUploadPic,
  },
  props: {
    processingFactoryId: {},
    labels: {},
    createPersonList: {},
  },
  data() {
    return {
      model: new ljc(this),

      // 表单名称(改)
      formTitle: "添加加工投入品",

      // 控制添加表单的显示与隐藏
      addDialogVisible: false,

      // 添加信息
      addFrom: {},

      // 有效期
      inputDate: [],

      // 限制产品照片个数
      picLimitInput: 1,

      // 限制许可证数目
      picLimitLicense: 1,
    };
  },
  computed: {
    // 验证规则
    formRules() {
      return this.model.formRules;
    },

    // 上传路径
    uploadUrl() {
      return this.model.uploadUrl;
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
        this.addFrom.inputProduceDate = this.inputDate[0];
        this.addFrom.inputExpireDate = this.inputDate[1];
        /* 传入表单逻辑处理结束 */
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

    /* 接收上传组件的照片信息开始 */
    getPic(tag, res) {
      // 字符串转对象
      let picUrl = eval("(" + res + ")").url;
      switch (tag) {
        case "input":
          this.addFrom.inputPicture = picUrl;
          break;
        case "license":
          this.addFrom.supplierLicense = picUrl;
          break;
      }
    },
    /* 接收上传组件的照片信息结束 */
  },
};
</script>


