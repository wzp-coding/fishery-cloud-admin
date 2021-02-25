<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>渔业管理</el-breadcrumb-item>
      <el-breadcrumb-item>种苗进货</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <TheCardHead>
        <div slot="CardTitle">
          <el-col :span="4">
            <i class="el-icon-s-help"></i>
            <span>种苗进货</span>
          </el-col>
          <el-col style="width: 75px; float: right">
            <downloadExcel
              :data="germchitInfoList"
              name="基地种苗订单信息导出.xls"
            >
              <el-tooltip
                effect="dark"
                content="导出基地订单信息"
                placement="top-start"
                ><el-button type="success">导出</el-button></el-tooltip
              >
            </downloadExcel>
          </el-col>
          <el-col style="float: right; width: 100px; margin-right: 10px">
            <el-button type="primary" @click="dialogVisible = true"
              >种苗进货</el-button
            >
          </el-col>
        </div>
      </TheCardHead>
      <el-table border stripe :data="germchitInfoList">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" label-width="170px">
              <TheSeedPurchaseLayout>
                <el-form-item label="订单创建人" class="down-label" slot="pre">
                  <span>{{ props.row.creatorName }}</span>
                </el-form-item>
                <el-form-item label="种苗品种" class="down-label" slot="after">
                  <span>{{ props.row.germchitSpecies }}</span>
                </el-form-item>
              </TheSeedPurchaseLayout>
              <TheSeedPurchaseLayout>
                <el-form-item label="种苗产地" class="down-label" slot="pre">
                  <span>{{ props.row.germchitOrigin }}</span>
                </el-form-item>
                <el-form-item
                  label="种苗批次名称"
                  class="down-label"
                  slot="after"
                >
                  <span>{{ props.row.germchitBatchName }}</span>
                </el-form-item>
              </TheSeedPurchaseLayout>
              <TheSeedPurchaseLayout>
                <el-form-item label="种苗进货量" class="down-label" slot="pre">
                  <span>{{ props.row.purchaseAmount }}</span>
                </el-form-item>
                <el-form-item
                  label="种苗供应商"
                  class="down-label"
                  slot="after"
                >
                  <span>{{ props.row.germchitSupplierName }}</span>
                </el-form-item>
              </TheSeedPurchaseLayout>
              <TheSeedPurchaseLayout>
                <el-form-item label="供应商电话" class="down-label" slot="pre">
                  <span v-if="!props.row.germchitSupplierPhone">{{
                    props.row.germchitSupplierPhone
                  }}</span>
                  <span v-else>暂无相关信息</span>
                </el-form-item>
                <el-form-item
                  label="订单创建时间"
                  class="down-label"
                  slot="after"
                >
                  <span>{{ props.row.gmtCreate }}</span>
                </el-form-item>
              </TheSeedPurchaseLayout>
              <el-form-item label="质检图片" class="down-label">
                <div
                  class="downBox"
                  v-if="!props.row.germchitQualityInspection"
                >
                  <img
                    :src="props.row.germchitQualityInspection"
                    alt="质检图片"
                  />
                  <span class="mask">
                    <span class="mask-icon1">
                      <i class="el-icon-zoom-in"></i>
                    </span>
                  </span>
                </div>
                <div v-else><span>暂无</span></div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="germchitBatchName"
          label="种苗批次名称"
        ></el-table-column>
        <el-table-column
          prop="germchitSpecies"
          label="种苗品种"
        ></el-table-column>
        <el-table-column
          prop="purchaseAmount"
          label="种苗购买数量/尾"
        ></el-table-column>
        <el-table-column
          prop="germchitSupplierName"
          label="供应商"
        ></el-table-column>
        <el-table-column prop="creatorName" label="操作人"></el-table-column>

        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editEvent(scope.row.id)"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="货物入库"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="success"
                icon="el-icon-mobile"
                size="mini"
                @click="storageById(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removePurchaseInfo(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <ThePagination
        @fatherMethod="paginationChangeEvent"
        :toPagination="paginationInfo"
      ></ThePagination>
    </el-card>
    <!-- echarts视图 -->
    <el-card v-show="germchitInfoList" style="margin-top: 1rem">
      <chartView></chartView>
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      title="种苗进货"
      @close="puchaseClose"
    >
      <el-form
        :model="addPurchaseInfo"
        label-width="120px"
        ref="purchaseFormRef"
      >
        <el-form-item label="种苗品种" prop="germchitSpecies">
          <el-select v-model="addPurchaseInfo.germchitId" placeholder="请选择" @change="selectEvent">
            <el-option
              v-for="(item, index) in allSeedInfo"
              :key="item.id"
              :label="item.germchitSpecies"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商家剩余种苗量" prop="max">
          <el-input v-model="max" disabled></el-input>
        </el-form-item>
        <el-form-item label="进货量" prop="purchaseAmount">
          <el-input-number
            controls-position="right"
            :min="1"
            v-model="addPurchaseInfo.purchaseAmount"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="操作者" prop="creatorName" >
          <el-input v-model="addPurchaseInfo.creatorName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addPurchaseInfoEvent"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="editDialogVisible"
      title="修改订单信息"
      width="27%"
    >
      <el-form :model="editPurchaseInfo" label-width="105px">
        <el-form-item label="进货量" prop="purchaseAmount">
          <el-input-number
            controls-position="right"
            :min="1"
            v-model="editPurchaseInfo.purchaseAmount"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="操作者" prop="creatorName">
          <el-input v-model="editPurchaseInfo.creatorName"></el-input>
        </el-form-item>
        <el-form-item
          label="修改进货时间"
          prop="gmtCreate"
          controls-position="right"
        >
          <el-date-picker
            v-model="editPurchaseInfo.gmtCreate"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editPurchaseInfoEvent"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TheCardAll from "../../components/ccy/TheCardAll";
import TheCardHead from "../../components/ccy/TheCardHead";
import ThePagination from "../../components/ccy/ThePagination";
import TheDialogAll from "../../components/ccy/TheDialogAll";
import chartView from "../../components/ccy/seedPurchase/chartView";
import TheSeedPurchaseLayout from "../../components/ccy/TheSeedPurchaseLayout";
export default {
  data() {
    return {
      dialogVisible: false,
      editDialogVisible: false,
      baseId: this.$store.state.baseInfo.id,
      supplyInfo: {
        // id:'',                //入库信息ID
        baseId: this.$store.state.baseInfo.id,
        gmtCreate: "", //创建时间
        gmtModified: "", //修改时间
        inWeight: "",
        operatorIdentity: "", //操作者身份
        operatorName: "", //操作者姓名
        supplyId: "", //投入品ID
        supplyName: "", //投入品名称
        supplyTypeName: "", //投入品类型名字
        warehouseNumber: "", //仓库号
      },
      //查询所有种苗订单信息
      germchitInfoList: [],
      germchitInfo: {},
      add: {
        germchitBatchName: "",
      },
      toDialogPurchase: {
        title: "种苗进货",
        dialogVisible: false,
      },
      max:null,
      //获取所有种苗信息
      allSeedInfo: [],
      //种苗进货请求对象
      germchitSpecies: "",
      addPurchaseInfo: {
        germchitId: "",
        creatorName: "",
        baseId: this.$store.state.baseInfo.id,
        purchaseAmount: 1,
      },
      paginationInfo: {
        total: 0,
        page: 1,
        size: 3,
      },
      editPurchaseInfo: {
        creatorName: "",
        purchaseAmount: "",
        gmtCreate: "",
        gmtModified: "",
        id: "",
        baseId: this.$store.state.baseInfo.id,
      },
    };
  },
  components: {
    TheCardAll,
    ThePagination,
    TheDialogAll,
    TheCardHead,
    TheSeedPurchaseLayout,
    chartView,
  },
  created() {
    this.getGermchitInfo();
    this.getGermchitPurchaseInfo();
    this.getAllPurchaseInfo();
  },
  methods: {
    //获取投入品信息
    // getSupplyInfo() {},
    //根据基地获取种苗订单信息
    async getGermchitPurchaseInfo() {
      const { data: res } = await this.$germchitManagerController.get(
        `/order/${this.baseId}/${this.paginationInfo.size}/${this.paginationInfo.page}`
      );
      console.log(res);
      this.paginationInfo.total = res.data.total;
      this.germchitInfoList = res.data.records;
    },
    // 分页组件事件
    paginationChangeEvent(size, page) {
      this.paginationInfo.size = size;
      this.paginationInfo.page = page;
      this.getGermchitPurchaseInfo();
    },

    //根据种苗ID获取种苗信息
    async getGermchitInfo(id, index) {
      console.log(id);
      const { data: res } = await this.$germchit.get(`${id}`);
      console.log(res);
    },
    //获取所有商家种苗信息
    async getAllPurchaseInfo() {
      const { data: res } = await this.$germchit.get();
      this.allSeedInfo = res.data;
      console.log(res);
      // germchitSpecies
    },
    timeFormat(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
    async addPurchaseInfoEvent() {
      console.log(this.addPurchaseInfo);
      const { data: res } = await this.$germchitManagerController.post(
        "purchase",
        this.addPurchaseInfo
      );
      console.log(res);
      if (res.statusCode === 20000) {
        this.dialogVisible = false;
        this.getGermchitPurchaseInfo()
        this.elMessage.success("进货成功");
      }
    },
    // 删除订单
    async removePurchaseInfo(id) {
      console.log(id);
      const confirmResult = await this.elConfirm(
        "此操作将永久删除该订单信息, 是否继续?",
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
      const { data: res } = await this.$germchitManagerController.delete(
        `/order/${id}`
      );
      if (res.statusCode === 20000) {
        console.log(res);
        this.elMessage.success("删除虾苗信息成功！！");
        this.getGermchitPurchaseInfo();
      }
    },
    //修改订单信息
    editEvent(id) {
      this.editDialogVisible = true;
      this.editPurchaseInfo.id = id;
      console.log(this.editPurchaseInfo);
    },
    async editPurchaseInfoEvent() {
      this.editPurchaseInfo.gmtCreate = this.timeFormat(
        this.editPurchaseInfo.gmtCreate
      );
      let date = new Date();
      this.editPurchaseInfo.gmtModified = this.timeFormat(date);
      console.log(this.editPurchaseInfo);
      const { data: res } = await this.$germchitManagerController.put(
        `order`,
        this.editPurchaseInfo
      );
      console.log(res);
      this.editDialogVisible = false;
      this.getGermchitPurchaseInfo();
    },
    puchaseClose() {
      this.$refs.purchaseFormRef.resetFields();
    },
    //种苗入库
    async storageById(id) {
      console.log(id);
      const { data: res } = await this.$germchitManagerController.put(`${id}`);
      console.log(res);
      if (res.statusCode === 20000) {
        this.elMessage.success("种苗入库成功");
      }
    },
    selectEvent(res){
      this.addPurchaseInfo.germchitId = this.allSeedInfo[res].id;
      this.max = this.allSeedInfo[res].germchitAmount;
    }
  },
};
</script>

<style>
</style>