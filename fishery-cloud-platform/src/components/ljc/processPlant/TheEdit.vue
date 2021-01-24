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
    >
      <el-form :model="editForm" ref="editFormRef" :rules="editFormRules">
        <el-form-item
          :label="labels.processingFactoryName"
          prop="processingFactoryName"
        >
          <el-input v-model="editForm.processingFactoryName"></el-input>
        </el-form-item>
        <el-form-item
          :label="labels.processingFactoryAddress"
          prop="processingFactoryAddress"
        >
          <el-input v-model="editForm.processingFactoryAddress"></el-input>
        </el-form-item>
        <el-form-item :label="labels.createPersonId" prop="createPersonId">
          <el-select v-model="editForm.createPersonId">
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
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加表单区域结束 -->
  </div>
</template>
<script>
const model = require("../processPlant/processPlant");
export default {
  props: {
    id: {},
    baseId: {},
    labels: {},
  },
  data() {
    return {
      // 表单名称
      formTitle: "修改加工厂",

      // 控制表单的显示与隐藏
      editDialogVisible: false,

      // 修改信息
      editForm: {},

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
      successInfo: "修改加工厂成功！！",
      errorInfo: "加工厂已存在，请重新输入",
      /* 提示信息结束 */

      /* 表单验证规则对象开始 */
      editFormRules: {
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
    /* 修改加工厂开始 */
    editInfo() {
      this.$refs.editFormRef.validate(async (val) => {
        if (!val) return false;
        const { data: res } = await model.editInfo(this.editForm);
        console.log(res);
        if (res.statusCode == 20000) {
          this.$emit("getAllInfo");
          this.editDialogVisible = false;
          this.$message.success(res.message);
        }
      });
    },
    /* 修改加工厂结束 */

    /* 监听窗口关闭事件开始 */
    editDialogClosed() {
      this.editForm = {};
      this.$refs.editFormRef.resetFields();
    },
    /* 监听窗口关闭事件关闭 */

    /* 根据Id查询工厂信息开始 */
    async getInfoById() {
      const { data: res } = await model.getInfoById(this.id);
      this.editForm = res.data;
      this.editDialogVisible = true;
    },
    /* 根据Id查询工厂信息结束 */
  },
};
</script>

