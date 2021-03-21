<template>
  <div>
    <!-- 修改按钮开始 -->
    <el-button
      type="primary"
      icon="el-icon-edit"
      size="mini"
      @click="getInfoById()"
      v-auth="'traceability_refrigeratory'"
    ></el-button>
    <!-- 修改按钮结束 -->

    <!-- 修改表单区域开始 -->
    <el-dialog
      :title="formTitle"
      :visible.sync="dialogVisible"
      @close="dialogClosed"
      width="40%"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="100px"
        label-position="left"
        :hide-required-asterisk="true"
      >
        <el-form-item :label="labels.productName">
          <el-select v-model="productInfo" value-key="germchitSpecies">
            <el-option
              v-for="item in seedInfo"
              :key="item.id"
              :label="item.germchitSpecies"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          :label="labels.warehousingPersonId"
          prop="warehousingPersonId"
        >
          <el-select v-model="form.warehousingPersonId">
            <el-option
              v-for="item in createPersonList"
              :key="item.id"
              :label="item.username"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item
          :label="labels.refrigeratoryInCapacity"
          prop="refrigeratoryInCapacity"
        >
          <el-input-number
            v-model="form.refrigeratoryInCapacity"
            controls-position="right"
            :precision="2"
            :min="1"
          ></el-input-number>
        </el-form-item> -->
        <el-form-item
          :label="labels.refrigeratoryInDescription"
          prop="refrigeratoryInDescription"
        >
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.refrigeratoryInDescription"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          :label="labels.refrigeratoryInTime"
          prop="refrigeratoryInTime"
        >
          <el-date-picker
            v-model="form.refrigeratoryInTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加表单区域结束 -->
  </div>
</template>
<script>
import ljc from "./In";
export default {
  props: {
    id: {},
    labels: {},
    createPersonList: {},
    seedInfo: {},
  },
  data() {
    return {
      model: new ljc(this),
      // 表单名称
      formTitle: "修改入库信息",

      // 控制表单的显示与隐藏
      dialogVisible: false,

      // 信息
      form: {},

      // 产品信息
      productInfo: {},
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
      this.form = res.data;
      this.productInfo.id = this.form.processingBaseId;
      this.productInfo.germchitSpecies = this.form.productName;
      this.dialogVisible = true;
    },
    /* 根据Id查询信息结束 */

    /* 修改开始 */
    editInfo() {
      this.$refs.formRef.validate(async (val) => {
        if (!val) return false;
        this.form.processingBaseId = this.productInfo.id;
        this.form.productName = this.productInfo.germchitSpecies;
        delete this.form.refrigeratoryInUsedCapacity;
        console.log(this.form);
        const { data: res } = await this.model.editInfo(this.form);
        if (res.statusCode == 20000) {
          this.$emit("getAllInfo");
          this.dialogVisible = false;
          this.elMessage.success(res.message);
        } else {
          this.elMessage.error(res.message);
        }
      });
    },
    /* 修改结束 */

    /* 监听窗口关闭事件开始 */
    dialogClosed() {
      this.form = {};
      this.$refs.formRef.resetFields();
    },
    /* 监听窗口关闭事件关闭 */
  },
};
</script>


