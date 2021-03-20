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
        v-for="(val, key) in labels"
        :key="key"
        :prop="key"
        :label="val"
        align="center"
      ></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row :gutter="20">
            <el-col :span="12">
              <Edit :scope="scope" :processingFactoryId="processingFactoryId" />
            </el-col>
            <el-col :span="12">
              <Delete
                :id="scope.row.id"
                :title="title"
                :root="root"
                :deleteUrl="deleteUrl"
                @getAllInfo="getAllInfo()"
              />
            </el-col>
          </el-row> </template></el-table-column
    ></el-table>
  </div>
</template>
      </el-table-column>
    </el-table>
    <!-- 表格结束 -->
  </div>
</template>

<script>
import Edit from "./Edit";
import Delete from "../public/delete";
export default {
  components: {
    Edit,
    Delete,
  },
  props: {
    // 表格数据
    allList: {},

    // 数据标签
    labels: {},

    // 主题
    title: {},

    processingFactoryId: {},
  },
  data() {
    return {
      root: "plant",
      deleteUrl: "/processing/job",
    };
  },
  created() {},
  computed: {},
  methods: {
    getAllInfo() {
      this.$emit("getAllInfo");
    },
  },
};
</script>

