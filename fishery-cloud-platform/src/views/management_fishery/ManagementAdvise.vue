<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>渔业管理</el-breadcrumb-item>
      <el-breadcrumb-item>养殖建议</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <TheCardHead>
        <div slot="CardTitle">
          <el-col :span="2" >
            <i class="el-icon-receiving"></i>
            <span>养殖建议</span>
          </el-col>
          <el-col :span="1.5" :offset="16">
            <el-tooltip
              effect="dark"
              content="导出养殖建议信息"
              placement="top-start"
              ><el-button type="success" @click="downloadExcel"
                >导出</el-button
              ></el-tooltip
            >
          </el-col>
          <el-col :span="1.5" style="margin:0 5px">
            <el-button type="primary" @click="toAddInfo.dialogVisible = true"
              >添加养殖建议</el-button
            >
          </el-col>
          <el-col :span="1.5" >
            <el-tooltip
              effect="dark"
              content="保存养殖建议信息"
              placement="top-start"
              ><el-upload
                action="http://119.23.218.131:9103/base/germchit/type/excel
"
                :show-file-list="false"
                :before-upload="beforeUpload"
                :file-list="fileList"
                ><el-button type="primary"
                  >上传<i
                    class="el-icon-upload el-icon--right"
                  ></i></el-button></el-upload
            ></el-tooltip>
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
      <!-- <ThePagination ></ThePagination> -->
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
import ThePagination from "../../components/ccy/ThePagination"
export default {
  components: {
    TheCardHead,
    addAdvise,
    ThePagination
  },
  data() {
    return {
      adviseList: [],
      toAddInfo: {
        dialogVisible: false,
      },
      excelData: [],
      upAction: "http://119.23.218.131:9103/base/germchit/type/excel",
      file: "",
      fileList: [],
      formData: "",
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
    async downloadExcel() {
      //导出excel
      window.location.href =
        "http://119.23.218.131:9103/base/germchit/type/excel";
    },
    async saveAdvise() {
      let fileFormData = new FormData();
      fileFormData.append("file", this.excelData); //filename是键，file是值，就是要传的文件，test.zip是要传的文件名
      let requestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data: res } = await this.$advise.post("excel", fileFormData);
      console.log(res);
      if (res.statusCode === 20000) {
        this.elMessage.success("保存养殖建议到数据库成功");
      }
    },
    beforeUpload(file) {
      console.log(file);
      const extension = file.name.split(".")[1] === "xls";
      const extension2 = file.name.split(".")[1] === "xlsx";
      if (!extension && !extension2) {
        this.elMessage.warning("上传模板只能是 xls、xlsx格式!");
        return;
      }
      this.excelData = file;
      this.saveAdvise();
    },
  },
};
</script>

<style>
</style>