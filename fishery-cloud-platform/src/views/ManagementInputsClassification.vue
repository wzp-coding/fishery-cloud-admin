<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>基地管理</el-breadcrumb-item>
      <el-breadcrumb-item>投入品分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <TheCardAll>
        <el-col :span="4">
          <i class="el-icon-s-custom"></i>
          <span>投入品分类管理</span>
        </el-col>
        <el-col style="width: 125px; float: right">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加一级分类</el-button
          >
        </el-col>
        <div slot="ordinary">
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="typeOne" label="分类名称"></el-table-column>
          <el-table-column label="分类等级">一级</el-table-column>
          <el-table-column label="操作" width="500">
            <template slot-scope="scope">
              <!-- 修改按钮 -->
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="small"
                @click="showEdit(scope.row.id, 1)"
                >修改</el-button
              >
              <!-- 查看耳机分类按钮 -->
              <el-button
                type="success"
                icon="el-icon-s-tools"
                size="small"
                @click="getList(scope.row.id, 2)"
                >查看二级</el-button
              >
              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                @click="remove(scope.row.id, 1)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </div>
        <ThePagination :toPagination="paginationInfo"></ThePagination>
      </TheCardAll>
    </el-card>
  </div>
</template>

<script>
import TheCardAll from "../components/ccy/TheCardAll";
import ThePagination from "../components/ccy/ThePagination";
import TheDialogAll from "../components/ccy/TheDialogAll";
export default {
  components: {
    TheCardAll,
    ThePagination,
    TheDialogAll,
  },
  data(){
    return {
      paginationInfo:{
        total:3,
        size:3,
        page:1
      }
    }
  }
};
</script>

<style>
</style>