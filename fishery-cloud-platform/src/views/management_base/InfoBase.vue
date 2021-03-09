<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>基地管理</el-breadcrumb-item>
      <el-breadcrumb-item>基地信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <TheCardHead>
        <div slot="CardTitle">
          <i class="el-icon-document-copy"></i>
          <span>基地信息</span>
        </div>
      </TheCardHead>
      <el-form
        :data="baseInfo"
        ref="resForm"
        :rules="formRules"
        :model="baseInfo"
      >
        <InfoBaseLayout>
          <el-form-item
            slot="pre"
            label="基地名称"
            label-width="125px"
            prop="name"
          >
            <el-input
              placeholder="请输入基地名称"
              v-model="baseInfo.name"
              clearable
            ></el-input>
          </el-form-item>
        </InfoBaseLayout>
        <InfoBaseLayout>
          <el-form-item
            label="创建者"
            label-width="125px"
            prop="creator"
            slot="pre"
          >
            <el-input
              placeholder="请输入创建者名称"
              style="width: 100%"
              v-model="baseInfo.creator"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="基地创建时间"
            label-width="125px"
            prop="gmtCreate"
            slot="after"
          >
            <el-input
              placeholder="请输入基地创时间"
              style="width: 100%"
              v-model="baseInfo.gmtCreate"
              disabled
            ></el-input>
          </el-form-item>
        </InfoBaseLayout>
        <InfoBaseLayout>
          <el-form-item
            label="基地地址"
            label-width="125px"
            prop="address"
            slot="pre"
          >
            <el-input
              placeholder="请输入基地地址"
              style="width: 100%"
              v-model="baseInfo.address"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="经度" prop="positionLongitude" slot="posLpng">
            <el-input
              placeholder="请输入基地经度"
              style="width: 85%"
              v-model="baseInfo.positionLongitude"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="维度" prop="positionLatitude" slot="posLat">
            <el-input
              style="width: 80%"
              placeholder="请输入基地维度"
              v-model="baseInfo.positionLatitude"
              disabled
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            icon="el-icon-location"
            @click="dialogVisible = true"
            >定位</el-button
          >
        </InfoBaseLayout>
        <InfoBaseLayout>
          <el-form-item
            label="营业执照注册号"
            label-width="125px"
            prop="registerNumber"
            slot="pre"
          >
            <el-input
              placeholder="请输入营业执照注册号"
              style="width: 100%"
              v-model="baseInfo.registerNumber"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="注册资金(万元)"
            label-width="125px"
            prop="funds"
            slot="after"
          >
            <el-input
              placeholder="请输入基地注册资金"
              style="width: 100%"
              v-model="baseInfo.funds"
            ></el-input>
          </el-form-item>
        </InfoBaseLayout>
        <InfoBaseLayout>
          <el-form-item
            label="营业范围"
            label-width="125px"
            prop="scope"
            slot="pre"
          >
            <el-input
              placeholder="请输入营业范围"
              style="width: 100%"
              v-model="baseInfo.scope"
              clearable
            ></el-input>
          </el-form-item>
        </InfoBaseLayout>
        <InfoBaseLayout>
          <el-row slot="pre">
            <el-col :offset="3" :span="4">基地图片</el-col>
            <el-col :span="17">
              <!-- <div class="upload">
                <el-upload
                  action="http://119.23.218.131:9103/base/file/upload"
                  ref="upload"
                  name="multipartFile"
                  class="avatar-uploader"
                  :on-success="handleAvatarSuccess"
                  multiple
                  :on-remove="handleRemove"
                  :show-file-list="false"
                >
                  <img
                    v-if="baseInfo.picture"
                    :src="baseInfo.picture"
                    class="avatar"
                  />
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div> -->
              <el-button type="primary" @click="isOpenUpload = true"
                >上传图片（限制3张）</el-button
              >
              <UploadFile
                :is-open="isOpenUpload"
                :close-modal="() => (this.isOpenUpload = false)"
                :max="3"
                :min="3"
                :type="'image'"
                :init-files="baseInfo.picture"
                :upload-success="handleUploadPic"
              ></UploadFile>
            </el-col>
          </el-row>
        </InfoBaseLayout>
        <el-row :gutter="20">
          <el-col>
            <el-form-item
              label="基地简介"
              label-width="125px"
              prop="introduction"
            >
              <el-input
                placeholder="请输入基地简介"
                type="textarea"
                :rows="7"
                v-model="baseInfo.introduction"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="22" :span="2">
            <el-button type="primary" @click="saveBaseInfo">保存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-dialog title="基地定位" :visible.sync="dialogVisible" width="33%" :close-on-click-modal="false">
      <el-form :model="baseInfo">
        <el-form-item
          label="基地地址"
          prop="receiveAddress"
          label-width="110px"
        >
          <el-select
            style="width: 85%"
            v-model="baseInfo.address"
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
        <el-form-item label="基地经度" label-width="110px">
          <el-input v-model="baseInfo.positionLongitude"></el-input>
        </el-form-item>
        <el-form-item label="基地维度" label-width="110px">
          <el-input v-model="baseInfo.positionLatitude"></el-input>
        </el-form-item>
        <Map
          :selectedLocation="location"
          @getCenterAddress="setAddress"
          @getAroundPoi="setpoi"
        ></Map>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TheCardHead from "../../components/ccy/TheCardHead";
import InfoBaseLayout from "../../components/ccy/InfoBaseLayout";
import Map from "../../components/public_components/MyLocationPicker";
import { mapMutations } from "vuex";
export default {
  components: {
    TheCardHead,
    InfoBaseLayout,
    Map,
  },
  data() {
    return {
      isOpenUpload: false,
      baseId: this.$store.state.baseInfo.id,
      baseInfo: {
        name: "",
        creator: "",
        gmtCreate: "",
        address: "",
        positionLongitude: "",
        positionLatitude: "",
        funds: "",
        registerNumber: "",
        scope: "",
        picture: null,
        id: this.$store.state.baseInfo.id,
        introduction: "",
      },
      formRules: {
        name: [
          { required: true, message: "请输入基地名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        creator: [
          { required: true, message: "请输入创建者名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        // address: [
        //   { required: true, message: "请输入基地地址", trigger: "blur" },
        // ],
        registerNumber: [
          { required: true, message: "请输入营业执照注册号", trigger: "blur" },
        ],
        funds: [{ required: true, message: "请输入注册资金", trigger: "blur" }],
        scope: [{ required: true, message: "请输入营业范围", trigger: "blur" }],
        introduction: [
          { required: true, message: "请输入基地简介", trigger: "blur" },
        ],
      },
      // 地图传来的地址数组
      addressArray: [],
      // 传入地图的中心坐标
      location: {
        lat: "",
        lng: "",
      },
      dialogVisible: false,
    };
  },
  created() {
    this.getBaseInfo();
  },
  methods: {
    ...mapMutations(["setBaseInfo"]),
    async getBaseInfo() {
      const { data: res } = await this.$base.get(
        `${this.$store.state.baseInfo.id}`
      );
      console.log(res);
      if (res.statusCode === 20000) {
        console.log(res);
        this.baseInfo.name = res.data.name;
        this.baseInfo.creator = res.data.creator;
        this.baseInfo.gmtCreate = res.data.gmtCreate;
        this.baseInfo.address = res.data.address;
        this.baseInfo.positionLongitude = res.data.positionLongitude;
        this.baseInfo.positionLatitude = res.data.positionLatitude;
        this.baseInfo.funds = res.data.funds;
        this.baseInfo.registerNumber = res.data.registerNumber;
        this.baseInfo.scope = res.data.scope;
        this.baseInfo.picture = res.data.picture;
        this.baseInfo.introduction = res.data.introduction;
      }
    },
    async saveBaseInfo() {
      const { data: res } = await this.$base.put("update", this.baseInfo);
      if (res.statusCode === 20000) {
        this.elMessage.success("修改基地信息成功");
        this.$stroe.commit("setBaseInfo", this.baseInfo);
      }
      this.getBaseInfo();
    },
    // handleAvatarSuccess(res, file) {
    //   this.baseInfo.picture = URL.createObjectURL(file.raw);
    //   console.log(this.baseInfo.picture);
    // },
    // 所有文件上传完成触发
    handleUploadPic(fileStr) {
      console.log("fileStr: ", fileStr);
      this.baseInfo.picture = fileStr;
    },
    handleRemove() {
      this.baseInfo.picture = null;
    },
    // handleAvatarSuccess(res) {
    //   let picUrl = JSON.parse(res.data);
    //   this.baseInfo.picture = picUrl.url;
    // },
    // 设置地图返回的定点位置
    setAddress(address, center) {
      console.log("address-->", address);
      this.baseInfo.address = address;
      this.baseInfo.positionLongitude = center.lng;
      this.baseInfo.positionLatitude = center.lat;
    },
    // 设置地图返回的位置数组
    setpoi(poi) {
      console.log("pio-->", poi);
      this.addressArray = poi;
    },
    // 设置坐标
    setcoordinates(location) {
      this.location = location;
      this.baseInfo.positionLongitude = this.location.lat;
      this.baseInfo.positionLatitude = this.location.lng;
      console.log("location-->", this.location);
    },
  },
};
</script>

<style lang="less" scoped>
.baseUpLoad {
  margin-bottom: 10px;
}
.imgSets {
  margin-right: 17px;
  color: #606266;
  font-size: 14px;
}
.imgFrame {
  display: flex;
  flex-wrap: wrap;
  width: 1000px;
  min-height: 190px;
  margin-bottom: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.imgFrame .test {
  position: relative;
  width: 140px;
  height: 140px;
  border: 1px solid rgb(184, 181, 181);
  border-radius: 4px;
  padding: 5px;
  margin: 8px 8px;
}
.upload {
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  i {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
    line-height: 178px;
  }
  img {
    width: 178px;
    height: 178px;
  }
}
</style>