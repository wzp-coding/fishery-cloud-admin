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
        prop="inputName"
        :label="labels.inputName"
      ></el-table-column>
      <el-table-column
        prop="supplierPhone"
        :label="labels.supplierPhone"
      ></el-table-column>
      <el-table-column
        prop="specification"
        :label="labels.specification"
      ></el-table-column>
      <el-table-column
        prop="inputProduceDate"
        :label="labels.inputProduceDate"
      ></el-table-column>
      <el-table-column
        prop="supplierAddr"
        :label="labels.supplierAddr"
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
import Edit from "../input/Edit";
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

