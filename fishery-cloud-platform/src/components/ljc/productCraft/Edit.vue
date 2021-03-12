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
      <el-form
        :model="editForm"
        ref="editFormRef"
        :rules="formRules"
        label-width="100px"
        label-position="left"
        :hide-required-asterisk="true"
      >
        <el-form-item :label="labels.sort" prop="sort">
          <el-input-number
            v-model="editForm.sort"
            controls-position="right"
            :min="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item :label="labels.id" prop="id">
          <el-select v-model="editForm.id">
            <el-option
              v-for="item in craftInfos"
              :key="item.id"
              :label="item.craftName"
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
import ljc from "../productCraft/productCraft";
export default {
  props: {
    id: {},

    // 排序
    sort: {},

    // 产品Id
    productId: {},

    // 标签
    labels: {},

    // 工艺信息
    craftInfos: {},
  },
  data() {
    return {
      model: new ljc(this),
      // 表单名称
      formTitle: "修改产品工艺信息",

      // 控制表单的显示与隐藏
      editDialogVisible: false,

      // 修改信息
      editForm: {},
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
        this.editForm.productId = this.productId;
        const { data: res } = await this.model.editInfo(this.editForm);
        if (res.statusCode == 20000) {
          this.$emit("getAllInfo");
          this.editDialogVisible = false;
          this.elMessage.success(res.message);
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


