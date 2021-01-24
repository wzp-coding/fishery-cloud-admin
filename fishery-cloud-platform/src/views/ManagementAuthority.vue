<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <TheCardAll>
        <div slot="CardTitle">
          <el-col :span="4">
            <i class="el-icon-s-grid"></i>
            <span>权限管理</span>
          </el-col>
        </div>
        <div slot="ordinary">
          <el-table-column label="角色身份">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="拥有权限">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="searchAuthority(scope.row.baseIdentity)"
                icon="el-icon-search"
                >查看权限</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="success"
                @click="distributeAuthority(scope.row.baseIdentity)"
                icon="el-icon-setting"
                >分配权限</el-button
              >
            </template>
          </el-table-column>
        </div>
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
  created(){
    
  },
  methods:{
    
  }
};
</script>

<style>
</style>