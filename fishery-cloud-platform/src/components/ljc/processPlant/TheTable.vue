<template>
  <div>
    <!-- 表格开始 -->
    <el-table :data="plantLists" border stripe>
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
                tag="plant"
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
import TheEdit from "../processPlant/TheEdit";
export default {
  components: {
    TheDelete,
    TheEdit,
    TheInto,
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
