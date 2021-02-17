<template>
  <div>
    <!-- 面包屑导航区开始 -->
    <Breadcrumb :breadcrumbInfo="breadcrumbInfo" />
    <!-- 面包屑导航区结束 -->

    <!-- 卡片视图开始 -->
    <el-card>
      <!-- 标题区域开始 -->
      <el-page-header @back="goBack" :content="myTitle"> </el-page-header>
      <!-- 标题区域结束 -->

      <!-- 添加区域开始 -->
      <Add
        @getAllInfo="getAllInfo()"
        :labels="labels"
        :craftId="craftId"
        :inputInfo="inputInfo"
      />
      <!-- 添加区域结束 -->

      <!-- 列表区域开始 -->
      <Table
        :allList="allList"
        :labels="labels"
        :title="myTitle"
        :craftId="craftId"
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
    </el-card>
    <!-- 卡片视图结束 -->
  </div>
</template>
<script>
import ljc from "../../components/ljc/craftInput/craftInput";
import Breadcrumb from "../../components/ljc/public/breadcrumb";
import Pagination from "../../components/ljc/public/pagination";
import Add from "../../components/ljc/craftInput/Add";
import Table from "../../components/ljc/craftInput/Table";

export default {
  components: {
    Breadcrumb,
    Pagination,
    Add,
    Table,
  },
  data() {
    return {
      // js
      model: new ljc(this),

      //  面包屑导航
      breadcrumbInfo: ["养殖生产", "加工厂", "加工信息管理", "工艺投入品信息"],

      // 标题信息
      myTitle: "工艺投入品信息",

      // 数据总条数
      total: 0,

      // 当前页码,
      pageNum: 1,

      // 每页显示总条数
      pageSize: 4,

      // 总数据
      allList: [],

      // 所有投入品信息
      inputInfo: [],
    };
  },
  computed: {
    // 标签
    labels() {
      return this.model.labels;
    },

    // 工艺ID
    craftId() {
      return this.$route.query.ID;
    },

    // 工厂Id
    processingFactoryId() {
      return this.$route.query.processingFactoryId;
    },
  },
  created() {
    this.getAllInfo();
    this.getInputInfo();
  },
  methods: {
    /* 返回开始 */
    goBack() {
      this.$router.push({
        path: "/info-plant",
        // 防止返回的时候工厂编号的丢失
        query: { ID: this.$route.query.processingFactoryId },
      });
    },
    /* 返回结束 */

    /* 获取全部工艺信息开始 */
    async getInputInfo() {
      const { data: res } = await this.model.getInputInfo(
        this.processingFactoryId
      );
      this.inputInfo.push(res.data);
    },
    /* 获取全部工艺信息结束 */

    // 获取表格信息
    async getAllInfo(pageSize, pageNum) {
      if (pageNum == null || pageSize == null) {
        pageNum = this.pageNum;
        pageSize = this.pageSize;
      }
      this.pageNum = pageNum;
      this.pageSize = pageSize;
      const { data: res } = await this.model.getAllInfo(
        this.craftId,
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
