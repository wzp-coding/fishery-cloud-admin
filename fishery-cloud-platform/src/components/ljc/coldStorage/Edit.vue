<template>
  <div>
    <!-- 修改按钮开始 -->
    <el-button
      type="primary"
      icon="el-icon-edit"
      size="mini"
      @click="getInfoById()"
    ></el-button>
    <!-- 修改按钮结束 -->

    <!-- 修改表单区域开始 -->
    <el-dialog
      :title="formTitle"
      :visible.sync="editDialogVisible"
      @close="editDialogClosed"
      width="40%"
    >
      <el-form
        :model="editForm"
        ref="editFormRef"
        :rules="formRules"
        label-width="100px"
        label-position="left"
        :hide-required-asterisk="true"
      >
        <el-form-item
          :label="labels.refrigeratoryName"
          prop="refrigeratoryName"
        >
          <el-input v-model="editForm.refrigeratoryName"></el-input>
        </el-form-item>
        <el-form-item
          :label="labels.refrigeratoryAddress"
          prop="refrigeratoryAddress"
        >
          <el-input v-model="editForm.refrigeratoryAddress"></el-input>
        </el-form-item>
        <el-form-item
          :label="labels.refrigeratoryIntroduce"
          prop="refrigeratoryIntroduce"
        >
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="editForm.refrigeratoryIntroduce"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          :label="labels.refrigeratoryCapacity"
          prop="refrigeratoryCapacity"
        >
          <el-input-number
            v-model="editForm.refrigeratoryCapacity"
            controls-position="right"
            :min="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          :label="labels.refrigeratoryTemperaturel"
          prop="refrigeratoryTemperaturel"
        >
          <el-input-number
            v-model="editForm.refrigeratoryTemperaturel"
            controls-position="right"
          ></el-input-number>
        </el-form-item>
        <el-form-item :label="labels.createPersonId" prop="createPersonId">
          <el-select v-model="editForm.createPersonId">
            <el-option
              v-for="item in createPersonList"
              :key="item.id"
              :label="item.personName"
              :value="item.personName"
            >
            </el-option>
          </el-select>
        </el-form-item>
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
import ljc from "../coldStorage/coldStorage";
import ljcPublic from "../public/public";
export default {
  props: {
    id: {},
    labels: {},
  },
  data() {
    return {
      model: new ljc(this),
      public: new ljcPublic(this),
      // 表单名称
      formTitle: "修改冷库信息",

      // 控制表单的显示与隐藏
      editDialogVisible: false,

      // 修改信息
      editForm: {},
    };
  },
  computed: {
    // 管理员数组
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
    /* 根据Id查询信息开始 */
    async getInfoById() {
      const { data: res } = await this.model.getInfoById(this.id);
      this.editForm = res.data[0];
      this.editDialogVisible = true;
    },
    /* 根据Id查询信息结束 */

    /* 修改开始 */
    editInfo() {
      this.$refs.editFormRef.validate(async (val) => {
        if (!val) return false;
        this.editForm.processingFactoryId = this.processingFactoryId;
        const { data: res } = await this.model.editInfo(this.editForm);
        if (res.statusCode == 20000) {
          this.$emit("getAllInfo");
          this.editDialogVisible = false;
          this.$message.success(res.message);
        }
      });
    },
    /* 修改结束 */

    /* 监听窗口关闭事件开始 */
    editDialogClosed() {
      this.editForm = {};
      this.$refs.editFormRef.resetFields();
    },
    /* 监听窗口关闭事件关闭 */
  },
};
</script>


