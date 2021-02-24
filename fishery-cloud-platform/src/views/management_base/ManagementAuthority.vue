<template>
  <div>
    <!-- 面包屑导航区域 -->
    <Breadcrumb :breadcrumbs="['权限管理', '权限管理']"></Breadcrumb>

    <!-- 主体 -->
    <el-card>
      <!-- 标题添加区域 -->
      <el-row
        class="globalHeader"
        style="margin-bottom: 20px; padding-bottom: 45px"
      >
        <el-col :span="4">
          <i class="el-icon-s-grid"></i>
          <span>权限管理</span>
        </el-col>
      </el-row>
      <el-table :data="roleList" style="width: 100%" border stripe>
        <el-table-column label="角色身份">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="拥有权限">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="
                roleId = scope.row.id;
                isShowAuthority = true;
              "
              >查看权限</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              icon="el-icon-setting"
              @click="
                roleId = scope.row.id;
                isShowSetAuth = true;
              "
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <Pagination :func="getRoleList"></Pagination>
    </el-card>

    <!-- 权限弹框 -->
    <Authority
      :dialog-visible="isShowAuthority"
      @close="() => (this.isShowAuthority = false)"
      :roleId="roleId"
    ></Authority>

    <!-- 分配权限 -->
    <SetAuth
      :visible="isShowSetAuth"
      @close="() => (this.isShowSetAuth = false)"
      :roleId="roleId"
    ></SetAuth>
  </div>
</template>
<script>
import Authority from "../../components/wzp/Authority";
import Pagination from "../../components/wzp/Pagination";
import SetAuth from "../../components/wzp/management_authority/SetAuth";
export default {
  data() {
    return {
      // 查看权限 按钮
      isShowAuthority: false,
      // 分配权限 按钮
      isShowSetAuth: false,
      // 角色列表
      roleList: [],
      // 点击按钮时的roleId
      roleId: undefined,
    };
  },
  components: {
    Authority,
    Pagination,
    SetAuth,
  },
  methods: {
    // 分页获取角色
    async getRoleList(page = 1, size = 5) {
      let { data: res } = await this.$role.get(`/${page}/${size}`);
      // console.log("getRoleList: ", res);
      if (res.statusCode === 20000) {
        res = res.data;
        this.roleList = res.records;
        const options = { page, size, total: res.total };
        return options;
      } else {
        this.elMessage.error(res.message);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.bdtop {
  border-top: 1px dashed #ccc;
}
.bdbottom {
  border-bottom: 1px dashed #ccc;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>