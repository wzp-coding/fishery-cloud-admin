<template>
  <div>
    <!-- 面包屑导航开始 -->
    <TheBreadcrumb :breadcrumbInfo="breadcrumbInfo" />
    <!-- 面包屑导航结束 -->

    <!-- 卡片视图区域开始 -->
    <el-card>
      <!-- 标题区域开始 -->
      <TheTitle :myTitle="myTitle" :icon="icon" />
      <!-- 标题区域结束 -->

      <!-- 搜索添加区域开始 -->
      <TheSeekAdd
        @changeAddDialogVisible="changeAddDialogVisible()"
        @getAllInfo="getAllInfo()"
        :labels="labels"
        :baseId="baseId"
      />
      <!-- 搜索添加区域结束 -->

      <!-- 列表区域开始 -->
      <ThePlantTable
        :plantList="plantList"
        :labels="labels"
        :title="myTitle"
        @getAllInfo="getAllInfo()"
      />
      <!-- 列表区域结束 -->

      <!-- 换页开始 -->
      <ThePagination
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
import ljc from "../components/ljc/processPlant/processPlant";
import TheBreadcrumb from "../components/ljc/public/breadcrumb";
import TheTitle from "../components/ljc/public/title";
import TheSeekAdd from "../components/ljc/processPlant/TheSeekAdd";
import ThePlantTable from "../components/ljc/processPlant/TheTable";
import ThePagination from "../components/ljc/public/pagination";

export default {
  components: {
    TheBreadcrumb,
    TheTitle,
    TheSeekAdd,
    ThePlantTable,
    ThePagination,
  },
  data() {
    return {
      // js
      model: new ljc(this),
      // 标题图标
      icon: "el-icon-house",
      // 面包屑导航信息
      breadcrumbInfo: ["养殖生产", "加工厂"],
      // 标题信息
      myTitle: "加工厂",
      // 基地Id
      baseId: "123456",
      // 数据总条数
      total: 0,
      // 当前页码,
      pageNum: 1,
      // 每页显示总条数
      pageSize: 4,
      // 总数据
      plantList: [],
      // 获取总数据错误信息
      getErrorInfo: "获取加工厂信息失败",
    };
  },
  computed: {
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
      await this.model
        .getAllInfo(this.baseId, pageNum, pageSize)
        .then((val) => {
          if (val.status !== 200) {
            this.$message.error(this.getErrorInfo);
          }
          this.plantList = [];
          this.plantList.push(val.data.data.records);
          this.total = val.data.data.total;
        });
    },
  },
};
</script>

