<template>
  <div>
    <!-- 修改按钮开始 -->
    <el-button
      type="primary"
      icon="el-icon-edit"
      size="mini"
      @click="getInfoById()"
      v-auth="'traceability_process'"
    ></el-button>
    <!-- 修改按钮结束 -->

    <!-- 修改表单区域开始 -->
    <el-dialog
      :title="formTitle"
      :visible.sync="editDialogVisible"
      @close="editDialogClosed"
      width="40%"
    >
      <!-- 表单信息(按需改) -->
      <el-form
        :model="editForm"
        ref="editFormRef"
        :rules="formRules"
        label-width="100px"
        label-position="left"
        :hide-required-asterisk="true"
      >
        <el-form-item :label="labels.inputName" prop="inputName">
          <el-input v-model="editForm.inputName"></el-input>
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
          <el-select v-model="editForm.inspector">
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
            v-model="editForm.specification"
            controls-position="right"
            :min="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item :label="labels.supplierName" prop="supplierName">
          <el-input v-model="editForm.supplierName"></el-input>
        </el-form-item>
        <el-form-item :label="labels.supplierAddr" prop="supplierAddr">
          <el-input v-model="editForm.supplierAddr"></el-input>
        </el-form-item>
        <el-form-item :label="labels.supplierPhone" prop="supplierPhone">
          <el-input v-model="editForm.supplierPhone"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="labels.inputPicture">
              <el-button
                type="primary"
                @click="inputPictureVis = true"
                style="margin-left: 8px"
                >上传{{ labels.inputPicture }}</el-button
              >
              <UploadFile
                :is-open="inputPictureVis"
                :close-modal="() => (this.inputPictureVis = false)"
                :type="'image'"
                :init-files="editForm.inputPicture"
                :upload-success="inputPicturePic"
              ></UploadFile>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item :label="labels.supplierLicense">
              <el-button
                type="primary"
                @click="supplierLicenseVis = true"
                style="margin-left: 8px"
                >上传{{ labels.supplierLicense }}</el-button
              >
              <UploadFile
                :is-open="supplierLicenseVis"
                :close-modal="() => (this.supplierLicenseVis = false)"
                :type="'image'"
                :init-files="editForm.supplierLicense"
                :upload-success="supplierLicensePic"
              ></UploadFile>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加表单区域结束 -->
  </div>
</template>
<script>
/* 路径（按需改） */
import ljc from "../input/input";
import TheUploadPic from "../public/uploadPic";
export default {
  components: {
    TheUploadPic,
  },
  props: {
    id: {},
    /* 传入参数按需改 */
    processingFactoryId: {},
    labels: {},
    createPersonList: {},
  },
  data() {
    return {
      model: new ljc(this),
      // 表单名称(改)
      formTitle: "修改加工投入品",

      // 控制表单的显示与隐藏
      editDialogVisible: false,

      inputPictureVis: false,
      supplierLicenseVis: false,

      // 修改信息
      editForm: {},

      // 有效期
      inputDate: [],
    };
  },
  computed: {
    // 验证规则
    formRules() {
      return this.model.formRules;
    },
  },
  created() {},
  methods: {
    // 所有文件上传完成触发
    inputPicturePic(fileStr) {
      this.editForm.inputPicture = fileStr;
    },
    supplierLicensePic(fileStr) {
      this.editForm.supplierLicense = fileStr;
    },

    /* 根据Id查询信息开始 */
    async getInfoById() {
      const { data: res } = await this.model.getInfoById(this.id);
      this.editForm = res.data;
      this.inputDate.push(this.editForm.inputProduceDate);
      this.inputDate.push(this.editForm.inputExpireDate);
      this.editDialogVisible = true;
    },
    /* 根据Id查询信息结束 */

    /* 修改开始 */
    editInfo() {
      this.$refs.editFormRef.validate(async (val) => {
        if (!val) return false;
        /* 传入表单逻辑处理开始 */
        this.editForm.processingFactoryId = this.processingFactoryId;
        this.editForm.inputProduceDate = this.inputDate[0];
        this.editForm.inputExpireDate = this.inputDate[1];
        console.log(this.editForm);
        /* 传入表单逻辑处理结束 */
        const { data: res } = await this.model.editInfo(this.editForm);
        if (res.statusCode == 20000) {
          this.$emit("getAllInfo");
          this.editDialogVisible = false;
          this.elMessage.success(res.message);
        } else {
          this.elMessage.error(res.message);
        }
      });
    },
    /* 修改结束 */

    /* 监听窗口关闭事件开始 */
    editDialogClosed() {
      this.editForm = {};
      this.inputDate = [];
      this.$refs.editFormRef.resetFields();
    },
    /* 监听窗口关闭事件关闭 */
  },
};
</script>


