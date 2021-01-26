<template>
  <div>
    <!-- 表格开始 -->
    <el-table :data="allList" border stripe>
      >
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="id" :label="labels.id"></el-table-column>
      <el-table-column
        prop="productName"
        :label="labels.productName"
      ></el-table-column>
      <el-table-column
        prop="germchitId"
        :label="labels.germchitId"
      ></el-table-column>
      <el-table-column
        prop="processingFactoryId"
        :label="labels.processingFactoryId"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row :gutter="10">
            <el-col :span="6">
              <TheEdit
                :id="scope.row.id"
                :labels="labels"
                :title="title"
                @getAllInfo="getAllInfo()"
              />
            </el-col>
            <el-col :span="6">
              <el-tooltip
                effect="dark"
                :content="buttonInfo"
                placement="top"
                :enterable="false"
              >
                <TheInto
                  :id="scope.row.id"
                  type="warning"
                  icon="el-icon-d-arrow-right"
                  size="mini"
                  :path="path"
                />
              </el-tooltip>
            </el-col>
            <el-col :span="6">
              <TheDelete
                tag="product"
                :id="scope.row.id"
                :title="title"
                @getAllInfo="getAllInfo()"
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
import TheDelete from "../public/delete";
import TheInto from "../public/into";
import TheEdit from "../product/TheEdit";
export default {
  components: {
    TheDelete,
    TheEdit,
    TheInto,
  },
  props: {
    // 表格数据
    allList: {},

    // 数据标签
    labels: {},

    // 主题
    title: {},

    // 跳转路径
    path: "/info-craft",

    // 跳转信息
    buttonInfo: "查看工艺",
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    getAllInfo() {
      this.$emit("getAllInfo");
    },
  },
};
</script>

