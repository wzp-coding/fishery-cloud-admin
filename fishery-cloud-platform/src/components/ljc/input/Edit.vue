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
      <!-- 表单信息（按需改） -->
      <el-form
        :model="editForm"
        ref="editFormRef"
        :rules="formRules"
        label-width="100px"
        label-position="left"
        :hide-required-asterisk="true"
      >
        <el-form-item :label="labels.craftName" prop="craftName">
          <el-input v-model="editForm.craftName"></el-input>
        </el-form-item>
        <el-form-item :label="labels.craftDescription" prop="craftDescription">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="editForm.craftDescription"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="labels.craftResponsible" prop="craftResponsible">
          <el-select v-model="editForm.craftResponsible">
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
            v-model="editForm.craftTime"
            controls-position="right"
            :min="1"
          ></el-input-number>
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
/* 路径（按需改） */
import ljc from "../input/input";
import ljcPublic from "../public/public";
export default {
  props: {
    id: {},
    /* 传入参数按需改 */
    processingFactoryId: {},
    labels: {},
  },
  data() {
    return {
      model: new ljc(this),
      public: new ljcPublic(this),
      // 表单名称(改)
      formTitle: "修改加工投入品",

      // 控制表单的显示与隐藏
      editDialogVisible: false,

      // 修改信息
      editForm: {},
    };
  },
  computed: {
    // 管理员数组（按需改）
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
      this.editForm = res.data;
      this.editDialogVisible = true;
    },
    /* 根据Id查询信息结束 */

    /* 修改开始 */
    editInfo() {
      this.$refs.editFormRef.validate(async (val) => {
        if (!val) return false;
        /* 传入表单逻辑处理开始 */
        this.editForm.processingFactoryId = this.processingFactoryId;
        /* 传入表单逻辑处理结束 */
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


