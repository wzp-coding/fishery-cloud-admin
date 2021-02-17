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
      <el-form :data="baseInfo" ref="resForm" :rules="formRules" :model="baseInfo" >
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
              clearable
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
          <el-button type="primary" icon="el-icon-location">定位</el-button>
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
        <el-row class="baseUpLoad" :gutter="20">
          <el-col :span="2" class="imgSets">基地图片</el-col>
          <el-col :span="19" class="imgFrame">
            <div class="test">
              <img
                src="baseInfo.picture"
                alt="基地图片"
                v-if="!baseInfo.picture"
              />
            </div>
            <!-- <div v-for="(url, index) in picSets" :key="index" class="test">
              <div class="mask">
                <i class="el-icon-delete" @click="deleteClick(url)"></i>
              </div>
              <img :src="url" />
            </div> -->
            <!-- <el-upload
              action="http://106.75.154.40:9011/base/addPic"
              list-type="picture-card"
              :on-success="onSuccess"
              :auto-upload="true"
              ref="upload"
              class="addBox"
            > -->
            <!-- <i class="el-icon-plus"></i>
            </el-upload> -->
          </el-col>
        </el-row>
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
  </div>
</template>

<script>
import TheCardHead from "../../components/ccy/TheCardHead";
import InfoBaseLayout from "../../components/ccy/InfoBaseLayout";
export default {
  data() {
    return {
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
        picture: "",
        id: "",
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
        address: [
          { required: true, message: "请输入基地地址", trigger: "blur" },
        ],
        registerNumber: [
          { required: true, message: "请输入营业执照注册号", trigger: "blur" },
        ],
        funds: [{ required: true, message: "请输入注册资金", trigger: "blur" }],
        scope: [{ required: true, message: "请输入营业范围", trigger: "blur" }],
        introduction: [
          { required: true, message: "请输入基地简介", trigger: "blur" },
        ],
      },
      // 1350657222372835330
    };
  },
  components: {
    TheCardHead,
    InfoBaseLayout,
  },
  created() {
    this.getBaseInfo();
  },
  methods: {
    async getBaseInfo() {
      const { data: res } = await this.$base.get();
      let temp = res.data[0];
      this.baseInfo.id = temp.id;
      this.baseInfo.name = temp.name;
      this.baseInfo.creator = temp.creator;
      this.baseInfo.gmtCreate = temp.gmtCreate;
      this.baseInfo.address = temp.address;
      this.baseInfo.positionLongitude = temp.positionLongitude;
      this.baseInfo.positionLatitude = temp.positionLatitude;
      this.baseInfo.funds = temp.funds;
      this.baseInfo.registerNumber = temp.registerNumber;
      this.baseInfo.scope = temp.scope;
      this.baseInfo.picture = temp.picture;
      this.baseInfo.introduction = temp.introduction;
    },
    async saveBaseInfo() {
      const { data: res } = await this.$base.put("update", this.baseInfo);
      if (res.statusCode === 20000) {
        this.$message.success("修改基地信息成功");
      }
      this.getBaseInfo();
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
</style>