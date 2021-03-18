<template>
  <div>
    <!-- 添加区域开始 -->
    <Form :Fdata="DataAdd" :submitFn="addInfo" :GetInfoFn="getInfoById">
      <template v-slot:default="scope">
        <FormItem :scope="scope" />
      </template>
    </Form>
    <!-- 添加区域结束 -->

    <!-- 表格开始 -->
    <Table :labels="labels" :func="getAllInfo" opHandle="true">
      <template #handle="slotProps">
        <Form
          :id="slotProps.data.id"
          :Fdata="DataEdit"
          :submitFn="editInfo"
          :GetInfoFn="getInfoById"
        >
          <template slot-scope="scopeItem">
            <FormItem :scope="scopeItem" />
          </template>
        </Form>
      </template>

      <!-- <template slot-scope="scope">
          <el-row :gutter="20">
            <el-col :span="8">
              <Form></Form>
            </el-col>
            <el-col :span="8">
              <Delete
                :id="scope.row.id"
                :title="title"
                :root="root"
                :deleteUrl="deleteUrl"
                @getAllInfo="getAllInfo()"
                :auth="'traceability_refrigeratory'"
              />
            </el-col>
          </el-row>
        </template> -->
    </Table>
    <!-- 表格结束 -->
  </div>
</template>
<script>
import ljc from "./Job";
import Form from "../public/Form";
import Table from "../public/Table";
import FormItem from "./FormItem";

export default {
  components: {
    Table,
    Form,
    FormItem,
  },
  props: {},
  data() {
    return {
      // js导入vue
      model: new ljc(this),

      // 添加表单
      DataAdd: {
        tooltip: {
          tipDisabled: true,
          tipContent: "",
          placement: "top",
        },
        button: {
          type: "primary",
          icon: "",
          size: "medium",
          text: "添加加工作业",
        },
        form: {
          labels: this.labels,
          formRules: this.formRules,
          title: "添加加工作业",
        },
      },
      // 修改表单
      DataEdit: {
        tooltip: {
          tipDisabled: true,
          tipContent: "",
          placement: "top",
        },
        button: {
          type: "primary",
          icon: "el-icon-edit",
          size: "mini",
          text: "",
        },
        form: {
          labels: this.labels,
          formRules: this.formRules,
          title: "修改加工作业",
        },
      },
    };
  },
  computed: {
    // 标签
    labels() {
      return this.model.labels;
    },

    // 验证规则
    formRules() {
      return this.model.formRules;
    },

    // 基地
    baseId() {
      return this.$store.state.userInfo.baseId;
    },

    // 加工厂id
    processingFactoryId() {
      return this.$route.query.ID;
    },
  },
  created() {},
  methods: {
    // 获取表格信息
    async getAllInfo(pageSize = 1, pageNum = 4) {
      const { data: res } = await this.model.getAllInfo(
        this.processingFactoryId,
        pageSize,
        pageNum
      );
      console.log(res);
      if (res.statusCode !== 20000) {
        this.elMessage.error(res.message);
      } else {
        return {
          page: res.data.pages,
          size: res.data.size,
          total: res.data.total,
          allList: res.data.records,
        };
      }
    },

    // 通过id查询
    async getInfoById(id) {
      if (id) {
        const { data: res } = await this.model.getInfoById(id);
        return res.data;
      }
    },

    // 添加
    async addInfo(from) {
      console.log(from);
      const { data: res } = await this.model.addInfo(from);
      if (res.statusCode == 20000) {
        this.elMessage.success(res.message);
      } else {
        this.elMessage.error(res.message);
      }
    },

    // 修改
    async editInfo(form) {
      const { data: res } = await this.model.editInfo(form);
      if (res.statusCode == 20000) {
        this.elMessage.success(res.message);
      } else {
        this.elMessage.error(res.message);
      }
    },
  },
};
</script>

<style scoped>
</style>
