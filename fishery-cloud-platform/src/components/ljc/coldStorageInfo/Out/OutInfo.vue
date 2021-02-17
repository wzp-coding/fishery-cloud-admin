<template>
  <div>
    <!-- 列表区域开始 -->
    <Table
      :allList="allList"
      :labels="labels"
      @getAllInfo="getAllInfo()"
    />
    <!-- 列表区域结束 -->

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
import ljc from "./Out";
import Pagination from "../../public/pagination";
import Table from "./Table";

export default {
  components: {
    Pagination,
    Table,
  },
  data() {
    return {
      // js
      model: new ljc(this),

      // 数据总条数
      total: 0,

      // 当前页码,
      pageNum: 1,

      // 每页显示总条数
      pageSize: 4,

      // 总数据
      allList: [],
    };
  },
  computed: {
    // 标签
    labels() {
      return this.model.labels;
    },

    // ID
    outId() {
      return this.$route.query.ID;
    },
  },
  created() {
    this.getAllInfo();
    this.getInputInfo();
  },
  methods: {
    /* 获取全部信息开始 */
    async getInputInfo() {
      const { data: res } = await this.model.getInputInfo(
        this.processingFactoryId
      );
      this.inputInfo.push(res.data);
    },
    /* 获取全部信息结束 */

    // 获取表格信息
    async getAllInfo(pageSize, pageNum) {
      if (pageNum == null || pageSize == null) {
        pageNum = this.pageNum;
        pageSize = this.pageSize;
      }
      this.pageNum = pageNum;
      this.pageSize = pageSize;
      const { data: res } = await this.model.getAllInfo(
        this.outId,
        pageNum,
        pageSize
      );
      if (res.statusCode !== 20000) {
        this.$message.error(res.message);
      }
      this.allList = [];
      this.allList.push(res.data.records);
      this.total = res.data.total;
    },
  },
};
</script>

<style lang="less" scoped>
.steps {
  margin-top: 20px;
}
</style>
