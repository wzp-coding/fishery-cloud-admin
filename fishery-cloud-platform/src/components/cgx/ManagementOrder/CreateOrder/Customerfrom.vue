<template>
  <div>
    <el-dialog
      title="收货方信息"
      :visible.sync="CustomerVisible"
      width="50%"
      @close="closed"
    >
      <el-table
        v-if="tableType == 1"
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
      
      <el-table  height="450" v-if="tableType ==4" :data="refDataList.filter(
            (data) =>
              !search ||
              data.refrigeratoryName.toLowerCase().includes(search.toLowerCase()) 
          )">
        <el-table-column label="冷库名称" prop="refrigeratoryName"> </el-table-column>
        <el-table-column label="冷库地址" prop="refrigeratoryAddress"> </el-table-column>
        <el-table-column label="冷库温度" prop="refrigeratoryTemperature"> </el-table-column>
        <el-table-column label="冷库面积" prop="refrigeratoryArea"> </el-table-column>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="closed">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    CustomerVisible: {
      type: Boolean,
    },
    tableType: {
      type: Number,
    },
  },
  data() {
    return {
      tableData: [],
      search: "",
      baseid: "1350657222372835330",
      dialogVisible: false,
      refDataList:[],
      search:''
    };
  },
  created() {
    this.getComputedlist();
    this.temp();
    this.getRefData();
  },
  methods: {
    temp() {
      console.log(this.tableType);
    },
    // 关闭列表
    closed() {
      this.$emit("CustomerClose");
    },
    handleEdit(row) {
      this.$emit("setCustomer", row);
      this.elMessage.success("已选择该顾客信息");
      console.log("选择的顾客信息-->", row);
    },
    //提交冷库信息
    handleRef(row){
      console.log('冷库信息');
      this.$emit("setRefInfo", row)
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
    },
    async getRefData(){
      const {data: res} = await this.$productOrder.get('ref')
      console.log("REF--->",res);
      if(res.statusCode === 20000){
        this.refDataList = res.data;
      }
    }
  },
};
</script>