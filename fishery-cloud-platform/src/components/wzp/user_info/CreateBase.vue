<template>
  <div class="create-base-container">
      <el-form :model="createInfo" :rules="rules">
        <TheDialogLayout>
          <el-form-item
            slot="pre"
            label="基地老板"
            label-width="130px"
            prop="creator"
          >
            <el-input v-model="createInfo.creator"></el-input>
          </el-form-item>
          <el-form-item
            slot="after"
            label="基地名称"
            label-width="130px"
            prop="name"
          >
            <el-input v-model="createInfo.name"></el-input>
          </el-form-item>
        </TheDialogLayout>
        <TheDialogLayout>
          <el-form-item
            slot="pre"
            label="成立基金(万元)"
            label-width="130px"
            prop="funds"
          >
            <el-input v-model="createInfo.funds"></el-input>
          </el-form-item>
          <el-form-item
            slot="after"
            label="基地类型"
            label-width="130px"
            prop="types"
          >
            <el-select
              v-model="createInfo.types"
              multiple
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in baseTypeList"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </TheDialogLayout>
        <TheDialogLayout>
          <el-form-item
            slot="pre"
            label="营业执照注册号"
            label-width="130px"
            prop="registerNumber"
          >
            <el-input v-model="createInfo.registerNumber"></el-input>
          </el-form-item>
          <el-form-item
            slot="after"
            label="经营范围"
            label-width="130px"
            prop="scope"
          >
            <el-input v-model="createInfo.scope"></el-input>
          </el-form-item>
        </TheDialogLayout>
        <TheDialogLayout>
          <el-row slot="pre">
            <el-col :offset="4" :span="6">基地图片</el-col>
            <el-col :span="14">
              <el-button type="primary" @click="isOpenUpload = true"
                >上传图片（限制3张）</el-button
              >
              <UploadFile
                :is-open="isOpenUpload"
                :close-modal="() => (this.isOpenUpload = false)"
                :max="3"
                :min="3"
                :type="'image'"
                :init-files="createInfo.picture"
                :upload-success="handleUploadPic"
              ></UploadFile>
            </el-col>
          </el-row>
        </TheDialogLayout>
        <el-row :gutter="20">
          <el-col>
            <el-form-item
              label="基地简介"
              label-width="130px"
              prop="introduction"
            >
              <el-input
                placeholder="请输入基地简介"
                type="textarea"
                :rows="7"
                v-model="createInfo.introduction"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <TheDialogLayout> -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="基地地址" label-width="130px" prop="address">
              <el-select
                placeholder="请通过拖拽地图选择基地地址"
                v-model="createInfo.address"
                style="width: 95%"
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
          </el-col>
        </el-row>
        <Map
          :selectedLocation="location"
          @getCenterAddress="setAddress"
          @getAroundPoi="setpoi"
        ></Map>
        <!-- </TheDialogLayout> -->
      </el-form>
      <div class="create-base-footer">
        <el-button type="primary" @click="createEvent">确认创建</el-button>
      </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import TheDialogLayout from "../../ccy/public/TheDialogLayout";
import Map from "../../public_components/MyLocationPicker";
import UploadFile from "../../public_components/UploadFile";
export default {
  components: {
    TheDialogLayout,
    Map,
    UploadFile,
  },
  data() {
    return {
      isOpenUpload: false,
      createInfo: {
        address: "",
        creator: "",
        funds: null,
        introduction: "",
        name: "",
        picture: "",
        positionLatitude: "",
        positionLongitude: "",
        registerNumber: "",
        scope: "",
        types: [],
      },
      // 地图传来的地址数组
      addressArray: [],
      // 传入地图的中心坐标
      location: {
        lat: "",
        lng: "",
      },
      baseTypeList: [],
      rules: {
        creator: [
          { required: true, message: "请输入基地老板", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入基地名称", trigger: "blur" }],
        funds: [{ required: true, message: "请输入成立基金", trigger: "blur" }],
        types: [{ required: true, message: "请选择基地类型", trigger: "blur" }],
        registerNumber: [
          {
            required: true,
            message: "请输入营业执照注册号",
            trigger: "blur",
          },
        ],
        scope: [{ required: true, message: "请输入养殖类型", trigger: "blur" }],
        introduction: [
          { required: true, message: "请输入基地简介", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入基地地址", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
    this.getBaseType();
  },
  methods: {
    ...mapMutations(["setUserInfo"]),
    async getBaseType() {
      const { data: res } = await this.$baseType.get();
      console.log("baseType: ", res);
      if (res.statusCode === 20000) {
        this.baseTypeList = res.data;
        for (let i = 0; i < this.baseTypeList.length; i++) {
          this.baseTypeList[i] = JSON.parse(this.baseTypeList[i]);
        }
      } else {
        console.error(res.message);
      }
    },
    async createEvent() {
      console.log("this.createInfo: ", this.createInfo);
      const { data: res } = await this.$admin.post(
        "/addBase/" + this.userInfo.id,
        this.createInfo
      );
      console.log("addBase: ", res);
      if (res.statusCode === 20000) {
        this.elMessage.success("创建基地成功");
        // 基地创建后，用户信息(role,roleId,baseId)会发生改变
        const newUserInfo = await this.getSelfInfo();
        console.log("newUserInfo: ", newUserInfo);
        this.$store.commit(
          "setUserInfo",
          Object.assign(this.userInfo, {
            role: newUserInfo.roleName,
            roleId: newUserInfo.roleId,
            baseId:newUserInfo.baseId
          })
        );
        this.$router.push("/login");
        this.elMessage.info('权限发生改变，请您重新登录！')
      } else {
        this.elMessage.error(res.message);
      }
    },
    // 获取创建基地后用户的详情信息
    async getSelfInfo() {
      const { data: res } = await this.$user.get("/self");
      // console.log("getSelfInfo: ", res);
      if (res.statusCode === 20000) {
        return res.data;
      } else {
        console.error(res.message);
      }
    },
    // 所有文件上传完成触发
    handleUploadPic(fileStr) {
      this.createInfo.picture = fileStr;
    },
    // 设置地图返回的定点位置
    setAddress(address, centerPos) {
      console.log("centerPos: ", centerPos);
      this.createInfo.positionLongitude = centerPos.lng;
      this.createInfo.positionLatitude = centerPos.lat;

      console.log("address-->", address);
      this.createInfo.address = address;
    },
    // 设置地图返回的位置数组
    setpoi(poi) {
      console.log("pio-->", poi);
      this.addressArray = poi;
    },
    // 设置坐标
    setcoordinates(location) {
      this.location = location;
      this.createInfo.positionLongitude = this.location.lng;
      this.createInfo.positionLatitude = this.location.lat;
      console.log("location-->", this.location);
    },
  },
};
</script>

<style lang="less" scoped>
.upload .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.create-base-container {
  // background-image: url("../../assets/images/loginbg.jpg");
  // background-repeat: no-repeat;
  // background-size: cover;
  .create-base-card {
    margin: auto;
    width: 70%;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .create-base-footer {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>