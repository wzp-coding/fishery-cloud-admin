<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>基地管理</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <TheCardHead>
        <div slot="CardTitle">
          <el-col :span="4">
            <i class="el-icon-user"></i>
            <span>客户管理</span>
          </el-col>
          <el-col style="width: 100px; float: right">
            <el-button type="primary" @click="toDialogAdd.dialogVisible = true"
              >添加客户</el-button
            >
          </el-col>
        </div>
      </TheCardHead>
      <el-table border stripe :data="customerList">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="customerName" label="客户名"></el-table-column>
        <el-table-column prop="contactPerson" label="联系人"></el-table-column>
        <el-table-column prop="phoneNumber" label="联系电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column
          prop="receiveAddress"
          label="收货地址"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="editEvent(scope.row.id)"
            ></el-button>

            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="removeCustomerById(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <ThePagination
        :toPagination="paginationInfo"
        @fatherMethod="paginationChangeEvent"
      ></ThePagination>
    </el-card>
    <addCustomer
      :toDialogInfo="toDialogAdd"
      @fatherMethods="getCustomerInfo"
    ></addCustomer>
    <editCustomerInfo
      :toDialogInfo="toDialogEdit"
      @fatherMethods="getCustomerInfo"
    ></editCustomerInfo>
  </div>
</template>

<script>
import TheCardAll from "../../components/ccy/TheCardAll";
import ThePagination from "../../components/ccy/ThePagination";
import TheDialogAll from "../../components/ccy/TheDialogAll";
import TheCardHead from "../../components/ccy/TheCardHead";
import addCustomer from "../../components/ccy/infoCustomer/addCustomer";
import editCustomerInfo from "../../components/ccy/infoCustomer/editCustomerInfo";
export default {
  components: {
    TheCardAll,
    ThePagination,
    TheDialogAll,
    TheCardHead,
    addCustomer,
    editCustomerInfo,
  },
  data() {
    return {
      customerList: [],
      paginationInfo: {
        total: 0,
        page: 1,
        size: 3,
      },
      toDialogAdd: {
        dialogVisible: false,
      },
      toDialogEdit: {
        dialogVisible: false,
        id: "",
      },
    };
  },
  created() {
    this.getCustomerInfo();
  },
  methods: {
    async getCustomerInfo() {
      const { data: res } = await this.$Customer.get(
        `${this.$store.state.baseInfo.id}/${this.paginationInfo.page}/${this.paginationInfo.size}`
      );
      console.log(res);
      if (res.statusCode === 20000) {
        this.customerList = res.data.records;
        this.paginationInfo.total = res.data.total;
      }
    },
    editEvent(id) {
      console.log(id);
      this.toDialogEdit.dialogVisible = true
      this.toDialogEdit.id = id;
    },
    async removeCustomerById(id) {
      const confirmResult = await this.elConfirm(
        "此操作将永久删除该客户, 是否继续?",
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
      const { data: res } = await this.$Customer.delete(`${id}`);
      console.log(res);
      if (res.statusCode !== 20000) {
        return this.elMessage.error("删除客户失败！");
      }
      this.elMessage.success("删除客户信息成功！");
      this.getCustomerInfo()
    },
    paginationChangeEvent(size, page) {
      this.paginationInfo.size = size;
      this.paginationInfo.page = page;
      this.getCustomerInfo();
    },
  },
};
</script>

<style>
</style>