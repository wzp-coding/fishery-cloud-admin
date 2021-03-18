<template>
  <div>
    <!-- 表格开始 -->
    <el-table
      :data="allList"
      border
      stripe
      :header-cell-style="{ 'text-align': 'center' }"
      height="600"
    >
      <el-table-column
        v-for="(val, key) in labels"
        :key="key"
        :prop="key"
        :label="val"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" v-if="handle">
        <template slot-scope="{ row }">
          <slot name="handle" :data="row"></slot>
        </template>
      </el-table-column>
      <!-- 放自定义展示形式 -->
    </el-table>
    <!-- 表格结束 -->

    <!-- 分页开始 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 分页结束 -->
  </div>
</template>


<script>
export default {
  props: {
    labels: {},
    opHandle: {},
    func: Function,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      allList: [],
    };
  },
  computed: {
    handle() {
      return this.opHandle || false;
    },
  },
  methods: {
    // 改变currentPage
    handleCurrentChange(page) {
      this.currentPage = page;
      this.func(page, this.pageSize);
    },

    // 改变size
    handleSizeChange(size) {
      this.pageSize = size;
      this.func(this.currentPage, size);
    },
  },
  async created() {
    const { total, size, page, allList } = await this.func();
    this.allList = allList;
    this.total = total;
    size ? (this.pageSize = size) : "";
    page ? (this.currentPage = page) : "";
  },
};
</script>

<style scoped>
</style>


/* 
    => 函数形式
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

    => 操作插槽： 具名：handle

    opHandle: 控制是否显示操作选项 （默认为false）

 */
