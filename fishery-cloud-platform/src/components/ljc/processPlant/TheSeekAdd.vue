<template>
  <div>
    <!-- 搜索添加区域开始 -->
    <el-row :gutter="20">
      <el-col :span="6"
        ><div>
          <el-input placeholder="请输入内容" v-model="seekDate">
            <el-button
              type="info"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input></div
      ></el-col>
      <el-col :span="6"
        ><div>
          <el-button type="primary" round @click="addDialogVisible = true"
            >添加</el-button
          >
        </div></el-col
      >
    </el-row>
    <!-- 搜索添加区域结束 -->

    <!-- 添加表单区域开始 -->
    <el-dialog
      :title="formTitle"
      :visible.sync="addDialogVisible"
      @close="addDialogClosed"
    >
      <el-form :model="addFrom" ref="addFromRef" :rules="addFormRules">
        <el-form-item
          :label="labels.processingFactoryName"
          prop="processingFactoryName"
        >
          <el-input v-model="addFrom.processingFactoryName"></el-input>
        </el-form-item>
        <el-form-item
          :label="labels.processingFactoryAddress"
          prop="processingFactoryAddress"
        >
          <el-input v-model="addFrom.processingFactoryAddress"></el-input>
        </el-form-item>
        <el-form-item :label="labels.createPersonId" prop="createPersonId">
          <el-select v-model="addFrom.createPersonId">
            <el-option
              v-for="item in createPersonList"
              :key="item.id"
              :label="item.personName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加表单区域结束 -->
  </div>
</template>
<script>
const model = require("../processPlant/processPlant");
export default {
  props: {
    baseId: {},
    labels: {},
  },
  data() {
    return {
      // 表单名称
      formTitle: "添加加工厂",

      // 搜索信息
      seekDate: "",

      // 控制添加表单的显示与隐藏
      addDialogVisible: false,

      // 添加信息
      addFrom: {},

      // 管理员数组
      createPersonList: [
        {
          personName: "张三",
          id: "1111",
        },
        {
          personName: "李四",
          id: "2222",
        },
      ],

      /* 提示信息开始 */
      addSuccessInfo: "添加加工厂成功！！",
      addErrorInfo: "加工厂已存在，请重新输入",
      /* 提示信息结束 */

      /* 表单验证规则对象开始 */
      addFormRules: {
        processingFactoryName: [
          { required: true, message: "请输入厂家名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "厂家名称的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        processingFactoryAddress: [
          { required: true, message: "请输入厂家地址", trigger: "blur" },
          {
            min: 2,
            message: "厂家地址至少两个字符以上",
            trigger: "blur",
          },
        ],
        createPersonId: [
          { required: true, message: "请输入创建者", trigger: "blur" },
        ],
      },

      /* 表单验证规则对象结束 */
    };
  },
  computed: {},
  created() {},
  methods: {
    /* 添加加工厂开始 */
    addInfo() {
      this.$refs.addFromRef.validate(async (val) => {
        if (!val) return false;
        this.addFrom.baseId = this.baseId;
        console.log(this.addFrom);
        await model.addInfo(this.addFrom).then((val) => {
          if (val.status !== 200) {
            this.$message.error(this.addErrorInfo);
          }
          this.$message.success(this.addSuccessInfo);
          this.$emit("getAllInfo");
          this.addDialogVisible = false;
        });
      });
    },
    /* 添加加工厂结束 */

    /* 监听窗口关闭事件开始 */
    addDialogClosed() {
      this.addFrom = {};
      this.$refs.addFromRef.resetFields();
    },
    /* 监听窗口关闭事件关闭 */
  },
};
</script>

