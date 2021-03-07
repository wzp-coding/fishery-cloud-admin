<template>
  <div class="create-base-container">
    <el-card class="create-base-card">
      <template #header>
        <div class="card-header">
          <span>创建基地</span>
          <el-button type="text" @click="$router.push('common-user')"
            >如果您只是普通用户，无需创建基地，请点击这里</el-button
          >
        </div>
      </template>
      <el-form :model="createInfo">
        <TheDialogLayout>
          <el-form-item slot="pre" label="基地老板" label-width="115px">
            <el-input v-model="createInfo.creator"></el-input>
          </el-form-item>
          <el-form-item slot="after" label="基地名称" label-width="115px">
            <el-input v-model="createInfo.name"></el-input>
          </el-form-item>
        </TheDialogLayout>
        <TheDialogLayout>
          <el-form-item slot="pre" label="成立基金" label-width="115px">
            <el-input v-model="createInfo.funds"></el-input>
          </el-form-item>
          <el-form-item slot="after" label="基地类型" label-width="115px">
            <el-select v-model="createInfo.types" multiple placeholder="请选择">
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
          <el-form-item slot="pre" label="营业执照注册号" label-width="115px">
            <el-input v-model="createInfo.registerNumber"></el-input>
          </el-form-item>
          <el-form-item slot="after" label="养殖类型" label-width="115px">
            <el-input v-model="createInfo.scope"></el-input>
          </el-form-item>
        </TheDialogLayout>
        <TheDialogLayout>
          <el-row slot="pre">
            <el-col :offset="3" :span="5">基地图片</el-col>
            <el-col :offset="1" :span="15">
              <div class="upload">
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
                    v-if="createInfo.picture"
                    :src="createInfo.picture"
                    class="avatar"
                  />
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </el-col>
          </el-row>
        </TheDialogLayout>
        <el-row :gutter="20">
          <el-col>
            <el-form-item
              label="基地简介"
              label-width="115px"
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
            <el-form-item label="基地地址" label-width="115px">
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
    </el-card>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import TheDialogLayout from "../../components/ccy/public/TheDialogLayout";
import Map from "../../components/public_components/MyLocationPicker";
export default {
  components: {
    TheDialogLayout,
    Map,
  },
  data() {
    return {
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
    };
  },
  computed:{
      ...mapState(['userInfo'])
  },
  created() {
    this.getBaseType();
  },
  methods: {
      ...mapMutations(['setUserInfo']),
    async getBaseType() {
      const { data: res } = await this.$baseType.get();
      console.log(res);
      if (res.statusCode === 20000) {
        this.baseTypeList = res.data;
        for (let i = 0; i < this.baseTypeList.length; i++) {
          this.baseTypeList[i] = JSON.parse(this.baseTypeList[i]);
        }
      }
    },
    async createEvent() {
      console.log(this.createInfo);
      const { data: res } = await this.$admin.post("/addBase/"+this.userInfo.id, this.createInfo);
      console.log(res);
      if (res.statusCode === 20000) {
        this.elMessage.success("创建基地成功");
        // 基地创建后，用户信息会发生改变
        const newUserInfo = await this.getSelfInfo();
        this.$store.commit('setUserInfo', newUserInfo);
        this.$router.push('digital-base');
      }else{
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
        this.elMessage.error(res.message);
      }
    },
    handleAvatarSuccess(res, file) {
      this.createInfo.picture = URL.createObjectURL(file.raw);
      console.log(this.createInfo.picture);
    },
    handleRemove() {
      this.createInfo.picture = null;
    },
    // 设置地图返回的定点位置
    setAddress(address) {
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
      this.createInfo.positionLongitude = this.location.lat;
      this.createInfo.positionLatitude = this.location.lng;
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
  background-image: url("../../assets/images/loginbg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
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