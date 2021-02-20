<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>养殖管理</el-breadcrumb-item>
      <el-breadcrumb-item>农资管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row
      class="globalHeader"
      style="
        margin-bottom: 20px;
        padding-bottom: 45px;
        background-color: #eaedf1;
      "
    >
      <el-col :span="4">
        <i class="el-icon-grape"></i>
        <span>农资管理</span>
      </el-col>
    </el-row>
    <el-tabs type="border-card">
      <el-tab-pane label="入库记录">
        <el-row>
          <el-col style="float: right; width: 70px">
            <downloadExcel
              :data="baseSupplyList"
              name="基地入库信息导出.xls"
            >
              <el-tooltip
                effect="dark"
                content="导出基地订单信息"
                placement="top-start"
                ><el-button type="success">导出</el-button></el-tooltip
              >
            </downloadExcel>
          </el-col>
          <el-col style="width: 100px; float: right; margin-left: 10px">
            <el-button
              type="primary"
              @click="toDialogAddInfo.dialogVisible = true"
              >农资入库</el-button
            >
          </el-col>
          <el-col>
            <!-- <el-select v-model="selectType1" @change="typeChange1">
              <el-option
                v-for="item in type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> -->
          </el-col>
        </el-row>
        <el-table :data="baseSupplyList" border stripe>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline label-width="170px">
                <TheSeedPurchaseLayout>
                  <el-form-item label="投入品名称" slot="pre">{{
                    props.row.supplyName
                  }}</el-form-item>
                  <el-form-item label="投入品类型" slot="after">{{
                    props.row.supplyTypeName
                  }}</el-form-item>
                </TheSeedPurchaseLayout>
                <TheSeedPurchaseLayout>
                  <el-form-item label="操作者身份" slot="pre">{{
                    props.row.operatorName
                  }}</el-form-item>
                  <el-form-item label="操作中姓名" slot="after">{{
                    props.row.operatorIdentity
                  }}</el-form-item>
                </TheSeedPurchaseLayout>
                <TheSeedPurchaseLayout>
                  <el-form-item label="存放仓库" slot="pre">{{
                    props.row.warehouseNumber
                  }}</el-form-item>
                  <el-form-item label="入库重量" slot="after">{{
                    props.row.inWeight
                  }}</el-form-item>
                </TheSeedPurchaseLayout>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="supplyName" label="农资名称"></el-table-column>
          <el-table-column
            prop="gmtCreate"
            label="入库日期"
            width="180px"
          ></el-table-column>
          <el-table-column
            prop="supplyTypeName"
            label="投入品类型"
          ></el-table-column>
          <el-table-column prop="inWeight" label="入库重量(kg)"></el-table-column>
          <el-table-column prop="operatorName" label="操作人"></el-table-column>
          <el-table-column
            prop="warehouseNumber"
            label="仓库号"
          ></el-table-column>
          <el-table-column label="操作" width="180px">
            <template slot-scope="scope">
              <!-- 修改按钮 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editInEvent(scope.row.id)"
              ></el-button>
              <!-- 出库按钮 -->
              <!-- <el-tooltip
                effect="dark"
                content="出库"
                placement="top"
                :enterable="false"
              >
                <el-button
                  @click="delivery(scope.row.supplyId)"
                  type="warning"
                  icon="el-icon-upload2"
                  size="mini"
                ></el-button>
              </el-tooltip> -->
              <!-- 删除按钮 -->
              <!-- type="danger": 红色警告按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeSupplyIn(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <ThePagination
          :toPagination="paginationInfoIn"
          @fatherMethod="paginationChangeEventIn"
        ></ThePagination>
      </el-tab-pane>
      <el-tab-pane label="出库记录">
        <el-row>
          <el-col style="float: right; width: 70px">
            <downloadExcel
              :data="baseSupplyOutList"
              name="基地入库信息导出.xls"
            >
              <el-tooltip
                effect="dark"
                content="导出基地订单信息"
                placement="top-start"
                ><el-button type="success">导出</el-button></el-tooltip
              >
            </downloadExcel>
          </el-col>
          <el-col style="float: right; width: 75px; margin-right: 30px">
            <el-button
              type="primary"
              @click="toDialogAddOut.dialogVisible = true"
              >农资出库</el-button
            >
          </el-col>
        </el-row>
        <el-table :data="baseSupplyOutList" border stripe>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline label-width="170px">
                <TheSeedPurchaseLayout>
                  <el-form-item label="投入品名称" slot="pre">{{
                    props.row.supplyName
                  }}</el-form-item>
                  <el-form-item label="投入品类型" slot="after">{{
                    props.row.supplyTypeName
                  }}</el-form-item>
                </TheSeedPurchaseLayout>
                <TheSeedPurchaseLayout>
                  <el-form-item label="操作者身份" slot="pre">{{
                    props.row.operatorName
                  }}</el-form-item>
                  <el-form-item label="操作中姓名" slot="after">{{
                    props.row.operatorIdentity
                  }}</el-form-item>
                </TheSeedPurchaseLayout>
                <TheSeedPurchaseLayout>
                  <el-form-item label="存放仓库" slot="pre">{{
                    props.row.warehouseNumber
                  }}</el-form-item>
                  <el-form-item label="入库重量" slot="after">{{
                    props.row.inWeight
                  }}</el-form-item>
                </TheSeedPurchaseLayout>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="supplyName" label="农资名称"></el-table-column>
          <el-table-column
            prop="gmtCreate"
            label="入库日期"
            width="180px"
          ></el-table-column>
          <el-table-column
            prop="supplyTypeName"
            label="投入品类型"
          ></el-table-column>
          <el-table-column prop="outWeight" label="出库重量(kg)"></el-table-column>
          <el-table-column prop="operatorName" label="操作人"></el-table-column>
          <el-table-column
            prop="warehouseNumber"
            label="仓库号"
          ></el-table-column>
          <el-table-column label="操作" width="180px">
            <template slot-scope="scope">
              <!-- 修改按钮 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editOutEvent(scope.row.id)"
              ></el-button>
              <!-- 删除按钮 -->
              <!-- type="danger": 红色警告按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeSupplyOut(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <ThePagination :toPagination="paginationInfoOut" @fatherMethod="paginationChangeEventOut"></ThePagination>
      </el-tab-pane>
    </el-tabs>
    <TheDialogAll :toDialogInfo="toDialogAddInfo">
      <span slot="footer" class="dialog-footer">
        <el-button @click="toDialogAddInfo.dialogVisible = false"
          >取消</el-button
        >
        <el-button type="primary" @click="addBaseSupply">确 定</el-button>
      </span>
    </TheDialogAll>
    <supplyInDialog
      :toDialogAddInfo="toDialogAddInfo"
      @fatherMethod="getBaseSupplyInfo"
    ></supplyInDialog>
    <supplyOutDialog :toDialogInfo="toDialogAddOut"></supplyOutDialog>
    <!-- 修改入库记录 -->
    <editSupplyIn
      :dialogInfo="toEditSupplyIn"
      @fatherMethod="getBaseSupplyInfo"
    ></editSupplyIn>
    <!-- 修改出库记录 -->
    <editSupplyout :toDialogInfo="toEditSuppyOut" @faherMethod="getOutSupplyInfo"></editSupplyOut>
  </div>
</template>

<script>
import TheCardAll from "../../components/ccy/TheCardAll";
import ThePagination from "../../components/ccy/ThePagination";
import TheDialogAll from "../../components/ccy/TheDialogAll";
import editSupplyIn from "../../components/ccy/managementSupply/editSupplyIn";
import supplyInDialog from "../../components/ccy/managementSupply/supplyInDialog";
import TheSeedPurchaseLayout from "../../components/ccy/TheSeedPurchaseLayout";
import supplyOutDialog from "../../components/ccy/managementSupply/supplyOutDialog";
import editSupplyout from "../../components/ccy/managementSupply/editSupplyOut"
export default {
  components: {
    TheCardAll,
    ThePagination,
    TheDialogAll,
    supplyInDialog,
    TheSeedPurchaseLayout,
    editSupplyIn,
    supplyOutDialog,
    editSupplyout
  },
  data() {
    return {
      baseId:this.$store.state.userInfo.baseId,
      // baseId: "1248910886228332544",
      baseSupplyList: [],
      baseSupplyOutList: [],
      addInfo: {
        baseId: this.$store.state.userInfo.baseId,
        gmtCreate: "",
        inWeight: "",
        operatorIdentity: "",
        operatorName: "",
        // supplyId: "",
        supplyName: "",
        supplyTypeName: "",
        warehouseNumber: "",
      },
      editInfo: {
        baseId: this.$store.state.userInfo.baseId,
        id: "",
        inWeight: "1",
        operatorIdentity: "",
        operatorName: "",
        supplyId: "",
        supplyName: "",
        supplyTypeName: "",
        warehouseNumber: "",
      },
      toSupplyInfo: {
        dialogVisible: false,
      },
      paginationInfoIn: {
        total: 0,
        page: 1,
        size: 3,
      },
      paginationInfoOut: {
        total: 0,
        page: 1,
        size: 3,
      },
      toDialogAddInfo: {
        title: "农资入库",
        width: "23%",
        dialogVisible: false,
        FormInfo: this.addInfo,
      },
      //农资出库
      toDialogAddOut: {
        dialogVisible: false,
        id: "",
      },
      //修改出库记录
      toEditSuppyOut:{
        dialogVisible: false,
        id:''
      },
      //修改入库记录
      toEditSupplyIn: {
        dialogVisible: false,
        id: "",
      },
    };
  },
  created() {
    this.getBaseSupplyInfo(); //获取基地入库记录
    this.getOutSupplyInfo(); //获取基地出库记录
  },
  methods: {
    async getBaseSupplyInfo() {
      const { data: res } = await this.$baseSupply.get(
        `in/${this.baseId}/${this.paginationInfoIn.size}/${this.paginationInfoIn.page}`
      );
      console.log(res);
      this.baseSupplyList = res.data.records;
      this.paginationInfoIn.total = res.data.total;
    },
    async addBaseSupply() {
      console.log(this.addInfo);
    },
    paginationChangeEventIn(size, page) {
      this.paginationInfoIn.page = page;
      this.paginationInfoIn.size = size;
      this.getBaseSupplyInfo();
    },
    // 出库
    async delivery(supplyId) {
      // const {data : res} = await this.$baseSupply.put('in')
      // console.log(res);
      this.toDialogAddOut.dialogVisible = true;
      this.toDialogAddOut.id = supplyId;
      console.log(supplyId);
    },
    async getOutSupplyInfo() {
      const { data: res } = await this.$baseSupply.get(
        `out/${this.baseId}/${this.paginationInfoOut.size}/${this.paginationInfoOut.page}`
      );
      console.log(res);
      this.baseSupplyOutList = res.data.records;
    },
    editInEvent(id) {
      this.toEditSupplyIn.dialogVisible = true;
      this.toEditSupplyIn.id = id;
    },
    // 删除入库记录
    async removeSupplyIn(id) {
      const { data: res } = await this.$baseSupply.delete(`in/${id}`);
      console.log(res);
      if (res.statusCode === 20000) {
        console.log("删除成功");
        this.getBaseSupplyInfo();
      }
    },
    //获取出库记录
    async getSupplyOutInfo() {
      const { data: res } = await this.$baseSupply.get(
        `out/${this.baseId}/${this.paginationInfoOut.size}/${this.paginationInfoOut.page}`
      );
      console.log(res);
      if (res.statusCode === 20000) {
        this.baseSupplyOutList = res.data.records;
        this.paginationInfoOut.total = res.data.total
        console.log(this.baseSupplyOutList);
      }
    },
    //删除出库记录
    async removeSupplyOut(id) {
      const confirmResult = await this.elConfirm(
        "此操作将永久删除该记录, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
        // .catch 用于捕获错误返回给confirmResult
      ).catch((err) => {
        return err;
      });
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除， 则返回值为字符串 cancel
      if (confirmResult !== "confirm") {
        return this.elMessage.info("已取消删除");
      }
      const { data: res } = await this.$baseSupply.delete(`out/${id}`);
      if (res.statusCode === 20000) {
        this.elMessage.success("删除出库记录成功");
        this.getSupplyOutInfo();
      }
    },
    //修改出库记录
    editOutEvent(id){
      this.toEditSuppyOut.dialogVisible = true
      this.toEditSuppyOut.id = id
    },
    paginationChangeEventOut(size,page){
      this.paginationInfoOut.size = size
      this.paginationInfoOut.page = page
      this.getOutSupplyInfo()
    }
  },
};
</script>

<style>
</style>