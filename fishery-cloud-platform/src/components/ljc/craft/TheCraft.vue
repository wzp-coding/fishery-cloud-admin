<template>
  <div>
    <!-- 添加区域开始 -->
    <Add
      :labels="labels"
      :processingFactoryId="processingFactoryId"
      :createPersonList="createPersonList"
      @getAllInfo="getAllInfo"
    />
    <!-- 添加区域结束 -->

    <!-- 表格开始 -->
    <Table
      :allList="allList"
      :labels="labels"
      :title="myTitle"
      :createPersonList="createPersonList"
      :processingFactoryId="processingFactoryId"
      @getAllInfo="getAllInfo()"
    />
    <!-- 表格结束 -->

    <!-- 换页开始 -->
    <Pagination
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @getAllInfo="getAllInfo"
    />
    <!-- 换页结束 -->
  </div>
</template>
<script>
import ljc from "../craft/craft";
import Add from "../craft/Add";
import Table from "../craft/Table";
import Pagination from "../public/pagination";
export default {
  components: {
    Add,
    Table,
    Pagination,
  },
  props: {
    createPersonList: {},
  },
  data() {
    return {
      // js导入vue
      model: new ljc(this),

      // 主题
      myTitle: "加工工艺",

      // 数据总条数
      total: 0,

      // 当前页码,
      pageNum: 1,

      // 每页显示总条数
      pageSize: 4,

      // 表格数据
      allList: [],
    };
  },
  computed: {
    // 加工厂id
    processingFactoryId() {
      return this.$route.query.ID;
    },

    // 标签
    labels() {
      return this.model.labels;
    },
  },
  created() {
    this.getAllInfo();
  },
  methods: {
    // 获取表格信息
    async getAllInfo(pageSize, pageNum) {
      if (pageNum == null || pageSize == null) {
        pageNum = this.pageNum;
        pageSize = this.pageSize;
      }
      this.pageNum = pageNum;
      this.pageSize = pageSize;
      const { data: res } = await this.model.getAllInfo(
        this.processingFactoryId,
        pageNum,
        pageSize
      );
      if (res.statusCode !== 20000) {
        this.elMessage.error(res.message);
      }
      this.allList = res.data.records;
      this.total = res.data.total;
    },
  },
};
</script>

<style scoped>
</style>
