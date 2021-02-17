<template>
  <div>
    <!-- 按钮开始 -->
    <el-button
      type="info"
      icon="el-icon-upload2"
      size="mini"
      @click="dialogVisible = true"
    ></el-button>
    <!-- 按钮结束 -->

    <!-- 表单区域开始 -->
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
          <el-select v-model="form.productInfo">
            <el-option
              v-for="item in productsList"
              :key="item.id"
              :label="item.name"
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
              :label="item.personName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="labels.refrigeratoryInCapacity"
          prop="refrigeratoryInCapacity"
        >
          <el-input-number
            v-model="form.refrigeratoryInCapacity"
            controls-position="right"
            :min="1"
          ></el-input-number>
        </el-form-item>
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
        <el-button type="primary" @click="addInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表单区域结束 -->
  </div>
</template>
<script>
import ljc from "./Out";
import ljcPublic from "../../public/public";
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: new ljc(this),
      public: new ljcPublic(this),
      // 表单名称
      formTitle: "出库",

      // 控制表单的显示与隐藏
      dialogVisible: false,

      // 修改信息
      form: {},
    };
  },
  computed: {
    // 管理员数组
    createPersonList() {
      return this.public.createPersonList;
    },

    productsList() {
      return this.public.productsList;
    },

    // 验证规则
    formRules() {
      return this.model.formRules;
    },

    // 标签
    labels() {
      return this.model.labels;
    },
  },
  created() {},
  methods: {
    /* 添加开始 */
    addInfo() {
      this.$refs.formRef.validate(async (val) => {
        if (!val) return false;
        this.form.refrigeratoryId = this.id;
        this.form.productName = this.form.productInfo.name;
        this.form.processingBaseId = this.form.productInfo.id;
        const { data: res } = await this.model.addInfo(this.form);
        console.log(res);
        if (res.statusCode == 20000) {
          this.elMessage.success(res.message);
        }
        this.$emit("getAllInfo");
        this.dialogVisible = false;
      });
    },
    /* 添加结束 */

    /* 监听窗口关闭事件开始 */
    dialogClosed() {
      this.form = {};
      this.$refs.formRef.resetFields();
    },
    /* 监听窗口关闭事件关闭 */

    change() {
      console.log(this.productInfo);
    },
  },
};
</script>


