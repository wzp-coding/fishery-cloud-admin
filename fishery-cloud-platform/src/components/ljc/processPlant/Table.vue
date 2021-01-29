<template>
  <div>
    <!-- 表格开始 -->
    <el-table
      :data="plantLists"
      border
      stripe
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      >
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="id" :label="labels.id"></el-table-column>
      <el-table-column
        prop="processingFactoryName"
        :label="labels.processingFactoryName"
      ></el-table-column>
      <el-table-column
        prop="processingFactoryAddress"
        :label="labels.processingFactoryAddress"
      ></el-table-column>
      <el-table-column
        prop="createPersonId"
        :label="labels.createPersonId"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row :gutter="10">
            <el-col :span="6">
              <Edit
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
import Edit from "../processPlant/Edit";
export default {
  components: {
    Delete,
    Edit,
    Into,
  },
  props: {
    // 表格数据
    plantList: {},

    // 数据标签
    labels: {},

    // 主题
    title: {},
  },
  data() {
    return {
      buttonInfo: "查看加工厂",
      // 跳转路径
      path: "/info-plant",

      // 路径对象
      otherQuery: {},

      // 删除接口的根路径标签
      root: "plant",

      // 删除接口的路径
      deleteUrl: "/processingFactory/factory",
    };
  },
  watch: {},
  created() {},
  methods: {
    getAllInfo() {
      this.$emit("getAllInfo");
    },
  },
  computed: {
    plantLists() {
      return this.plantList[0];
    },
  },
};
</script>
