<template>
  <div>
    <!-- 表格开始 -->
    <el-table
      :data="allList"
      border
      stripe
      :header-cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index"> </el-table-column>
      <el-table-column
        prop="id"
        :label="labels.id"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="productName"
        :label="labels.productName"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="commodityId"
        :label="labels.commodityId"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="inventory"
        :label="labels.inventory"
        align="center"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row :gutter="10">
            <el-col :span="6">
              <Edit
                :id="scope.row.id"
                :labels="labels"
                :title="title"
                :commoditIds="commoditIds"
                @getAllInfo="getAllInfo()"
              />
            </el-col>
            <el-col :span="6">
              <el-tooltip
                effect="dark"
                content="产品资质"
                placement="top"
                :enterable="false"
              >
                <Form :id="scope.row.id" />
              </el-tooltip>
            </el-col>

            <el-col :span="6">
              <el-tooltip
                effect="dark"
                :content="buttonInfo"
                placement="top"
                :enterable="false"
              >
                <Into
                  :id="scope.row.id"
                  type="warning"
                  icon="el-icon-d-arrow-right"
                  size="mini"
                  :path="path"
                  :otherQuery="otherQuery"
                />
              </el-tooltip>
            </el-col>
            <el-col :span="6">
              <Delete
                :id="scope.row.id"
                :title="title"
                :root="root"
                :deleteUrl="deleteUrl"
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
import Delete from "../public/delete";
import Into from "../public/into";
import Edit from "../product/Edit";
import Form from "../qualification/Form";

export default {
  components: {
    Delete,
    Edit,
    Into,
    Form,
  },
  props: {
    // 表格数据
    allList: {},

    // 数据标签
    labels: {},

    // 主题
    title: {},

    // 加工厂编号
    processingFactoryId: {},

    commoditIds: {},
  },
  data() {
    return {
      // 跳转信息
      buttonInfo: "查看工艺",

      // 跳转路径
      path: "/info-craft",

      // 删除接口的根路径标签
      root: "plant",

      // 删除接口的路径
      deleteUrl: "/processingFactory/product",
    };
  },
  created() {},
  computed: {
    // 跳转的其他参数对象
    otherQuery() {
      return { processingFactoryId: this.processingFactoryId };
    },
  },
  methods: {
    getAllInfo() {
      this.$emit("getAllInfo");
    },
  },
};
</script>

