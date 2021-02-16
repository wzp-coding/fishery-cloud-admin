<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>基地管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <TheCardAll>
        <div slot="CardTitle">
          <el-col :span="4">
            <i class="el-icon-user"></i>
            <span>员工管理</span>
          </el-col>
          <el-col style="width: 100px; float: right">
            <el-button type="primary" @click="addDialogVisible = true"
              >邀请员工</el-button
            >
          </el-col>
        </div>
        <div slot="ordinary">
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="workType" label="角色"></el-table-column>
          <el-table-column prop="mobile" label="联系电话"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 修改按钮 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="small"
                @click="showEditDialog(scope.row.userId)"
              ></el-button>
              <!-- 删除按钮 -->
              <!-- type="danger": 红色警告按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                @click="removePersonInfoById(scope.row.userId)"
              ></el-button>
            </template>
          </el-table-column>
        </div>
        <ThePagination slot="pagination"></ThePagination>
      </TheCardAll>
    </el-card>
  </div>
</template>

<script>
import TheCardAll from "../../components/ccy/TheCardAll";
import ThePagination from "../../components/ccy/ThePagination";
import TheDialogAll from "../../components/ccy/TheDialogAll";
export default {
  components: {
    TheCardAll,
    ThePagination,
    TheDialogAll,
  },
};
</script>

<style>
</style>