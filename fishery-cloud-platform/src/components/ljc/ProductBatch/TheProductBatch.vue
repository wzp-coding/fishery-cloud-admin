<template>
  <div>
    <!-- 表格开始 -->
    <Table :labels="labels" :func="getAllInfo">
      <template #handle="slotProps">
        {{ slotProps.data }}
        <Form
          :id="slotProps.data.id"
          :Fdata="dataAdd"
          :data="dataF"
          :submitFn="addOrder"
          :GetInfoFn="getInfoById"
        >
          <template slot-scope="scopeItem">
            <FormItem :scope="scopeItem" />
          </template>
        </Form>
      </template>
    </Table>
    <!-- 表格结束 -->
  </div>
</template>
<script>
import ljc from "./ProductBatch";
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
      dataAdd: {
        tooltip: {
          tipDisabled: false,
          tipContent: "添加订单",
          placement: "top",
        },
        button: {
          type: "success",
          icon: "el-icon-download",
          size: "mini",
          text: "",
        },
        form: {
          labels: this.formLabels,
          formRules: this.formRules,
          title: "添加订单",
        },
      },

      // 表单数据
      dataF: {},
    };
  },
  computed: {
    // 标签
    labels() {
      return this.model.labels;
    },

    // 表单标签
    formLabels() {
      return this.model.formLabels;
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

    // 添加订单
    async addOrder(form) {
      const { data: res } = await this.model.addOrder(form);
      console.log(res);
    },
  },
};
</script>

<style scoped>
</style>
