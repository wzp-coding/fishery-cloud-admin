<template>
  <div class="code-phone-container">
    <el-row class="b-code-web" style="margin-bottom: 0">
      <el-col :span="24">
        <el-menu :default-active="$route.path" router>
          <el-submenu index="info">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>溯源导航信息</span>
            </template>
            <el-menu-item index="info-farm-p" v-if="typeToIdMap['1']"
              ><i class="el-icon-folder"></i><span>养殖信息</span></el-menu-item
            >
            <el-menu-item v-if="typeToIdMap['3']" index="info-cold-p">
              <i class="el-icon-mobile"></i>
              <span>冷库信息</span></el-menu-item
            >
            <el-menu-item
              v-if="hasLogisticsId"
              :index="`info-logitis-p?id=${traceId}`"
              ><i class="el-icon-truck"></i><span>物流信息</span></el-menu-item
            >
            <el-menu-item v-if="typeToIdMap['2']" index="info-plant-p"
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
      traceId: "",
      type: {}, //能展示的type对象，1(养殖),2(加工厂),3(冷库)
      hasLogisticsId: false,
      logisticsId: "",
    };
  },
  computed: {
    ...mapState(["typeToIdMap"]),
  },
  methods: {
    ...mapMutations(["setTypeToIdMap"]),
    // 获取溯源类型和id存到vuex中
    async getTaceabilityTypeAndProductId(traceId) {
      const { data: res } = await this.$traceability.get(`/product/${traceId}`);
      // console.log("this.type: ", res);
      if (res.statusCode != 20000) {
        console.error(res.message);
      }
      this.type = res.data;
      this.setTypeToIdMap(this.type);
    },
    async getDetailOrderInfo(id) {
      const { data: res } = await this.$managementOrder.get(`${id}`);
      // console.log("res: ", res);
      if (res.statusCode != 20000) {
        console.error(res.message);
      }
      return res.data;
    },
  },
  async created() {
    document.body.className = "custom-dark";
    const { id: orderId } = this.$route.query;
    this.traceId = orderId;
    console.log("orderId: ", orderId);
    if(this._.isEmpty(this.typeToIdMap)){
      await this.getTaceabilityTypeAndProductId(this.traceId);
    }
    // 如果扫描物流二维码，此时肯定是有logisticsId的
    // 如果是扫描溯源二维码，需要判断是否有logisticsId
    let orderInfo = await this.getDetailOrderInfo(this.traceId);
    // console.log("orderInfo: ", orderInfo);
    if (!orderInfo.logisticsId) {
      this.hasLogisticsId = false;
    } else {
      this.hasLogisticsId = true;
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