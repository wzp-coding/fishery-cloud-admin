<template>
  <div>
    <!-- 表格开始 -->
    <el-table
      :data="allList[0]"
      border
      stripe
      :header-cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item :label="labels.refrigeratoryName">
                  <span>{{ props.row.refrigeratoryName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="labels.createPersonId">
                  <span>{{ props.row.createPersonId }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item :label="labels.gmtCreate">
                  <span>{{ props.row.gmtCreate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="labels.gmtModified">
                  <span>{{ props.row.gmtModified }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item :label="labels.refrigeratoryAddress">
                  <span>{{ props.row.refrigeratoryAddress }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="labels.refrigeratoryIntroduce">
                  <span>{{ props.row.refrigeratoryIntroduce }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item :label="labels.refrigeratoryTemperature">
                  <span>{{ props.row.refrigeratoryTemperature }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="labels.refrigeratoryCapacity">
                  <span>{{ props.row.refrigeratoryCapacity }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        prop="id"
        :label="labels.id"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="refrigeratoryName"
        :label="labels.refrigeratoryName"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="refrigeratoryAddress"
        :label="labels.refrigeratoryAddress"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="refrigeratoryTemperature"
        :label="labels.refrigeratoryTemperature"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="refrigeratoryCapacity"
        :label="labels.refrigeratoryCapacity"
        align="center"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row :gutter="20">
            <el-col :span="6">
              <Edit
                :id="scope.row.id"
                :labels="labels"
                :title="title"
                :createPersonList="createPersonList"
                @getAllInfo="getAllInfo()"
              />
            </el-col>
            <!-- <el-col :span="6">
              <el-tooltip
                effect="dark"
                :content="infoIn"
                placement="top"
                :enterable="false"
              >
                <In
                  :scope="scope"
                  :createPersonList="createPersonList"
                  :seedInfo="seedInfo"
                  :auth="'traceability_refrigeratory'"
                />
              </el-tooltip>
            </el-col> -->
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
                :auth="'traceability_refrigeratory_delete'"
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
import Edit from "../coldStorage/Edit";
import Into from "../public/into";
// import In from "../coldStorageInfo/In/Add";
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

    createPersonList: {},

    seedInfo: {},
  },
  data() {
    return {
      // 跳转信息
      buttonInfo: "查看出入库信息",

      // 入库信息
      infoIn: "入库",

      // 跳转路径
      path: "/cold-storageInfo",

      /* 删除组件数据开始 */
      // 删除接口的根路径标签
      root: "storage",
      // 删除接口的路径
      deleteUrl: "/refrigeratory/RefrigeratoryInfo/in",
      /* 删除组件数据结束 */
    };
  },
  computed: {
    // 跳转的其他参数对象
    otherQuery() {
      return {};
    },
  },
  methods: {
    getAllInfo() {
      this.$emit("getAllInfo");
    },
  },
};
</script>

