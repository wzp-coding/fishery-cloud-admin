<template>

  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>订单物流</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row
        class="globalHeader"
        style="margin-bottom: 20px; padding-bottom: 45px"
      >
        <el-col :span="4">
          <i class="el-icon-document"></i>
          <span>订单管理</span>
        </el-col>
        <div style="width: 75px; float: right;padding:0 25px 0 0">
          <el-button type="primary" style=" " @click="createdialogVisible=true">创建订单</el-button>
        </div>
      </el-row>

      <!-- 订单信息列表区域 -->
      <el-table :data="OrderList" border stripe>
        <!-- border： 加入边框线 -->
        <!-- type="index"： 索引列 -->
        >
        <el-table-column type="index"> </el-table-column>
        <!-- <el-table-column
          prop="logisticsId"
          label="物流编号"
          width="180"
        ></el-table-column> -->

        <el-table-column
          prop="customerName"
          label="客户名"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="customerType"
          label="客户类型"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="money"
          label="金额/元"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="weight"
          label="重量/kg"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="createBy"
          label="创建者"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="receiptAddress"
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
        <el-table-column label="操作" width="240px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 查看虾苗信息按钮 -->
            <el-tooltip
              effect="dark"
              content="虾苗信息"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-tickets"
                size="mini"
                @click="toShowShrimpInfo('1353643502189223938')"
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
                @click="
                  toShowLogisticsInfo(adultShrimpId)
                "
              ></el-button>
            </el-tooltip>

            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeOrderById(scope.row.id)"
            ></el-button>
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
    </el-card>

    <!-- 修改订单信息的对话框 -->
    <Show-change
    :edit-form-rules="editFormRules"
    :edit-form="editForm"
    :adit-dialog-visible="aditDialogVisible"
    :remain="remain"
    :personInfoList="personInfoList"
    :constWeight="constWeight"
    :options="options"
    @changenotifyParent="changenotifyParent"
    @getOrderList="getOrderList"
    >
    </Show-change>

    <!-- 展示虾苗信息 或者 物流信息-->
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
    :options="options"
    @notifyParent2="closeCode"
    
    >
    </Show-orinfo>

    <!--展示创建订单-->
    <Create-order
    :createdialogVisible="createdialogVisible"
    @createnotifyParent="changecreatedialogVisible"
    >
    </Create-order>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import ShowInfo from   "../components/cgx/ManagementOrder/ShowInfo/ShowInfo1";
import ShowOrinfo from "../components/cgx/ManagementOrder/ShowOrcode/ShowOrcode2";
import ShowChange from "../components/cgx/ManagementOrder/ModifyInformation/ShowChange";
import CreateOrder from '../components/cgx/ManagementOrder/CreateOrder/createOrder.vue';
export default {
  components: {
    ShowInfo,
    ShowOrinfo,
    ShowChange,
    CreateOrder,
  },
  data() {
    return {
      // 传给创建订单组件
      createdialogVisible:false,

      // 传递给子组件
      title: "虾苗信息",
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
      baseId: 1248910886228332544,
      // 是否显示物流二维码页面
      isShowLCode: false,
      // 是否显示溯源二维码页面
      isShowOCode: false,
      // 用于控制分页的当前页码和条数
      pageInfo: {
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 4,
      },

      // 总条数
      total: "",

      // 控制修改订单信息对话框的显示和隐藏
      aditDialogVisible: false,

      //   保存重量，用于修改
      constWeight: 0,

      // 保存虾苗剩余量
      remain: 400,

      // 修改表单的验证规则对象
      editFormRules: {
        shrimpBatchName: [
          { required: true, message: "请输入批次名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "虾苗批次名称的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        customerName: [
          { required: true, message: "请输入客户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "客户名的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        money: [{ required: true, message: "请输入金额", trigger: "blur" }],
        weight: [{ required: true, message: "请输入重量", trigger: "blur" }],
        createDate: [
          { required: true, message: "请输入创建日期", trigger: "blur" },
        ],
        receiptAddress: [
          { required: true, message: "请输入收货地址", trigger: "blur" },
        ],
      },

      // 保存客户类型选项·
      options: [
        {
          value: "个人",
          label: "个人",
        },
        {
          value: "企业",
          label: "企业",
        },
      ],

      // 用于存放人员信息
      personInfoList: [
       
      ],

      // 订单列表
      OrderList: [{
        addressLatitude: "22.27534",
        addressLongitude: "114.16546",
        adultShrimpId: "1304076777332805632",
        baseId: "1316658083052785664",
        createBy: "张三",
        createDate: "2020-09-10 23:18:25",
        customerName: "长江水产",
        customerType: "企业",
        id: "1304076779169910784",
        logisticsId: "1304076778272329728",
        money: 1000,
        receiptAddress: "中国香港特别行政区香港特别行政区中西区花旗銀行大廈",
        shrimpBatchName: "斑节A1",
        shrimpId: "1304057615399129088",
        weight: 100,
      },
      {
        addressLatitude: "22.27534",
        addressLongitude: "114.16546",
        adultShrimpId: "1304076777332805632",
        baseId: "1316658083052785664",
        createBy: "张三",
        createDate: "2020-09-10 23:18:25",
        customerName: "长江水产",
        customerType: "企业",
        id: "1304076779169910784",
        logisticsId: "1304076778272329728",
        money: 1000,
        receiptAddress: "中国香港特别行政区香港特别行政区中西区花旗銀行大廈",
        shrimpBatchName: "斑节A1",
        shrimpId: "1304057615399129088",
        weight: 100,
      },{
        addressLatitude: "22.27534",
        addressLongitude: "114.16546",
        adultShrimpId: "1304076777332805632",
        baseId: "1316658083052785664",
        createBy: "张三",
        createDate: "2020-09-10 23:18:25",
        customerName: "长江水产",
        customerType: "企业",
        id: "1304076779169910784",
        logisticsId: "1304076778272329728",
        money: 1000,
        receiptAddress: "中国香港特别行政区香港特别行政区中西区花旗銀行大廈",
        shrimpBatchName: "斑节A1",
        shrimpId: "1304057615399129088",
        weight: 100,
      },{
        addressLatitude: "22.27534",
        addressLongitude: "114.16546",
        adultShrimpId: "1304076777332805632",
        baseId: "1316658083052785664",
        createBy: "张三",
        createDate: "2020-09-10 23:18:25",
        customerName: "长江水产",
        customerType: "企业",
        id: "1304076779169910784",
        logisticsId: "1304076778272329728",
        money: 1000,
        receiptAddress: "中国香港特别行政区香港特别行政区中西区花旗銀行大廈",
        shrimpBatchName: "斑节A1",
        shrimpId: "1304057615399129088",
        weight: 100,
      }
      ],

      // 修改：查询到的订单信息
      editForm: {
        addressLatitude: "22.27534",
        addressLongitude: "114.16546",
        adultShrimpId: "1304076777332805632",
        baseId: "1316658083052785664",
        createBy: "张三",
        createDate: "2020-09-10 23:18:25",
        customerName: "长江水产",
        customerType: "企业",
        id: "1304076779169910784",
        logisticsId: "1304076778272329728",
        money: 1000,
        receiptAddress: "中国香港特别行政区香港特别行政区中西区花旗銀行大廈",
        shrimpBatchName: "斑节A1",
        shrimpId: "1304057615399129088",
        weight: 100,
      },

      

    };
  },
  // created() {
  //   this.setNode();
  // },
  methods: {
  // 关闭创建订单组件
  changecreatedialogVisible(){
    this.createdialogVisible=false;
  },
    // 展示虾苗信息时要传递给子组件的信息
    toShowShrimpInfo(id) {
    this.title = "虾苗信息";
      this.isLogistics = false;
      this.showInfoId = id;
      this.dialogVisible = true;
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
    // -----------------------------------------------
    // 页面刷新 再次获取baseId
    // setNode() {
    //   if (this.baseId !== "") {
    //     this.getOrderList();
    //     this.getPersonInfoList();
    //   } else {
    //     const loading = this.$loading({
    //       lock: true,
    //       text: "Loading",
    //       spinner: "el-icon-loading",
    //       background: "rgba(0, 0, 0, 0.7)",
    //     });
    //     setTimeout(() => {
    //       this.baseId = this.defines.baseId;
    //       this.getOrderList();
    //       this.getPersonInfoList();
    //       loading.close();
    //     }, 1000);
    //   }
    // },
    // 物流二维码弹窗
    logisticsOrcode() {
      this.adultShrimpId = "1304076777332805632";
      this.orTitle="物流二维码"
      this.isShowCode = true;
      this.$nextTick(() => {
        this.createlcode();
      });
    },
    // 溯源二维码弹窗
    originOrcode() {
      this.adultShrimpId = "1304076777332805632";
      this.orTitle="溯源二维码"
      this.isShowCode = true;
      this.$nextTick(() => {
        this.createocode();
      });
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
    // 生成物流二维码
    createlcode() {
      new QRCode("orcode", {
        width: 250,
        height: 250,
      }).makeCode(
        "http://106.75.132.85:9002/#/IsArriveLcode?id=" + this.adultShrimpId
      );
    },
    // 生成溯源二维码
    createocode() {
      new QRCode("orcode", {
        width: 250,
        height: 250,
      }).makeCode(
        "http://106.75.132.85:9002/#/IsArriveOcode?id=" + this.adultShrimpId
      );
    },
    // 关闭弹框,清除已经生成的二维码
    closeCode() {
      this.isShowCode = false;
      console.log("isShowCode1---->",this.isShowCode)
    },
    // 监听pagesize(每页显示条数)改变事件
    handleSizeChange(newSize) {
      this.pageInfo.pagesize = newSize;
      this.getOrderList();
    },
    // 改变修改信息对话框触发时改变aditDialogVisible
    changenotifyParent(){
      this.aditDialogVisible = false;
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.pageInfo.pagenum = newPage;
      this.getOrderList();
    },

    // 获取人员信息
    // async getPersonInfoList() {
    //   const { data: res } = await this.$http.get(
    //     `${this.$limit}/user/getBaseMember`,
    //     {
    //       headers: {
    //         Authorization: this.token,
    //       },
    //     }
    //   );
    //   this.personInfoList = res.data;
    //   console.log(this.personInfoList);
    // },

    // // 获取订单信息
    async getOrderList() {
      const { data: res } = await this.$http.post(
        `/order/search/${this.pageInfo.pagenum}/${this.pageInfo.pagesize}`,
        {
          baseId: this.baseId,
        }
      );
      console.log("执行出错:",res);
      if (res.code !== 20000) {
        return this.$message.error("获取虾苗订单列表失败！！");
      }
      this.OrderList = res.data.rows;
      this.total = res.data.total;
      console.log("OrderList:",OrderList)
      console.log("total:",total)
    },

    // // 获取虾苗剩余量
    async getShrimpRemainById(id) {
      // 调用根据ID查询用户信息接口
      console.log(id);
      const { data: res } = await this.$originAxios.get("/shrimp/" + id);
      if (res.code !== 20000) {
        return this.$message.error("查询该虾苗剩余量失败！！");
      }
      this.remain = res.data.remain;
    },

    // // 展示修改的对话框
    async showEditDialog(id) {
      // 调用根据ID查询用户信息接口
      // const { data: res } = await this.$originAxios.get("/logistics/order/" + "{"+id+"}");
      // if (res.code !== 20000) {
      //   return this.$message.error("查询该订单信息失败！！");
      // }
      // console.log(res);
      // this.editForm = res.data;
      // // this.getShrimpRemainById(this.editForm.shrimpId);
      // this.constWeight = res.data.weight;
      // console.log(this.editForm)
      this.aditDialogVisible = true;
    },

    

    // // 根据id删除对应的订单信息
    // async removeOrderById(id) {
    //   // 前提：在elementUI中挂载confirm
    //   // （提示消息，标题文本，｛确认按钮的文本，取消按钮的文本，提示的类型｝）
    //   const confirmResult = await this.$confirm(
    //     "此操作将永久删除该订单信息, 是否继续?",
    //     "提示",
    //     {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning",
    //     }
    //     // .catch 用于捕获错误返回给confirmResult
    //   ).catch((err) => {
    //     return err;
    //   });
    //   // 如果确认删除，则返回值为字符串 confirm
    //   // 如果取消了删除， 则返回值为字符串 cancel
    //   if (confirmResult !== "confirm") {
    //     // this.$message.info: 灰色提示框
    //     return this.$message.info("已取消删除");
    //   }
    //   const { data: res } = await this.$http.delete("/order/" + id);
    //   if (res.code !== 20000) {
    //     return this.$message.error("删除订单信息失败");
    //   }
    //   this.$message.success("删除订单信息成功！！");
    //   this.getOrderList();
    // },

    
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
#map {
  width: 100%;
  height: 480px;
}
</style>
>>>>>>> c8aba1c1744b85dbb07ac9c209d617647127392c
