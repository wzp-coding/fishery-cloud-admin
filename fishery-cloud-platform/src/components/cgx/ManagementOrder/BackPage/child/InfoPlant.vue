<template>
  <div class="info-plant">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>加工厂基地信息</span>
      </div>
      <div class="info-base">
        <el-form label-position="right" label-width="110px" :model="plantInfo">
          <el-form-item label="名称">
            <el-input v-model="plantInfo.factoryName" disabled></el-input>
          </el-form-item>
          <el-form-item label="操作员">
            <el-input v-model="plantInfo.operatorName" disabled></el-input>
          </el-form-item>
          <el-form-item label="面积">
            <el-input v-model="plantInfo.processingArea" disabled></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="plantInfo.processingType" disabled></el-input>
          </el-form-item>
          <el-form-item label="加工厂基地">
            <el-input v-model="plantInfo.baseName" disabled></el-input>
          </el-form-item>
          <el-form-item label="基地加工厂数量">
            <el-input v-model="plantInfo.factoryCount" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-divider></el-divider>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>产品证书</span>
      </div>
      <div class="info-plant-qualification">
        <el-form label-position="top" label-width="90px" :model="qualification">
          <el-form-item label="产品信息">
            <el-input v-model="qualification.productInfo" disabled></el-input>
          </el-form-item>
          <el-form-item label="质检部门检验报告">
            <el-image
              style="width: 200px; height: 150px"
              :src="qualification.inspectionReport"
              fit="contain"
            ></el-image>
          </el-form-item>
          <el-form-item label="产品生产许可证">
              <el-image
              style="width: 200px; height: 150px"
              :src="qualification.license"
              fit="contain"
            ></el-image>
          </el-form-item>
          <el-form-item label="质量管理体系认证书">
              
              <el-image
              style="width: 200px; height: 150px"
              :src="qualification.qualityCertificate"
              fit="contain"
            ></el-image>
          </el-form-item>
          <el-form-item label="食品安全管理体系认证书">
              <el-image
              style="width: 200px; height: 150px"
              :src="qualification.safetyCertificate"
              fit="contain"
            ></el-image>
          </el-form-item>
          <el-form-item label="采用标准">
              <el-image
              style="width: 200px; height: 150px"
              :src="qualification.standard"
              fit="contain"
            ></el-image>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-divider></el-divider>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>加工产品信息</span>
      </div>
      <div class="info-plant-inputVoList">
        <el-table :data="inputVoList" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form
                label-position="right"
                label-width="100px"
                class="demo-table-expand"
              >
                <el-form-item label="加工产品 ID">
                  <el-input v-model="scope.row.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="加工产品名称">
                  <el-input v-model="scope.row.inputName" disabled></el-input>
                </el-form-item>
                <el-form-item label="产品生产日期">
                  <el-input
                    v-model="scope.row.inputProduceDate"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="产品过期时间">
                  <el-input
                    v-model="scope.row.inputExpireDate"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="供应商">
                  <el-input
                    v-model="scope.row.supplierName"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="供应商地址">
                  <el-input
                    v-model="scope.row.supplierAddr"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                  <el-input
                    v-model="scope.row.supplierPhone"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="inputName"> </el-table-column>
          <el-table-column label="id" prop="id"> </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      plantInfo: {},
      inputVoList: [],
      qualification: {},
    };
  },
  methods: {
    ...mapActions(["getOrginInfoByIdAndType"]),
  },
  async created() {
    const ret = await this.getOrginInfoByIdAndType({ type: "2", vm: this });
    console.log("ret: ", ret);
    this.plantInfo = ret;
    this.inputVoList = ret.inputVoList;
    this.qualification = ret.qualification;
  },
};
</script>
<style lang="less" scoped>
</style>