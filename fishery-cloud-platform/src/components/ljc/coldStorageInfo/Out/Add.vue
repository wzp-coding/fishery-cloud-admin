<template>
  <div>
    <!-- 按钮开始 -->
    <el-button
      type="warning"
      icon="el-icon-upload2"
      size="mini"
      @click="getInfoById()"
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
          <el-select v-model="form.productName" value-key="value" disabled>
            <el-option
              v-for="item in productsList"
              :key="item.value"
              :label="item.label"
              :value="item.label"
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
            :min="0"
            disabled
          ></el-input-number>
        </el-form-item>

        <el-form-item
          :label="labels.refrigeratoryOutCapacity"
          prop="refrigeratoryOutCapacity"
        >
          <el-input-number
            v-model="form.refrigeratoryOutCapacity"
            controls-position="right"
            :min="0"
            :max="form.refrigeratoryInCapacity"
          ></el-input-number>
        </el-form-item>

        <el-form-item
          :label="labels.refrigeratoryOutDescription"
          prop="refrigeratoryOutDescription"
        >
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.refrigeratoryOutDescription"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          :label="labels.refrigeratoryOutTime"
          prop="refrigeratoryOutTime"
        >
          <el-date-picker
            v-model="form.refrigeratoryOutTime"
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

      // 信息
      form: {},

      // 产品信息
      productInfo: {},
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

    // 产品
    productsList() {
      return this.public.productsList;
    },

    // 标题
    labels() {
      return this.model.labels;
    },
  },
  created() {},
  methods: {
    /* 根据Id查询信息开始 */
    async getInfoById() {
      const { data: res } = await this.model.getInfoById(this.id);
      console.log(res);
      this.form.refrigeratoryInId = res.data.id;
      this.form.productName = res.data.productName;
      this.form.refrigeratoryId = res.data.refrigeratoryId;
      this.form.refrigeratoryInCapacity = res.data.refrigeratoryInCapacity
      console.log(this.form);
      this.dialogVisible = true;
    },
    /* 根据Id查询信息结束 */

    /* 修改开始 */
    addInfo() {
      this.$refs.formRef.validate(async (val) => {
        if (!val) return false;
        console.log(this.form);
        const { data: res } = await this.model.addInfo(this.form);
        console.log(res);
        if (res.statusCode == 20000) {
          this.$emit("getAllInfo");
          this.dialogVisible = false;
          this.elMessage.success(res.message);
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


