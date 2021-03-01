<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>渔业管理</el-breadcrumb-item>
      <el-breadcrumb-item>养殖建议</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <TheCardHead>
        <div slot="CardTitle">
          <el-col :span="4">
            <i class="el-icon-receiving"></i>
            <span>养殖建议</span>
          </el-col>
          <el-col style="float: right; width: 100px; margin-right: 10px">
            <el-button type="primary" @click="toAddInfo.dialogVisible = true"
              >添加养殖建议</el-button
            >
          </el-col>
          <el-col style="width: 75px; float: right">
            <downloadExcel :data="adviseList" name="养殖建议信息导出.xls">
              <el-tooltip
                effect="dark"
                content="导出养殖建议信息"
                placement="top-start"
                ><el-button type="success">导出</el-button></el-tooltip
              >
            </downloadExcel>
          </el-col>
        </div>
      </TheCardHead>
      <el-table :data="adviseList" border stripe>
        <el-table-column prop="name" label="品种名称"></el-table-column>
        <el-table-column prop="ph" label="适宜酸碱度"></el-table-column>
        <el-table-column
          prop="minDensity"
          label="最小养殖密度"
        ></el-table-column>
        <el-table-column
          prop="maxDensity"
          label="最大养殖密度"
        ></el-table-column>
        <el-table-column prop="salinity" label="适宜盐含量"></el-table-column>
        <el-table-column
          prop="ammoniaValue"
          label="适宜氨氮值"
        ></el-table-column>
        <el-table-column
          prop="dissolvedOxygenValue"
          label="适宜溶解氧量"
        ></el-table-column>
        <el-table-column
          prop="waterTemperature"
          label="适宜温度"
        ></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeAdvise(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加养殖建议 -->
    <addAdvise
      :toDialogInfo="toAddInfo"
      @fatherMethods="getAdviseInfo"
    ></addAdvise>
  </div>
</template>

<script>
import TheCardHead from "../../components/ccy/TheCardHead";
import addAdvise from "../../components/ccy/adviseCard/addAdvise";
export default {
  components: {
    TheCardHead,
    addAdvise,
  },
  data() {
    return {
      adviseList: [],
      toAddInfo: {
        dialogVisible: false,
      },
    };
  },
  created() {
    this.getAdviseInfo();
  },
  methods: {
    async getAdviseInfo() {
      const { data: res } = await this.$advise.get();
      if (res.statusCode === 20000) {
        this.adviseList = res.data;
        console.log(res);
        console.log(this.adviseList);
      }
    },
    async removeAdvise(id) {
      const confirmResult = await this.elConfirm(
        "此操作将永久删除该养殖建议信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        return err;
      });
      if (confirmResult !== "confirm") {
        return this.elMessage.info("已取消删除");
      }
      const { data: res } = await this.$advise.delete(`${id}`);
      if (res.statusCode !== 20000) {
        return this.elMessage.error("删除失败！");
      }
      this.elMessage.success("删除成功");
      this.getAdviseInfo();
    },
  },
};
</script>

<style>
</style>