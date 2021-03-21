<template>
  <div>
    <!-- 修改按钮开始 -->
    <el-button
      type="success"
      icon="el-icon-document"
      size="mini"
      @click="getInfoById"
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
        label-width="180px"
        label-position="left"
        :hide-required-asterisk="true"
      >
        <el-form-item :label="labels.productInfo" prop="productInfo">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.productInfo"
          >
          </el-input>
        </el-form-item>

        <el-form-item :label="labels.inspectionReport">
          <el-button
            type="primary"
            @click="inspectionReportVis = true"
            style="margin-left: 8px"
            >上传{{ labels.inspectionReport }}</el-button
          >
          <UploadFile
            :is-open="inspectionReportVis"
            :close-modal="() => (this.inspectionReportVis = false)"
            :type="'image'"
            :init-files="form.inspectionReport"
            :upload-success="inspectionReportPic"
          ></UploadFile>
        </el-form-item>

        <el-form-item :label="labels.license">
          <el-button
            type="primary"
            @click="licenseVis = true"
            style="margin-left: 8px"
            >上传{{ labels.license }}</el-button
          >
          <UploadFile
            :is-open="licenseVis"
            :close-modal="() => (this.licenseVis = false)"
            :type="'image'"
            :init-files="form.license"
            :upload-success="licensePic"
          ></UploadFile>
        </el-form-item>

        <el-form-item :label="labels.qualityCertificate">
          <el-button
            type="primary"
            @click="qualityCertificateVis = true"
            style="margin-left: 8px"
            >上传{{ labels.qualityCertificate }}</el-button
          >
          <UploadFile
            :is-open="qualityCertificateVis"
            :close-modal="() => (this.qualityCertificateVis = false)"
            :type="'image'"
            :init-files="form.qualityCertificate"
            :upload-success="qualityCertificatePic"
          ></UploadFile>
        </el-form-item>

        <el-form-item :label="labels.safetyCertificate">
          <el-button
            type="primary"
            @click="safetyCertificateVis = true"
            style="margin-left: 8px"
            >上传{{ labels.safetyCertificate }}</el-button
          >
          <UploadFile
            :is-open="safetyCertificateVis"
            :close-modal="() => (this.safetyCertificateVis = false)"
            :type="'image'"
            :init-files="form.safetyCertificate"
            :upload-success="safetyCertificatePic"
          ></UploadFile>
        </el-form-item>

        <el-form-item :label="labels.standard">
          <el-button
            type="primary"
            @click="standardVis = true"
            style="margin-left: 8px"
            >上传{{ labels.standard }}</el-button
          >
          <UploadFile
            :is-open="standardVis"
            :close-modal="() => (this.standardVis = false)"
            :type="'image'"
            :init-files="form.standard"
            :upload-success="standardPic"
          ></UploadFile>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="success" v-if="isAdd" @click="addInfo()"
          >创建</el-button
        >
        <el-button type="primary" v-if="!isAdd" @click="editInfo()"
          >修改</el-button
        >
        <el-button type="danger" v-if="!isAdd" @click="removeById()"
          >删除</el-button
        >
      </div>
    </el-dialog>
    <!-- 添加表单区域结束 -->
  </div>
</template>
<script>
/* 路径（按需改） */
import ljc from "./qualification";
import UploadFile from "../../public_components/UploadFile";
export default {
  components: {
    UploadFile,
  },
  props: {
    id: {},
  },
  data() {
    return {
      model: new ljc(this),

      // 表单名称(改)
      formTitle: "产品资质信息",

      // 控制表单的显示与隐藏
      dialogVisible: false,

      // 上传
      inspectionReportVis: false,
      licenseVis: false,
      qualityCertificateVis: false,
      safetyCertificateVis: false,
      standardVis: false,

      form: {},

      isAdd: true,
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
    // 所有文件上传完成触发
    inspectionReportPic(fileStr) {
      this.form.inspectionReport = fileStr;
    },

    licensePic(fileStr) {
      this.form.license = fileStr;
    },

    qualityCertificatePic(fileStr) {
      this.form.qualityCertificate = fileStr;
    },

    safetyCertificatePic(fileStr) {
      this.form.safetyCertificatePic = fileStr;
    },

    standardPic(fileStr) {
      this.form.standard = fileStr;
    },

    /* 根据Id查询信息 */
    async getInfoById() {
      const { data: res } = await this.model.getInfoById(this.id);
      console.log(res);
      if (res.data !== null) {
        this.form = res.data;
        this.isAdd = false;
      }
      this.dialogVisible = true;
    },

    /* 添加 */
    addInfo() {
      this.$refs.formRef.validate(async (val) => {
        if (!val) return false;
        this.form.productId = this.id;
        console.log(this.form);
        const { data: res } = await this.model.addInfo(this.form);
        console.log(res);
        if (res.statusCode == 20000) {
          this.elMessage.success(res.message);
          this.dialogVisible = false;
          this.isAdd = true;
        } else {
          this.elMessage.success(res.message);
        }
      });
    },

    // 删除
    async removeById() {
      const confirmResult = await this.elConfirm(
        `此操作将永久删除该产品资质, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        return err;
      });
      if (confirmResult !== "confirm") {
        return this.elMessage.info("已取消删除");
      }
      const { data: res } = await this.$plant.delete(
        `/processingFactory/qualification/${this.form.id}`
      );
      if (res.statusCode == 20000) {
        this.elMessage.success(res.message);
      }
      this.dialogVisible = false;
      this.isAdd = true;
    },

    /* 修改 */
    editInfo() {
      this.$refs.formRef.validate(async (val) => {
        if (!val) return false;
        const { data: res } = await this.model.editInfo(this.form);
        if (res.statusCode == 20000) {
          this.dialogVisible = false;
          this.elMessage.success(res.message);
        }
      });
    },

    /* 监听窗口关闭事件开始 */
    dialogClosed() {
      this.form = {};
      this.$refs.formRef.resetFields();
    },
    /* 监听窗口关闭事件关闭 */
  },
};
</script>


