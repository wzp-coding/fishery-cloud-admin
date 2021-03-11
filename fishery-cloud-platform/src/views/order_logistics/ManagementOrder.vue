<template>

  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>订单物流</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item v-if="!card">顾客管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row
        class="globalHeader"
        style="margin-bottom: 20px; padding-bottom: 45px"
      >
        <el-col :span="4">
          <i class="el-icon-document"></i>
          <span v-if="card">订单管理</span>
          <span v-if="!card">顾客管理</span>
        </el-col>
        <!-- <div style="width: 75px; float: right;padding:0 28px 0 0">
          <el-button type="success" style=" " plain @click="card=!card">顾客管理</el-button>
        </div> -->
      </el-row>
    <!-- 卡片视图区域 -->
    <el-tabs type="border-card" @tab-click="changes()">
      <el-tab-pane label="订单管理">
        <el-row>
      <div style="width: 75px; float: right;padding:0 30px 0 0">
          <el-button type="primary" style=" " @click="createOrder()">创建订单</el-button>
        </div>
      </el-row>

      <!-- 订单信息列表区域 -->
      <el-table :data="OrderList" border stripe>
        <!-- border： 加入边框线 -->
        <!-- type="index"： 索引列 -->
        >
        <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-row :gutter="24">
             <el-col :span="6">
              <el-form-item label="电话：">
                <span>{{props.row.phoneNumber}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="数量">
                <span>{{props.row.phoneNumber}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="重量/kg">
                <span>{{props.row.weight}}</span>
              </el-form-item>
            </el-col>
            <el-col  :span="6">
              <el-form-item label="创建时间">
                <span>{{props.row.gmtCreate}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="修改时间">
                <span>{{props.row.gmtModified}}</span>
              </el-form-item>
            </el-col>
              <el-col :span="6">
              <el-form-item label="基地id">
                <span>{{props.row.baseId}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产品编号">
                <span>{{props.row.productId}}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="物流编号">
                <span>{{props.row.logisticsId}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </el-table-column>

        <el-table-column
          prop="targetName"
          label="客户名"

        ></el-table-column>
        <el-table-column
          prop="targetType"
          :formatter="customerType"
          label="客户类型"

        ></el-table-column>
        <el-table-column
          prop="productName"
          label="产品名"

        ></el-table-column>
        <el-table-column
          prop="money"
          label="金额/元"

        ></el-table-column>
        <el-table-column
          prop="status"
          :formatter="statusType"
          label="订单状态"

        ></el-table-column>
        <el-table-column
          prop="gmtCreate"
          label="创建时间"

        ></el-table-column>
        <el-table-column
          prop="receiveAddress"
          label="收货地址"

        ></el-table-column>
        <el-table-column label="二维码" width="150">
          <template slot-scope="">
            <!-- 物流二维码按钮 -->
            <el-button
              type="primary"
              size="mini"
              @click="logisticsOrcode()"
              >物流</el-button
            >
            <!-- 溯源二维码按钮 -->
            <el-button
              type="success"
              size="mini"
              @click="originOrcode()"
              >溯源</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            
              <el-tooltip
              effect="dark"
              content="修改订单"
              placement="top"
              :enterable="false"
            >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
              </el-tooltip>
              <!-- 修改按钮 -->
            
            <!-- 发货按钮 -->
              <el-tooltip
              effect="dark"
              content="发货"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-box"
                size="mini"
                @click="delivery(scope.row.id)"
              ></el-button>
            </el-tooltip>
            
            

            <!-- 查看物流信息 -->
            <el-tooltip
              effect="dark"
              content="物流信息"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="success"
                icon="el-icon-truck"
                size="mini"
                @click="toShowLogisticsInfo(scope.row.id)"
              ></el-button>
            </el-tooltip>
            
            

            <!-- 删除按钮 -->
              <Delete
              :id="scope.row.id"
              :title="deletetitle"
              :root="root"
              :deleteUrl="deleteUrl"
              @getAllInfo="setNode"
              >
              </Delete>
            
            
        
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pagenum"
        :page-sizes="[4, 6, 8, 10]"
        :page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      </el-tab-pane>
      
      <el-tab-pane label="顾客管理" >

      <!-- 订单信息列表区域 -->
      <el-row>
        <div style="width: 75px; float: right;padding:0 25px 0 0">
          <el-button type="success" style=" "  @click="createCustomera()">添加顾客</el-button>
        </div>
      </el-row>
      <el-table :data="CustomerList" border stripe style="width:100%">
        <!-- border： 加入边框线 -->
        <!-- type="index"： 索引列 -->
        >
        <el-table-column type="index"> </el-table-column>

        <el-table-column
          prop="customerName"
          label="客户名"

        ></el-table-column>
        <el-table-column
          prop="customerType"
          :formatter="customerType2"
          label="客户类型"

        ></el-table-column>
        <el-table-column
          prop="phoneNumber"
          label="电话"

        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"

        ></el-table-column>
        <el-table-column
          prop="receiveAddress"
          label="地址"

        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
          <!-- 修改按钮 -->
              <el-tooltip
              effect="dark"
              content="修改信息"
              placement="top"
              :enterable="false"
            >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="EditcustomerDialog(scope.row)"
            ></el-button>
              </el-tooltip>
           
            <!-- 删除按钮 -->
         
              <el-tooltip
              effect="dark"
              content="删除顾客"
              placement="top"
              :enterable="false"
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteCustomer(scope.row.id)"
            ></el-button>
              </el-tooltip>
         
             
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange2"
        @current-change="handleCurrentChange2"
        :current-page="pageInfo2.pagenum"
        :page-sizes="[4, 6, 8, 10]"
        :page-size="pageInfo2.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total2"
      >
      </el-pagination>
      </el-tab-pane>
    </el-tabs>

    <!-- 展示虾苗信息 或者 物流信息-->
     <!-- 暂时取消虾苗信息查询部分 -->
    <Show-info
      :title="title"
      :is-logistics="isLogistics"
      :dialog-visible="dialogVisible"
      :id="showInfoId"
      @notifyParent="ChangeDialogVisible"
    ></Show-info> 

<!-- 展示物流 或者 溯源二维码 -->
    <Show-orinfo
    :ortitle="orTitle"
    :is-show-code="isShowCode"
    :adult-shrimp-id="adultShrimpId"
    @notifyParent2="closeCode"
    
    >
    </Show-orinfo>

    <!-- 创建/修改订单信息的对话框 -->
    <Create-order
    :createdialogVisible="createdialogVisible"
    :orderid="orderid"
    :ordertitle="ordertitle"
    :look="look"
    @createnotifyParent="changecreatedialogVisible"
    >
    </Create-order> 
    <!-- 创建/修改顾客 -->
    <Create-customer
    :customercard="createCustomers"
    :customertitle="customertitle"
    :customerData="customerData"
    :look2="look2"
    @createnotifyParent="changecustomerdialogVisible"
    >
    </Create-customer>
  </div>
 
  
</template>

<script>
import QRCode from "qrcodejs2";
import ShowInfo from   "../../components/cgx/ManagementOrder/ShowInfo/ShowInfo1";
import ShowOrinfo from "../../components/cgx/ManagementOrder/ShowOrcode/ShowOrcode2";
import ShowChange from "../../components/cgx/ManagementOrder/ModifyInformation/ShowChange";
import CreateOrder from '../../components/cgx/ManagementOrder/CreateOrder/createOrder';
import Delete from '../../components/cgx/public/delete';
import Map from '../../components/public_components/MyLocationPicker';
import CreateCustomer from '../../components/cgx/ManagementOrder/CreateCustomer/createCustomer'
export default {
  components: {
    ShowInfo,
    ShowOrinfo,
    ShowChange,
    CreateOrder,
    Delete,
    Map,
    CreateCustomer
  },
  data() {
    return {
      //添加/修改顾客开关
      createCustomers:false,
      customertitle:"",
      customerData:{},
      look2:true,
      //控制订单和顾客管理卡片
      card:true,
      //删除接口标题
      deletetitle:"该订单",
      // 删除接口的根路径标签
      root: "managementOrder",
      // 删除接口的路径
      deleteUrl: "",
      //创建或修改订单
      ordertitle:"",
      createdialogVisible:false,
      orderid:"",
      look:true,
      // 判断
      customerjudge : ['个人', '企业', '加工厂', '冷库'],
      // orderstatus:['未发货','已发货'],
      // 传递给子组件
      title: "",
      isLogistics: false,
      showInfoId: "",
      dialogVisible: false,
      // -----------------------------------
      //传给二维码组件
      orTitle:"",
      isShowCode:false,
      // 当前点击订单的城虾id
      adultShrimpId: "1304076777332805632",
      // -----------------------------------
      token: window.localStorage.getItem("token"),
      // 基地编号
      baseId: '1350657222372835330',
      // 是否显示物流二维码页面
      isShowLCode: false,
      // 是否显示溯源二维码页面
      isShowOCode: false,
      // 用于控制分页的当前页码和条数
      pageInfo: {
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 10,
      },
       pageInfo2: {
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 10,
      },

      // 总条数
      total: null,
      total2:null,
      // 订单列表
      OrderList: [],
      //顾客列表
      CustomerList:[],
    };
  },
  created() {
    this.baseId=this.$store.state.userInfo.baseId;
    this.setNode();
  },
  methods: {
    //关闭添加/修改顾客
    changecustomerdialogVisible(){
       this.createCustomers=false;
       this.getCustomerList();
    },
    //添加顾客
    createCustomera(){
      this.createCustomers=true;
      this.customertitle="添加顾客"
    },
    //修改顾客
    EditcustomerDialog(data){
      this.createCustomers=true;
      this.customertitle="修改信息"
      this.look2=!this.look2
      this.customerData=data
      console.log("customerData--->",this.customerData)
    },
    //删除顾客
    async deleteCustomer(id){
      const confirmResult = await this.elConfirm(
        `此操作将永久删除顾客信息, 是否继续?`,
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
      const { data: res } = await this.$Customer.delete(
        `${id}`
      );
      if (res.statusCode == 20000) { 
        this.elMessage.success(res.message);
        this.getCustomerList();
      }
    },
    //改变卡片页面
    changes(){
      this.setNode();
      this.card=!this.card
      this.pageInfo.pagenum=1
      this.pageInfo.pagesize=10
      this.pageInfo2.pagenum=1
      this.pageInfo2.pagesize=10
    },
    //执行发货操作
    async delivery(id){
      const confirmResult = await this.elConfirm(
        `是否确认将该订单发货?`,
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
        return this.elMessage.info("已取消发货");
      }
      const { data: res } = await this.$managementOrder.put( `${"deliver"}/${id}`);
      if (res.statusCode == 20000) { 
        this.elMessage.success(res.message);
        this.setNode();
      }
       else {
            this.elMessage.error(res.message);
          }
    },
    //创建订单按钮
    createOrder(){
      this.createdialogVisible = true;
      this.ordertitle="创建订单"
    },
    // 客户类型判断传入
   customerType (row){
      return this.customerjudge[row.targetType-1]
    },
    customerType2 (row){
      return this.customerjudge[row.customerType-1]
    },
    // 订单状态判断传入
   statusType(row){
      if(row.logisticsId==null){
        return "未发货"
      }
      else{
        return "已发货"
      }
    },
  // 关闭修改/创建订单组件
  changecreatedialogVisible(){
    this.createdialogVisible=false;
    this.setNode();
  },

    // 展示物流信息时要传递给子组件的信息
    toShowLogisticsInfo(id) {
      this.title = "物流信息";
      this.isLogistics = true;
      this.showInfoId = id;
      this.dialogVisible = true;
    },
    // 展示信息子组件关闭时触发改变dialogVisible
    ChangeDialogVisible() {
      this.dialogVisible = false;
    },
    // 页面刷新 再次获取baseId
    setNode() {
      if (this.baseId !== "") {
        this.getOrderList();
        this.getCustomerList();
      } else {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        setTimeout(() => {
          this.getOrderList();
          this.getCustomerList();
          loading.close();
        }, 1000);
      }
    },
    // 物流二维码弹窗
    logisticsOrcode() {
      this.adultShrimpId = "1304076777332805632";
      this.orTitle="物流二维码"
      this.isShowCode = true;
      // this.$nextTick(() => {
      //   this.createlcode();
      // });
    },
    // 溯源二维码弹窗
    originOrcode() {
      this.adultShrimpId = "1304076777332805632";
      this.orTitle="溯源二维码"
      this.isShowCode = true;
      // this.$nextTick(() => {
      //   this.createocode();
      // });
    },
    // // 前往判断是否收货页面
    toLcodeWeb(id) {
      this.$router.push({
        path: "/IsArriveLcode",
        query: { id: id },
      });
    },
    // 前往判断是否收货页面
    toOcodeWeb(id) {
      this.$router.push({
        path: "/IsArriveOcode",
        query: { id: id },
      });
    },
    // // 生成物流二维码
    // createlcode() {
    //   new QRCode("orcode", {
    //     width: 250,
    //     height: 250,
    //   }).makeCode(
    //     "http://106.75.132.85:9002/#/IsArriveLcode?id=" + this.adultShrimpId
    //   );
    // },
    // // 生成溯源二维码
    // createocode() {
    //   new QRCode("orcode", {
    //     width: 250,
    //     height: 250,
    //   }).makeCode(
    //     "http://106.75.132.85:9002/#/IsArriveOcode?id=" + this.adultShrimpId
    //   );
    // },
    // 关闭弹框,清除已经生成的二维码
    closeCode() {
      this.isShowCode = false;
    },
    // 监听pagesize(每页显示条数)改变事件
    handleSizeChange(newSize) {
      this.pageInfo.pagesize = newSize;
      this.getOrderList();
    },
    handleSizeChange2(newSize) {
      this.pageInfo2.pagesize = newSize;
      this.getCustomerList();
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.pageInfo.pagenum = newPage;
      this.getOrderList();
      console.log("222333")
    },
    handleCurrentChange2(newPage) {
      this.pageInfo2.pagenum = newPage;
      this.getCustomerList();
      console.log("111222")
    },

    // 获取订单信息
    async getOrderList() {
      const { data: res } = await this.$managementOrder.get(
        `baseOrder/${this.baseId}/${this.pageInfo.pagenum}/${this.pageInfo.pagesize}`
      );
      console.log("结果1:",res);
      if (res.statusCode !== 20000) {
        return this.$message.error("获取虾苗订单列表失败！！");
      }
      this.OrderList = res.data.records;
      this.total = res.data.total;
      console.log("uersinfo-->",this.$store.state.userInfo)
      console.log("OrderList:",this.OrderList)
      console.log("total:",this.total)
    },
    // 获取顾客信息
    async getCustomerList() {
      const { data: res } = await this.$Customer.get(
        `${this.baseId}/${this.pageInfo2.pagenum}/${this.pageInfo2.pagesize}`
      );
      console.log("结果2:",res);
      if (res.statusCode !== 20000) {
        return this.$message.error("获取顾客信息失败！！");
      }
      this.CustomerList = res.data.records;
      this.total2 = res.data.total;
      console.log("getCustomerList:",this.CustomerList)
      console.log("total2:",this.total2)
    },

     // 展示修改的对话框
    async showEditDialog(id) {
      this.createdialogVisible = true;
      this.ordertitle="修改订单"
      this.orderid=id
      this.look=!this.look
    },
    
  },
};
</script>

<style lang="less" scoped>
#lcode,
#ocode {
  height: 250px;
  width: 250px;
  padding: 5px;
  border: 1px solid rgb(161, 161, 161);
  border-radius: 6px;
}

</style>
