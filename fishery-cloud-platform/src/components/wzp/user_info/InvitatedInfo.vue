<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="基地id" prop="id"> </el-table-column>
    <el-table-column label="基地名称" prop="name"> </el-table-column>
    <el-table-column label="基地老板" prop="creator"> </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="mini" @click="handleAgree(scope.row.id)"
          >同意</el-button
        >
        <el-button
          type="warning"
          size="mini"
          @click="handleReject(scope.row.id)"
          >拒绝</el-button
        >
        <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
    <Pagination :func="getInvitationInfo"></Pagination>
  </el-table>
</template>
<script>
import Pagination from "../Pagination";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    // 同意
    async handleAgree(id) {
      let { data: res } = await this.$user.put(`/invitation/${id}/1`);
      console.log("handleAgree: ", res);
      if (res.statusCode === 20000) {
        this.elMessage.success(res.message);
      } else {
        this.elMessage.error(res.message);
        console.error(res.message);
      }
    },
    // 拒绝
    async handleReject(id) {
      let { data: res } = await this.$user.put(`/invitation/${id}/0`);
      console.log("handleReject: ", res);
      if (res.statusCode === 20000) {
        this.elMessage.success(res.message);
      } else {
        this.elMessage.error(res.message);
        console.error(res.message);
      }
    },
    // 删除
    async handleDelete(id) {
      let { data: res } = await this.$user.delete(`/deleteAllInvitation/${id}`);
      console.log("handleDelete: ", res);
      if (res.statusCode === 20000) {
        this.elMessage.success(res.message);
      } else {
        this.elMessage.error(res.message);
        console.error(res.message);
      }
    },
    // 分页获取邀请信息
    async getInvitationInfo(page = 1, size = 5) {
      let { data: res } = await this.$user.get(`/invitation/${page}/${size}`);
      console.log("invitation: ", res);
      if (res.statusCode === 20000) {
        res = res.data;
        this.tableData = res.rows;
        const options = {
          size,
          page,
          total: res.total,
        };
        return options;
      } else {
        console.error(res.message);
      }
    },
  },
};
</script>