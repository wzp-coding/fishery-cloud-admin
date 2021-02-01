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
      <el-form :data="baseInfo">
        <InfoBaseLayout>
          <el-form-item
            slot="pre"
            label="基地名称"
            label-width="110px"
            prop="baseName"
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
            label-width="110px"
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
            label-width="110px"
            prop="creator"
            slot="after"
          >
            <el-input
              placeholder="请输入基地创时间件"
              style="width: 100%"
              v-model="baseInfo.gmtCreate"
              disabled
            ></el-input>
          </el-form-item>
        </InfoBaseLayout>
        <InfoBaseLayout>
          <el-form-item
            label="基地地址"
            label-width="110px"
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
            label-width="110px"
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
            label-width="110px"
            prop="funds"
            slot="after"
          >
            <el-input
              placeholder="请输入基地创时间件"
              style="width: 100%"
              v-model="baseInfo.funds"
            ></el-input>
          </el-form-item>
        </InfoBaseLayout>
        <InfoBaseLayout>
          <el-form-item
            label="营业范围"
            label-width="110px"
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
        <el-row class="baseUpLoad">
          <el-col :span="2" class="imgSets">基地图片</el-col>
          <el-col :span="20" class="imgFrame">
            <div class="test"></div>
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
              label-width="110px"
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
      </el-form>
    </el-card>
  </div>
</template>

<script>
import TheCardHead from "../components/ccy/TheCardHead";
import InfoBaseLayout from "../components/ccy/InfoBaseLayout";
export default {
  data() {
    return {
      baseInfo: [],
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
      this.baseInfo = res.data[0];
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.imgSets {
  margin-right: 17px;
  color: #606266;
  font-size: 14px;
}
.imgFrame {
  display: flex;
  flex-wrap: wrap;
  width: 1115px;
  min-height: 200px;
  margin-bottom: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.imgFrame .test {
  position: relative;
  width: 150px;
  height: 150px;
  border: 1px solid rgb(184, 181, 181);
  border-radius: 4px;
  padding: 5px;
  margin: 10px 10px;
}
</style>