<template>
  <div>
    <el-dialog
      title="收货方信息"
      :visible.sync="dialogVisible"
      width="50%"
      @close="closed"
    >
      <el-table
        v-if="tableType == 1"
        element-loading-text="拼命加载中"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        height="450"
        :data="
          tableData.filter(
            (data) =>
              !search ||
              data.customerName.toLowerCase().includes(search.toLowerCase()) ||
              data.phoneNumber.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column label="客户名" prop="customerName"> </el-table-column>
        <el-table-column label="电话" prop="phoneNumber"> </el-table-column>
        <el-table-column label="收货地址" prop="receiveAddress">
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="{}">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >选择</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-table
        height="450"
        element-loading-text="拼命加载中"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        v-if="tableType == 3"
        v-loading="loading"
        :data="
          processList.filter(
            (data) =>
              !search ||
              data.factoryName.toLowerCase().includes(search.toLowerCase())
          )
        "
      >
        <el-table-column label="加工厂名称" prop="processingFactoryName">
        </el-table-column>
        <el-table-column label="加工厂地址" prop="processingFactoryAddress">
        </el-table-column>
        <el-table-column label="加工厂面积" prop="processingFactoryArea">
        </el-table-column>
        <el-table-column label="加工厂产品" prop="processingType">
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="{}">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleProcess(scope.row)"
              >选择</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-table
        height="450"
        v-if="tableType == 4"
        element-loading-text="拼命加载中"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="
          refDataList.filter(
            (data) =>
              !search ||
              data.refrigeratoryName
                .toLowerCase()
                .includes(search.toLowerCase())
          )
        "
      >
        <el-table-column label="冷库名称" prop="refrigeratoryName">
        </el-table-column>
        <el-table-column label="冷库地址" prop="refrigeratoryAddress">
        </el-table-column>
        <el-table-column label="冷库温度" prop="refrigeratoryTemperature">
        </el-table-column>
        <el-table-column label="冷库面积" prop="refrigeratoryArea">
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="{}">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleRef(scope.row)"
              >选择</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    CustomerVisible: {
      type: Boolean,
      default: false,
    },
    tableType: {
      type: Number,
    },
    togermchitId: {
      type: String,
    },
  },
  data() {
    return {
      tableData: [],
      search: "",
      baseid: "1350657222372835330",
      dialogVisible: this.CustomerVisible,
      refDataList: [],
      search: "",
      processList: [],
      loading: true,
    };
  },
  watch: {
    CustomerVisible: {
      handler(newVal, oldVal) {
        console.log("监听事件2");
        this.dialogVisible = newVal;
        this.loading = true;
        if (newVal == 1 || newVal == 2) {
          this.getComputedlist();
        } else if (newVal == 3) {
          this.getProcessData();
        } else {
          this.getRefData();
        }
      },
    },
    tableType: {
      handler(newVal, oldVal) {
        this.loading = true;
        if (newVal == 1 || newVal == 2) {
          this.getComputedlist();
        } else if (newVal == 3) {
          this.getProcessData();
        } else {
          this.getRefData();
        }
      },
    },
  },
  created() {},
  methods: {
    // 关闭列表
    closed() {
      this.$emit("CustomerClose");
      this.dialogVisible = false;
      this.loading = true;
    },
    //提交客户信息
    handleEdit(row) {
      this.$emit("setCustomer", row);
      this.elMessage.success("已选择该顾客信息");
      console.log("选择的顾客信息-->", row);
    },
    //提交加工厂信息
    handleProcess(row) {
      this.$emit("CustomerClose");
      this.dialogVisible = false;
      this.$emit("setProcess", row);
    },
    //提交冷库信息
    handleRef(row) {
      this.$emit("CustomerClose");
      this.dialogVisible = false;
      this.$emit("setRefInfo", row);
    },
    // 获取顾客数据
    async getComputedlist() {
      const { data: res } = await this.$Customer.get(
        this.$store.state.userInfo.baseId
      );
      console.log("customer--->", res.data);
      if (res.statusCode !== 20000) {
        return this.elMessage.error("查询客户信息失败！！");
      }
      this.tableData = res.data;
      this.loading = false;
    },
    async getRefData() {
      const { data: res } = await this.$productOrder.get("ref");
      console.log("冷库信息-->", res);
      if (res.statusCode === 20000) {
        this.refDataList = res.data;
        this.loading = false;
      }
    },
    async getProcessData() {
      console.log(this.togermchitId);
      const { data: res } = await this.$processData.get(`${this.togermchitId}`);
      console.log(res);
      if (res.statusCode === 20000) {
        if (res.data.length === 0) {
          this.elMessage.info("暂无相关加工厂");
          this.closed();
        } else {
          this.processList = res.data;
          // for (let i = 0; i < this.processList.length; i++) {
          //   if (
          //     this.processList[i].processingFactoryName == null ||
          //     this.processList[i].processingFactoryName == "" ||
          //     this.processList[i].processingFactoryPositionLatitude == "" ||
          //     JSON.stringify(this.processList[i]) == "{}"
          //   ) {
          //     this.processList.splice(i, 1);
          //     i = i - 1;
          //   }
          // }
          this.loading = false;
        }
      }
    },
  },
};
</script>