<template>
  <div>
    <el-dialog
      :title="ordertitle"
      :visible.sync="dialogVisible"
      width="45%"
      @close="close"
    >
      <el-form
        ref="form"
        :model="orderobject"
        label-width="95px"
        :rules="rules"
      >
        <el-form-item label="产品名">
          <el-input disabled v-model="orderName"></el-input>
        </el-form-item>
        <el-form-item label="客户类型">
          <el-select
            v-model="orderobject.targetType"
            placeholder="请选择客户类型"
          >
            <el-option label="个人" :value="1"></el-option>
            <el-option label="企业" :value="2"></el-option>
            <el-option label="加工厂" :value="3"></el-option>
            <el-option label="冷库" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="发货方类型">
          <el-select
            v-model="orderobject.sourceType"
            placeholder="请选择发货方类型"
          >
            <el-option label="养殖基地" :value="1"></el-option>
            <el-option label="加工厂" :value="2"></el-option>
            <el-option label="冷库" :value="3"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="客户">
          <el-input
            clearable
            v-model="orderobject.targetName"
            placeholder="请输入收货方"
            style="width: 35ex"
          ></el-input>
          <el-button
            type="primary"
            plain
            v-if="orderobject.targetType"
            @click.prevent="CustomerVisible = true"
            style="margin: 0 10px"
            ><span v-if="orderobject.targetType <= 2">从已有客户表中选择</span>
            <span v-if="orderobject.targetType == 3"
              >从已有加工厂信息中选择</span
            >
            <span v-if="orderobject.targetType == 4">从已有冷库信息中选择</span>
          </el-button>
        </el-form-item>
        <el-form-item
          label="加工厂/冷库编号"
          v-if="
            orderobject.type > 2 ||
            orderobject.type == '加工厂' ||
            orderobject.targetType == '冷库'
          "
        >
          <el-input v-model="orderobject.targetId"></el-input>
        </el-form-item>
        <el-form-item
          label="加工厂/冷库名字"
          v-if="
            orderobject.type > 2 ||
            orderobject.type == '加工厂' ||
            orderobject.targetType == '冷库'
          "
        >
          <el-input v-model="orderobject.targetName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话 ">
          <el-input
            v-model="orderobject.phoneNumber"
            placeholder="请输入收货方电话"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="基地编号 ">
          <el-input
            v-model="orderobject.baseId"
            placeholder="请输入"
            disabled
          ></el-input>
        </el-form-item> -->
        <el-form-item label="出售质量(kg)">
          <el-input
            v-model="orderobject.weight"
            placeholder="请输入出售质量"
            :max="catchMax"
          ></el-input>
        </el-form-item>
        <el-form-item label="出售数量">
          <el-input
            v-model="orderobject.amount"
            placeholder="请输入出售数量"
            :max="surplusAmount"
          ></el-input>
        </el-form-item>
        <el-form-item label="金额(万元)">
          <el-input
            v-model="orderobject.money"
            placeholder="请输入出售金额"
            :disabled="orderobject.baseId === orderobject.targetId"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="产品编号">
          <el-input v-model="orderid" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="收货地址">
          <el-select
            v-model="orderobject.receiveAddress"
            placeholder="请拖拽地图选择收货地址"
            style="width: 50ex"
          >
            <el-option
              v-for="(item, index) in addressArray"
              :key="item + index"
              :label="item.address + item.title"
              :value="item.address + item.title"
              @click.native="setcoordinates(item.location)"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <Map
          :selectedLocation="location"
          @getCenterAddress="setAddress"
          @getAroundPoi="setpoi"
        >
        </Map>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
    <Customerfrom
      :CustomerVisible="CustomerVisible"
      @setCustomer="setCustomer"
      @setRefInfo="setRefInfo"
      @CustomerClose="CustomerClose"
      @setProcess="setProcess"
      :tableType="orderobject.targetType"
    >
    </Customerfrom>
  </div>
</template>
<script>
import Map from "../../../public_components/MyLocationPicker";
import Customerfrom from "./Customerfrom.vue";
export default {
  components: {
    Map,
    Customerfrom,
  },
  props: {
    createdialogVisible: {
      type: Boolean,
      default: false,
    },
    ordertitle: {
      type: String,
    },
    orderid: {
      type: String,
    },
    look: {
      type: Boolean,
    },
    orderName: {
      type: String,
    },
    catchMax: {
      type: Number,
    },
    surplusAmount: {
      type: Number,
    },
  },
  data() {
    return {
      // 地图传来的地址数组
      addressArray: [],
      // 传入地图的中心坐标
      location: {
        lat: "",
        lng: "",
      },
      // --------列表数据-------
      orderobject: {
        sourceType: 1,
        // 接受坐标
        addressLatitude: "",
        addressLongitude: "",
        // 接收地址
        receiveAddress: "",
        //   产品数量
        amount: "",
        baseId: this.$store.state.userInfo.baseId,
        money: null,
        weight: null,
        phoneNumber: "",
        productId: this.orderid,
        productName: this.orderName,
        //   用户id
        targetId: "",
        //   用户名字
        targetName: "",
        //   类型
        targetType: null,
      },
      // 控制顾客表单
      CustomerVisible: false,
      // 冷库面板
      ProductVisible: false,
      dialogVisible: this.createdialogVisible,
      rules: {},
    };
  },
  watch: {
    createdialogVisible: {
      handler(newVal, oldVal) {
        this.dialogVisible = newVal;
      },
    },
  },
  methods: {
    // 关闭时设置为空
    setcloseorderobject() {
      this.orderobject.sourceType = 1;
      this.orderobject.targetName = "";
      this.orderobject.phoneNumber = "";
      this.orderobject.targetId = "";
      this.orderobject.targetType = null;
      this.orderobject.receiveAddress = "";
      this.orderobject.addressLatitude = "";
      this.orderobject.amount = "";
      this.orderobject.money = "";
      this.orderobject.weight = null;
      this.orderobject.productId = "1364935085419737090";
      this.orderobject.productName = "";
      this.orderobject.addressLongitude = "";
      this.close();
    },
    // 设置坐标
    setcoordinates(location) {
      this.location = location;
      this.orderobject.addressLatitude = location.lat;
      this.orderobject.addressLongitude = location.lng;
      console.log("location-->", this.location);
    },
    // 关闭表单
    close() {
      this.$emit("createnotifyParent");
      this.dialogVisible = false;
    },
    // 设置地图返回的定点位置
    setAddress(address) {
      console.log("address-->", address);
      this.orderobject.receiveAddress = address;
    },
    // 设置地图返回的位置数组
    setpoi(poi) {
      this.addressArray = poi;
      this.orderobject.addressLatitude = poi[0].location.lat;
      this.orderobject.addressLongitude = poi[0].location.lng;
    },
    // 关闭收货方信息
    CustomerClose() {
      this.CustomerVisible = false;
      // this.
    },
    // 设置子组件传来的顾客信息
    setCustomer(row) {
      console.log(row);
      this.orderobject.targetName = row.customerName;
      this.orderobject.phoneNumber = row.phoneNumber;
      this.orderobject.targetId = row.id;
      this.orderobject.receiveAddress = row.receiveAddress;
      this.orderobject.addressLatitude = row.addressLatitude;
      this.orderobject.addressLongitude = row.addressLongitude;
      let a = {
        lat: "",
        lng: "",
      };
      a.lat = row.addressLatitude;
      a.lng = row.addressLongitude;
      this.location = a;
      this.CustomerClose();
    },
    //设置冷库信息
    setRefInfo(row) {
      console.log(row);
      this.orderobject.receiveAddress = row.refrigeratoryAddress;
      this.orderobject.addressLatitude = row.refrigeratoryPositionLatitude;
      this.orderobject.addressLongitude = row.refrigeratoryPositionLongitude;
      this.orderobject.targetId = row.baseId;
      this.orderobject.targetName = row.refrigeratoryName;
      console.log(this.orderobject);
    },
    async setProcess(row) {
      console.log(row);
      this.orderobject.targetId = row.baseId;
      this.orderobject.receiveAddress = row.factoryAddress;
      this.orderobject.targetName = row.factoryName;
      const { data: res } = await this.$getOneProcess.get(`${row.id}`);
      if (res.statusCode === 20000) {
        this.orderobject.addressLatitude =
          res.data.processingFactoryPositionLongitude;
        this.orderobject.addressLongitude =
          res.data.processingFactoryPositionLatitude;
      }
      console.log(this.orderobject);
    },
    // 提交创建表单
    async handleSubmit() {
      if ((this.orderobject.baseId = this.orderobject.targetId)) {
        this.orderobject.money = 0;
      } else {
        this.orderobject.money = parseInt(this.orderobject.money);
      }
      this.orderobject.productId = this.orderid;
      this.orderobject.productName = this.orderName;
      this.orderobject.amount = parseInt(this.orderobject.amount);
      this.orderobject.weight = parseInt(this.orderobject.weight);
      console.log("即将创建的订单--> ", this.orderobject);
      const { data: res } = await this.$managementOrder.post(
        "",
        this.orderobject
      );
      console.log("res: ", res);
      if (res.statusCode === 20000) {
        this.elMessage.success(res.message);
        this.$emit("refresh");
        this.setcloseorderobject();
      } else {
        this.elMessage.error(res.message);
      }
    },
  },
};
</script>