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
        <el-form-item :label="labels.productName" prop="productName">
          <el-input v-model="editForm.productName"></el-input>
        </el-form-item>
        <el-form-item :label="labels.germchitId" prop="germchitId">
          <el-select v-model="editForm.germchitId">
            <el-option
              v-for="item in germchitIds"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
import ljc from "../product/product";
export default {
  props: {
    id: {},
    labels: {},
  },
  data() {
    return {
      model: new ljc(this),
      // 表单名称
      formTitle: "修改加工产品信息",

      // 控制表单的显示与隐藏
      editDialogVisible: false,

      // 修改信息
      editForm: {},
    };
  },
  computed: {
    // 种苗信息
    germchitIds() {
      return this.model.germchitIds;
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

