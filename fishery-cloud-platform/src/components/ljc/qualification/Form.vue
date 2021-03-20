<template>
  <div>
    <!-- 修改按钮开始 -->
    <el-button
      type="success"
      icon="el-icon-document"
      size="mini"
      @click="getInfoById()"
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
        <el-form-item :label="labels.productInfo" prop="inputName">
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
            @click="isOpenUpload = true"
            style="margin-left: 8px"
            >上传{{ labels.inspectionReport }}</el-button
          >
          <UploadFile
            :is-open="isOpenUpload"
            :close-modal="() => (this.isOpenUpload = false)"
            :type="'image'"
            :init-files="form.inspectionReport"
            :upload-success="inspectionReportPic"
          ></UploadFile>
        </el-form-item>

        <!-- <el-form-item :label="labels.inspectionReport">
          <TheUploadPic
            :picLimit="picLimit"
            :uploadUrl="uploadUrl"
            :imageUrlArray="
              this.form.inspectionReport == ''
                ? []
                : [{ url: this.form.inspectionReport }]
            "
            tag="inspectionReport"
            @getPic="getPic"
          />
        </el-form-item> -->
        <el-form-item :label="labels.license">
          <TheUploadPic
            :picLimit="picLimit"
            :uploadUrl="uploadUrl"
            :imageUrlArray="
              this.form.inspectionReport == ''
                ? []
                : [{ url: this.form.license }]
            "
            tag="license"
            @getPic="getPic"
          />
        </el-form-item>
        <el-form-item :label="labels.qualityCertificate">
          <TheUploadPic
            :picLimit="picLimit"
            :uploadUrl="uploadUrl"
            :imageUrlArray="
              this.form.inspectionReport == ''
                ? []
                : [{ url: this.form.qualityCertificate }]
            "
            tag="qualityCertificate"
            @getPic="getPic"
          />
        </el-form-item>
        <el-form-item :label="labels.safetyCertificate">
          <TheUploadPic
            :picLimit="picLimit"
            :uploadUrl="uploadUrl"
            :imageUrlArray="
              this.form.inspectionReport == ''
                ? []
                : [{ url: this.form.safetyCertificate }]
            "
            tag="safetyCertificate"
            @getPic="getPic"
          />
        </el-form-item>
        <el-form-item :label="labels.standard">
          <TheUploadPic
            :picLimit="picLimit"
            :uploadUrl="uploadUrl"
            :imageUrlArray="
              this.form.inspectionReport == ''
                ? []
                : [{ url: this.form.standard }]
            "
            tag="standard"
            @getPic="getPic"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="success"
          v-if="this.form.inspectionReport == ''"
          @click="addInfo()"
          >创建</el-button
        >
        <el-button
          type="primary"
          v-if="this.form.inspectionReport != ''"
          @click="editInfo()"
          >修改</el-button
        >
        <el-button
          type="danger"
          v-if="this.form.inspectionReport != ''"
          @click="removeById()"
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
import TheUploadPic from "../public/uploadPic";
import UploadFile from "../../public_components/UploadFile";
export default {
  components: {
    UploadFile,
    TheUploadPic,
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

      isOpenUpload: false,

      form: {},

      // 限制照片个数
      picLimit: 1,
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

    /* 根据Id查询信息 */
    async getInfoById() {
      const { data: res } = await this.model.getInfoById(this.id);
      console.log(res);
      if (res.data == null) {
        this.form = {
          inspectionReport: "",
          license: "",
          productInfo: "",
          productId: this.id,
          qualityCertificate: "",
          safetyCertificate: "",
          standard: "",
        };
      } else {
        this.form = res.data;
      }
      this.dialogVisible = true;
    },

    /* 添加 */
    addInfo() {
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

    /* 接收上传组件的照片信息开始 */
    getPic(tag, res) {
      // 字符串转对象
      let picUrl = eval("(" + res + ")").url;
      switch (tag) {
        case "inspectionReport":
          this.form.inspectionReport = picUrl;
          break;
        case "license":
          this.form.license = picUrl;
          break;
        case "standard":
          this.form.standard = picUrl;
          break;
        case "qualityCertificate":
          this.form.qualityCertificate = picUrl;
          break;
        case "safetyCertificate":
          this.form.safetyCertificate = picUrl;
          break;
      }
    },
    /* 接收上传组件的照片信息结束 */
  },
};
</script>


