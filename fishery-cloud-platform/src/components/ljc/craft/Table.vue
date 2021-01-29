<template>
  <div>
    <!-- 表格开始 -->
    <el-table
      :data="allList"
      border
      stripe
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="id" :label="labels.id"></el-table-column>
      <el-table-column
        prop="craftName"
        :label="labels.craftName"
      ></el-table-column>
      <el-table-column
        prop="craftDescription"
        :label="labels.craftDescription"
      ></el-table-column>
      <el-table-column
        prop="craftResponsible"
        :label="labels.craftResponsible"
      ></el-table-column>
      <el-table-column
        prop="craftTime"
        :label="labels.craftTime"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row :gutter="20">
            <el-col :span="8">
              <Edit
                :id="scope.row.id"
                :processingFactoryId="processingFactoryId"
                :labels="labels"
                :title="title"
                @getAllInfo="getAllInfo()"
              />
            </el-col>
            <el-col :span="8">
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

            <el-col :span="8">
              <Delete
                tag="craft"
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
import Delete from "../public/delete";
import Edit from "../craft/Edit";
import Into from "../public/into";
export default {
  components: {
    Delete,
    Edit,
    Into,
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
  },
  data() {
    return {
      // 跳转信息
      buttonInfo: "查看投入品",

      // 跳转路径
      path: "/info-input",
    };
  },
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

