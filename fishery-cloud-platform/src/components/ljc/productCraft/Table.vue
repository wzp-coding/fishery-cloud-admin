<template>
  <div>
    <!-- 表格开始 -->
    <el-table
      :data="allLists"
      border
      stripe
      :header-cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column
        prop="sort"
        :label="labels.sort"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="id"
        :label="labels.id"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="craftName"
        :label="labels.craftName"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="craftDescription"
        :label="labels.craftDescription"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="craftResponsible"
        :label="labels.craftResponsible"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="craftTime"
        :label="labels.craftTime"
        align="center"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row :gutter="20">
            <el-col :span="8">
              <Edit
                :sort="scope.row.sort"
                :id="scope.row.id"
                :productId="productId"
                :labels="labels"
                :title="title"
                :craftInfos="craftInfos"
                @getAllInfo="getAllInfo()"
              />
            </el-col>

            <el-col :span="8">
              <Delete
                :id="scope.row.sort"
                :title="title"
                :root="root"
                :deleteUrl="deleteUrl"
                @getAllInfo="getAllInfo()"
                :auth="'traceability_process'"
              />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格结束 -->
  </div>
</template>

<script>
import Delete from "../public/delete";
import Edit from "../productCraft/Edit";
export default {
  components: {
    Delete,
    Edit,
  },
  props: {
    // 表格数据
    allList: {},

    // 数据标签
    labels: {},

    // 主题
    title: {},

    // 产品编号
    productId: {},

    // 工艺信息
    craftInfo: {},
  },
  data() {
    return {
      // 删除接口的根路径标签
      root: "plant",

      // 删除接口的路径
      deleteUrl: `/processingFactory/product/${this.productId}`,
    };
  },
  computed: {
    allLists() {
      return this.allList[0];
    },

    craftInfos() {
      return this.craftInfo[0];
    },
  },
  methods: {
    getAllInfo() {
      this.$emit("getAllInfo");
    },
  },
};
</script>

