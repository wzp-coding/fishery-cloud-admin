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
        <el-col :span="2" style="float: right">
          <el-button
            type="primary"
            @click="isShowAddRole = true"
            v-auth="'authority_role_add'"
            >添加角色</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="roleList" style="width: 100%" border stripe>
        <el-table-column label="角色标签">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.remarks }}</span>
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
              v-auth="'authority_role_updateRoleFunction'"
              >分配权限</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-edit"
              @click="
                isShowUpdateRole = true;
                roleId = scope.row.id;
              "
              v-auth="'authority_role_update'"
              >修改</el-button
            >
            <!-- <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deleteRole(scope.row.id)"
              v-auth="'authority_role_delete'"
              >删除</el-button
            > -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <Pagination :func="getRoleList"></Pagination>
    </el-card>

    <!-- 添加角色弹框 -->
    <AddRole
      :dialog-visible="isShowAddRole"
      @close="() => (this.isShowAddRole = false)"
      :flushData="getRoleList"
    ></AddRole>

    <!-- 修改角色弹框 -->
    <UpdateRole
      :dialog-visible="isShowUpdateRole"
      @close="() => (this.isShowUpdateRole = false)"
      :roleId="roleId"
      :flushData="getRoleList"
    ></UpdateRole>

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
import AddRole from "../../components/wzp/management_authority/AddRole";
import UpdateRole from "../../components/wzp/management_authority/UpdateRole";
import { mapState } from "vuex";
export default {
  data() {
    return {
      // 添加角色 按钮
      isShowAddRole: false,
      // 修改角色 按钮
      isShowUpdateRole: false,
      // 查看权限 按钮
      isShowAuthority: false,
      // 分配权限 按钮
      isShowSetAuth: false,
      // 角色列表
      roleList: [],
      // 点击按钮时的roleId
      roleId: undefined,
      total: undefined,
    };
  },
  computed: {
    ...mapState(["baseInfo", "userInfo"]),
  },
  components: {
    Authority,
    Pagination,
    SetAuth,
    AddRole,
    UpdateRole,
  },
  methods: {
    // 分页获取角色
    async getRoleList(page = 1, size = 5) {
      const upRange = this.total
        ? page * size > this.total
          ? this.total
          : page * size
        : page * size;
      let { data: res } = await this.$role.get(
        `/${this.baseInfo.id}/${(page - 1) * size}/${upRange}`
      );
      console.log("getRoleList: ", res);
      if (res.statusCode === 20000) {
        res = res.data;
        this.roleList = res.retListCopy.filter((item) => item != null);
        console.log("this.roleList: ", this.roleList);
        const options = { page, size, total: res.totla };
        this.total = res.totla;
        return options;
      } else {
        console.error(res.message);
      }
    },
    // 根据id删除角色
    async deleteRole(id) {
      if (id === this.userInfo.roleId) {
        this.elMessage.warning("不能删除自己的权限！！");
        this.$emit("close");
        return;
      }
      this.elConfirm(
        "该操作可能影响已分配该角色的员工身份，你确定删除该角色吗？"
      )
        .then(async (_) => {
          // console.log('_: ', _);
          const { data: res } = await this.$role.delete(`/remove/${id}`);
          if (res.statusCode === 20000) {
            this.elMessage.success(res.message);
          } else {
            this.elMessage.error(res.message);
          }
        })
        .catch((_) => {
          // console.log('_: ', _);
          this.elMessage.warning("取消删除");
        });
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