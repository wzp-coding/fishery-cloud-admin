<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>基地管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <TheCardHead>
        <div slot="CardTitle">
          <el-col :span="4">
            <i class="el-icon-user"></i>
            <span>员工管理</span>
          </el-col>
          <el-col style="width: 100px; float: right">
            <el-button type="primary" @click="toAddStaff = true">邀请员工</el-button>
          </el-col>
        </div>
      </TheCardHead>
      <el-table border stripe :data="staffInfoList">
        <el-table-column type="index"> </el-table-column> -->
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="baseIdentity" label="角色"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="editAdminInfo(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <!-- type="danger": 红色警告按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <ThePagination
        :toPagination="paginationInfo"
        @fatherMethod="paginationChangeEvent"
      ></ThePagination>
    </el-card>
    <!-- 修改员工信息 -->
    <editStaffInfo
      :toDialogInfo="toEditInfo"
      @fatherMethods="getAllStaffInfo"
    ></editStaffInfo>
    <inviteStaff :toDialogInfo="toAddStaff"></inviteStaff>
  </div>
</template>

<script>
import ThePagination from "../../components/ccy/ThePagination";
import TheDialogAll from "../../components/ccy/TheDialogAll";
import TheCardHead from "../../components/ccy/TheCardHead";
import inviteStaff from "../../components/ccy/managementStaff/inviteStaff";
import editStaffInfo from "../../components/ccy/managementStaff/editStaffInfo";
export default {
  components: {
    ThePagination,
    TheDialogAll,
    TheCardHead,
    editStaffInfo,
    inviteStaff,
  },
  data() {
    return {
      paginationInfo: {
        total: 0,
        size: 3,
        page: 1,
      },
      staffInfoList: [],
      toEditInfo: {
        dialogVisible: false,
        id: "",
      },
      toAddStaff: false,
    };
  },
  created() {
    this.getAllStaffInfo();
  },
  methods: {
    async getAllStaffInfo() {
      const { data: res } = await this.$admin.post(
        `search/${this.paginationInfo.page}/${this.paginationInfo.size}`
      );
      console.log(res);
      if (res.statusCode === 20000) {
        this.staffInfoList = res.data.records;
        this.paginationInfo.total = res.data.total;
      }
    },
    paginationChangeEvent(size, page) {
      this.paginationInfo.size = size;
      this.paginationInfo.page = page;
      this.getAllStaffInfo();
    },
    editAdminInfo(id) {
      this.toEditInfo.dialogVisible = true;
      this.toEditInfo.id = id;
    },
    async inviteAdmin() {
      const { data: res } = await this.$admin.post("");
    },
  },
};
</script>

<style>
</style>