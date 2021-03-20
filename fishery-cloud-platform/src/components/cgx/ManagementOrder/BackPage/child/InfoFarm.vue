<template>
  <div class="info-farm">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基地信息</span>
      </div>
      <div class="info-base">
        <el-carousel
          trigger="click"
          height="150px"
          style="text-align: center; margin-bottom: 10px"
        >
          <el-carousel-item v-for="item in basePics" :key="item">
            <el-image
              style="width: 90%; height: 150px"
              :src="item"
              fit="cover"
            ></el-image>
          </el-carousel-item>
        </el-carousel>
        <el-form label-position="right" label-width="70px" :model="baseInfo">
          <el-form-item label="名称">
            <el-input v-model="baseInfo.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="baseInfo.address" disabled></el-input>
          </el-form-item>
          <el-form-item label="创建者">
            <el-input v-model="baseInfo.creator" disabled></el-input>
          </el-form-item>
          <el-form-item label="经营范围">
            <el-input v-model="baseInfo.scope" disabled></el-input>
          </el-form-item>
          <el-form-item label="创立资金">
            <el-input v-model="baseInfo.funds" disabled></el-input>
          </el-form-item>
          <el-form-item label="注册编号">
            <el-input v-model="baseInfo.registerNumber" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-divider></el-divider>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>种苗信息</span>
      </div>
      <div class="info-seed">
        <el-form label-position="right" label-width="90px" :model="seedInfo">
          <el-form-item label="名称">
            <el-input v-model="seedInfo.germchitBatchName" disabled></el-input>
          </el-form-item>
          <el-form-item label="种类">
            <el-input v-model="seedInfo.germchitSpecies" disabled></el-input>
          </el-form-item>
          <el-form-item label="来源地">
            <el-input v-model="seedInfo.germchitOrigin" disabled></el-input>
          </el-form-item>
          <el-form-item label="投入者">
            <el-input
              v-model="seedInfo.germchitSupplierName"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input
              v-model="seedInfo.germchitSupplierPhone"
              disabled
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-divider></el-divider>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>喂养信息</span>
      </div>
      <div class="info-feed">
        <el-table :data="feedInfo" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope" style="padding: 0">
              <el-form
                label-position="right"
                label-width="90px"
                class="demo-table-expand"
              >
                <el-form-item label="投入品 ID">
                  <el-input v-model="scope.row.supplyId" disabled></el-input>
                </el-form-item>
                <el-form-item label="池塘名称">
                  <el-input v-model="scope.row.pondName" disabled></el-input>
                </el-form-item>
                <el-form-item label="操作员">
                  <el-input
                    v-model="scope.row.operatorName"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="身份">
                  <el-input
                    v-model="scope.row.operatorIdentity"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="投入品名称">
                  <el-input v-model="scope.row.supplyName" disabled></el-input>
                </el-form-item>
                <el-form-item label="投入品种类">
                  <el-input v-model="scope.row.supplyType" disabled></el-input>
                </el-form-item>
                <el-form-item label="喂养量">
                  <el-input
                    v-model="scope.row.feedingVolume"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input v-model="scope.row.remark" disabled></el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="操作员" prop="operatorName">
          </el-table-column>
          <el-table-column label="投入品名称" prop="supplyName">
          </el-table-column>
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
      baseInfo: {},
      seedInfo: {},
      feedInfo: [],
    };
  },
  computed: {
    basePics() {
      if (!this.baseInfo.picture) {
        return [];
      }
      return this.baseInfo.picture.split(",");
    },
  },
  methods: {
    ...mapActions(["getOrginInfoByIdAndType"]),
  },
  async created() {
    const ret = await this.getOrginInfoByIdAndType({ type: "1", vm: this });
    console.log("ret: ", ret);
    this.baseInfo = ret.baseInfo;
    this.seedInfo = ret.germchitInfo;
    this.feedInfo = ret.feedingRecords.records;
  },
};
</script>