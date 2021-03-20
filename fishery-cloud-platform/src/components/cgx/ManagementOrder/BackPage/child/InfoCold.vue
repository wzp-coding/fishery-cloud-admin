<template>
  <div class="info-cold">
      <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>冷库基地信息</span>
      </div>
      <div class="info-base">
        <el-form label-position="right" label-width="100px" :model="coldInfo">
          <el-form-item label="名称">
            <el-input v-model="coldInfo.refrigeratoryName" disabled></el-input>
          </el-form-item>
          <el-form-item label="入库时间">
            <el-input v-model="coldInfo.refrigeratoryInTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="入库管理员">
            <el-input v-model="coldInfo.warehousingInPersonId" disabled></el-input>
          </el-form-item>
          <el-form-item label="出库时间">
            <el-input v-model="coldInfo.refrigeratoryOutTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="出库管理员">
            <el-input v-model="coldInfo.warehousingOutPersonId" disabled></el-input>
          </el-form-item>
          <el-form-item label="冷库基地名称">
            <el-input v-model="coldInfo.baseName" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            coldInfo:{}
        }
    },
    methods: {
    ...mapActions(["getOrginInfoByIdAndType"]),
  },
  async created() {
    const ret = await this.getOrginInfoByIdAndType({ type: "3", vm: this });
    console.log("ret: ", ret);
    this.coldInfo = ret;
  },
};
</script>