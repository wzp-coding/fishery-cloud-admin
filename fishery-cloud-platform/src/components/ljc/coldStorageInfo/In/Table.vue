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
        prop="refrigeratoryInTime"
        :label="labels.refrigeratoryInTime"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="refrigeratoryInCapacity"
        :label="labels.refrigeratoryInCapacity"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="warehousingPersonId"
        :label="labels.warehousingPersonId"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="refrigeratoryInDescription"
        :label="labels.refrigeratoryInDescription"
        align="center"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row :gutter="20">
            <el-col :span="8">
              <Edit
                :id="scope.row.id"
                :labels="labels"
                :createPersonList="createPersonList"
                :seedInfo="seedInfo"
                @getAllInfo="getAllInfo()"
              />
            </el-col>
            <el-col :span="8">
              <el-tooltip
                effect="dark"
                content="创建订单"
                placement="top"
                :enterable="false"
              >
                <Out
                  :id="scope.row.id"
                  :createPersonList="createPersonList"
                />


              </el-tooltip>
            </el-col>
            <el-col :span="8">
              <Delete
                :id="scope.row.id"
                :root="root"
                :title="title"
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
import Out from "../../order/form";
import Edit from "./Edit";
export default {
  components: {
    Delete,
    Edit,
    Out,
  },
  props: {
    // 表格数据
    allList: {},

    // 数据标签
    labels: {},

    createPersonList: {},

    seedInfo: {},
  },
  data() {
    return {
      // 标题信息
      title: "入库信息",

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

