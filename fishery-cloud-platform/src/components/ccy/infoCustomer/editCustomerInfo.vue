<template>
  <el-dialog
    title="修改客户信息"
    :visible.sync="toDialogInfo.dialogVisible"
    width="35%"
    @close="closeEvent"
  >
    <el-form :model="editInfo" label-width="120px" :rules="rules" ref="formRef">
      <el-form-item label="客户名" prop="customerName">
        <el-input v-model="editInfo.customerName"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contactPerson">
        <el-input v-model="editInfo.contactPerson"></el-input>
      </el-form-item>
      <el-form-item label="客户类型" prop="contactPerson">
        <el-select v-model="editInfo.customerType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.type"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="phoneNumber">
        <el-input v-model="editInfo.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="收货地址" prop="receiveAddress">
        <el-select
          style="width: 100%"
          v-model="editInfo.receiveAddress"
          placeholder="请通过拖拽地图选择收货地址"
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
      <Map :selectedLocation="location"
        @getCenterAddress="setAddress"
        @getAroundPoi="setpoi"></Map>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toDialogInfo.dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editEvent">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Map from "../../public_components/MyLocationPicker";
export default {
  components: {
    Map,
  },
  props: {
    toDialogInfo: {
      type: Object,
    },
  },
  data() {
    return {
      editInfo: {
        addressLatitude: "",
        addressLongitude: "",
        baseId: this.$store.state.baseInfo.id,
        contactPerson: "",
        customerName: "",
        customerType: "",
        email: "",
        phoneNumber: "",
        receiveAddress: "",
        id: "",
      },
      options: [
        {
          id: 2,
          type: "企业",
        },
        {
          id: 1,
          type: "个人",
        },
      ],
      rules: {
        contactPerson: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        customerName: [
          { required: true, message: "请输入客户名或单位", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入客户邮箱", trigger: "blur" },
          {
            required: true,
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: "请输入正确的邮箱",
            trigger: "blur",
          },
        ],
        phoneNumber: [
          { required: true, message: "请输入客户联系电话", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        receiveAddress: [
          { required: true, message: "请输入收货地址", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 33 个字符",
            trigger: "blur",
          },
        ],
      },
      // 地图传来的地址数组
      addressArray: [],
      // 传入地图的中心坐标
      location: {
        lat: "",
        lng: "",
      },
      initPoint: {
        lat: "",
        lng: "",
      },
    };
  },
  created() {
  },
  methods: {
    async editEvent() {
      this.editInfo.id = this.toDialogInfo.id;
      console.log(this.editInfo);
      const { data: res } = await this.$Customer.put("", this.editInfo);
      console.log(res);
      if (res.statusCode === 20000) {
        this.toDialogInfo.dialogVisible = false;
        this.elMessage.success("修改客户信息成功");
        this.$emit("fatherMethods");
      }
    },
    closeEvent() {
      this.$refs.formRef.resetFields();
    },
    // 设置地图返回的定点位置
    setAddress(address) {
      console.log("address-->", address);
      this.editInfo.receiveAddress = address;
    },
    // 设置地图返回的位置数组
    setpoi(poi) {
      console.log("pio-->", poi);
      this.addressArray = poi;
    },
    // 设置坐标
    setcoordinates(location) {
      this.location = location;
      this.editInfo.addressLatitude =this.location.lat
      this.editInfo.addressLongitude = this.location.lng
      console.log("location-->", this.location);
    },
  },
};
</script>

<style>
</style>