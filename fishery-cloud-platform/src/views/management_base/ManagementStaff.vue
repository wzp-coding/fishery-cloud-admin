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
        </div>
      </TheCardHead>
      <el-tabs type="border-card">
        <el-tab-pane label="员工信息">
          <el-row>
            <el-col style="width: 100px; float: right; margin-left: 10px">
              <el-button
                type="primary"
                @click="toInviteStaff.dialogVisible = true"
                >邀请员工</el-button
              >
            </el-col>
          </el-row>
          <el-table border stripe :data="staffInfoList">
            <el-table-column type="index"> </el-table-column> 
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
                  @click="editAdminInfo(scope.row.id, scope.row.username)"
                  >修改角色</el-button
                >
                <!-- 删除按钮 -->
                <!-- type="danger": 红色警告按钮 -->
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                  @click="removeStaff(scope.row.id)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <ThePagination
            :toPagination="paginationInfo"
            @fatherMethod="paginationChangeEvent"
          ></ThePagination>
        </el-tab-pane>
        <el-tab-pane label="邀请信息">
          <el-row>
            <el-col style="width: 100px; float: right; margin-left: 10px">
              <el-select v-model="inviteStatus"  @change="typeChange">
                <el-option
                  v-for="item in type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-table border stripe :data="inviteInfoList">
            <el-table-column prop="username" label="姓名"></el-table-column>
            <!-- <el-table-column prop="baseIdentity" label="角色"></el-table-column> -->
            <el-table-column prop="phone" label="联系电话"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column label="操作">
              <template >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 修改员工信息 -->
    <editStaffInfo
      :toDialogInfo="toEditInfo"
      @fatherMethods="getAllStaffInfo"
    ></editStaffInfo>
    <inviteStaff
      :toDialogInfo="toInviteStaff"
      @fatherMethods="getAllStaffInfo"
    ></inviteStaff>
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
        size: 6,
        page: 1,
      },
      baseIdentity: "",
      staffInfoList: [],
      toEditInfo: {
        dialogVisible: false,
        id: "",
        username: "",
      },
      toInviteStaff: {
        dialogVisible: false,
      },
      addInfo: {
        name: "111",
        remarks: "222",
        useable: false,
      },
      inviteInfoList: [], //邀请信息
      paginationInviteInfo: {
        total: 0,
        size: 6,
        page: 1,
      },
      inviteStatus: 2, //邀请状态
      type:[
        {
          value:0,
          label:'已拒绝'
        },
        {
          value:1,
          label:'已同意'
        },
        {
          value:2,
          label:'待确认'
        }
      ]
    };
  },
  created() {
    this.getAllStaffInfo();
    this.getBaseIdentity();
    this.getInviteInfo();
  },
  methods: {
    async getBaseIdentity() {
      const { data: res } = await this.$role.get(
        `getByUserId/${this.$store.state.userInfo.id}`
      );
    },
    //分页查询基地人员信息
    async getAllStaffInfo() {
      const { data: res } = await this.$user.get(
        `getBaseMember/${this.paginationInfo.page}/${this.paginationInfo.size}/${this.$store.state.baseInfo.id}`
      );
      console.log(res);
      if (res.statusCode === 20000) {
        this.staffInfoList = res.data.rows;
        for (let i = 0; i < this.staffInfoList.length; i++) {
          if (this.staffInfoList[i].baseIdentity === 2) {
            this.staffInfoList[i].baseIdentity = "老板";
          } else {
            this.staffInfoList[i].baseIdentity = "员工";
          }
        }
        this.paginationInfo.total = res.data.total;
      }
    },
    paginationChangeEvent(size, page) {
      this.paginationInfo.size = size;
      this.paginationInfo.page = page;
      this.getAllStaffInfo();
    },
    editAdminInfo(id, name) {
      this.toEditInfo.id = id;
      this.toEditInfo.username = name;
      this.toEditInfo.dialogVisible = true;
    },
    async removeStaff(id) {
      const confirmResult = await this.elConfirm(
        "此操作将永久删除该员工数据, 是否继续?",
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
      const { data: res } = await this.$user.put(`sack/${id}`);
      console.log(res);
      if (res.statusCode === 20000) {
        this.elMessage.success("删除成功！");
        this.getAllStaffInfo();
      } else {
        this.elMessage.error("删除失败！");
      }
    },
    async getInviteInfo() {
      const { data: res } = await this.$user.get(
        `getTypeInvitation/${this.inviteStatus}/${this.paginationInviteInfo.page}/${this.paginationInviteInfo.size}`
      );
      console.log(res);
      if (res.statusCode === 20000) {
        this.paginationInviteInfo.total = res.data.total;
        this.inviteInfoList = res.data.rows;
      }
    },
    typeChange(){
      console.log(this.inviteStatus);
      this.getInviteInfo()
    }
  },
};
</script>

<style>
</style>