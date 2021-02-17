<template>
  <div>
    <!-- 表格开始 -->
    <el-table
      :data="allList[0]"
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
        prop="refrigeratoryOutTime"
        :label="labels.refrigeratoryOutTime"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="refrigeratoryOutCapacity"
        :label="labels.refrigeratoryOutCapacity"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="warehousingPersonId"
        :label="labels.warehousingPersonId"
        align="center"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row :gutter="20">
            <el-col :span="8">
              <Edit
                :id="scope.row.id"
                :labels="labels"
                :title="title"
                @getAllInfo="getAllInfo()"
              />
            </el-col>
            <el-col :span="8">
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
import Delete from "../../public/delete";
import Edit from "./Edit";
export default {
  components: {
    Delete,
    Edit
  },
  props: {
    // 表格数据
    allList: {},

    // 数据标签
    labels: {},
  },
  data() {
    return {
      // 删除接口的根路径标签
      root: "storage",
      // 删除接口的路径
      deleteUrl: "/refrigeratoryInInfo/in",
    };
  },
  computed: {},
  methods: {
    getAllInfo() {
      this.$emit("getAllInfo");
    },
  },
};
</script>

