<template>
  <div>
    <!-- 面包屑导航开始 -->
    <Breadcrumb :breadcrumbInfo="breadcrumbInfo" />
    <!-- 面包屑导航结束 -->

    <!-- 卡片视图区域开始 -->
    <el-card>
      <!-- 标题区域开始 -->
      <Title :myTitle="myTitle" :icon="icon" />
      <!-- 标题区域结束 -->

      <!-- 添加区域开始 -->
      <Add
        @getAllInfo="getAllInfo()"
        :labels="labels"
        :baseId="baseId"
        :createPersonList="createPersonList"
      />
      <!-- 添加区域结束 -->

      <!-- 列表区域开始 -->
      <Table
        :allList="allList"
        :labels="labels"
        :title="myTitle"
        :baseId="baseId"
        :createPersonList="createPersonList"
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
    <!-- 卡片视图区域结束 -->
  </div>
</template>
<script>
import ljc from "../../components/ljc/processPlant/processPlant";
import Breadcrumb from "../../components/ljc/public/breadcrumb";
import Title from "../../components/ljc/public/title";
import Add from "../../components/ljc/processPlant/Add";
import Table from "../../components/ljc/processPlant/Table";
import Pagination from "../../components/ljc/public/pagination";
import Public from "../../components/ljc/public/public";

export default {
  components: {
    Breadcrumb,
    Title,
    Add,
    Table,
    Pagination,
  },
  data() {
    return {
      // js
      model: new ljc(this),
      public: new Public(this),

      // 标题图标
      icon: "el-icon-house",
      // 面包屑导航信息
      breadcrumbInfo: ["养殖生产", "加工厂"],
      // 标题信息
      myTitle: "加工厂",
      // 数据总条数
      total: 0,
      // 当前页码,
      pageNum: 1,
      // 每页显示总条数
      pageSize: 4,
      // 总数据
      allList: [],

      createPersonList: [],
    };
  },
  computed: {
    // 标签
    labels() {
      return this.model.labels;
    },

    // 基地ID
    baseId() {
      return this.$store.state.userInfo.baseId;
    },
  },
  created() {
    this.getAllInfo();
    this.getStaff();
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
        this.baseId,
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

    // 获取员工
    async getStaff() {
      const { data: res } = await this.public.getStaff();
      this.createPersonList = res.data;
    },
  },
};
</script>

