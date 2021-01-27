<template>
  <div>
    <!-- 表格开始 -->
    <el-table :data="allList" border stripe>
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

    // 加工厂编号
    processingFactoryId: {},
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

