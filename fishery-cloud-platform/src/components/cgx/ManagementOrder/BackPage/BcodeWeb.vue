<template>
  <div class="code-phone-container">
    <el-row class="b-code-web" style="margin-bottom: 0">
      <el-col :span="24">
        <el-menu :default-active="active" router>
          <el-submenu index="info">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>溯源导航信息</span>
            </template>
            <el-menu-item index="info-farm-p"
              ><i class="el-icon-folder"></i><span>养殖信息</span></el-menu-item
            >
            <el-menu-item index="info-cold-p" v-if="type['2']">
              <i class="el-icon-mobile"></i>
              <span>冷库信息</span></el-menu-item
            >
            <el-menu-item :index="`info-logitis-p?id=${logisticsId}`"
              ><i class="el-icon-truck"></i><span>物流信息</span></el-menu-item
            >
            <el-menu-item index="info-plant-p" v-if="type['3']"
              ><i class="el-icon-house"></i
              ><span>加工厂信息</span></el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      active: "info-farm-p",
      traceId: "",
      type: {}, //能展示的type对象，1(养殖),2(加工厂),3(冷库)
      logisticsId: "1356236375450034177",
    };
  },
  methods: {
    ...mapMutations(["setTypeToIdMap"]),
    // 获取溯源类型和id存到vuex中
    async getTaceabilityTypeAndProductId(traceId) {
      const { data: res } = await this.$traceability.get(`/product/${traceId}`);
      // console.log('res: ', res);
      if (res.statusCode != 20000) {
        console.error(res.message);
      }
      this.type = res.data;
      this.setTypeToIdMap(this.type);
    },
  },
  async created() {
    document.body.className = "custom-dark";
    const { id, type } = this.$route.query;
    this.traceId = id;
    this.logisticsId = logisticsId;
    console.log("id: ", id);
    console.log("type: ", type);
    await this.getTaceabilityTypeAndProductId(this.traceId);
    if (type == "logitis") {
      this.active = "info-logitis-p";
      this.$router.push({
        path: this.active,
        query: { id: logisticsId },
      });
    } else {
      this.$router.push(this.active);
    }
  },
};
</script>
<style lang="less" scoped>
.code-phone-container {
  background-color: #151a30;
}
.b-code-web {
  width: 100%;
}
</style>