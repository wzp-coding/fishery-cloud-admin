<template>
  <div>
    <!-- 表格开始 -->
    <Table :labels="labels" :func="getAllInfo"> </Table>
    <!-- 表格结束 -->
  </div>
</template>
<script>
import ljc from "./Material";
import Table from "../public/Table";

export default {
  components: {
    Table,
  },
  props: {},
  data() {
    return {
      // js导入vue
      model: new ljc(this),
    };
  },
  computed: {
    // 标签
    labels() {
      return this.model.labels;
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
  },
};
</script>

<style scoped>
</style>
