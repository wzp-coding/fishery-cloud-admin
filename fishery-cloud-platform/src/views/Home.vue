<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <the-header></the-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#0d3b53"
          text-color="#fff"
          active-text-color="#3e95ee"
          unique-opened
          :collapse-transition="false"
          :collapse="isCollapse"
          router
          :default-active="activePath"
        >
          <!-- unique-opened:是否只保持一个子菜单的展开 -->
          <!-- collapse：是否水平折叠收起菜单 -->
          <!-- collapse-transitnb cmxswion:是否开启折叠动画 -->
          <!-- router:是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
          <!-- default-active:当前激活菜单的 index -->
          <!-- 我的基地 -->
          <el-submenu index="1">
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-office-building"></i>
              <!-- 文本 -->
              <span>我的基地</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              index="/digital-base"
              @click="saveNavState('/digital-base')"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-s-data"></i>
                <!-- 文本 -->
                <span>数字基地</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/monitor-live"
              @click="saveNavState('/monitor-live')"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-stopwatch"></i>
                <!-- 文本 -->
                <span>实况监控</span>
                <!-- <a :href="this.monitorUrl" target="_blank" style="text-decoration:none;color:white"></a> -->
              </template>
            </el-menu-item>
            <el-menu-item
              index="/monitor-environment"
              @click="saveNavState('/monitor-environment')"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-cloudy-and-sunny"></i>
                <!-- 文本 -->
                <span>环境监测</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 对虾管理 -->
          <el-submenu index="2">
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-school"></i>
              <!-- 文本 -->
              <span>渔业管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              index="/management-pond"
              @click="saveNavState('/management-pond')"
              v-if="permissionVisable.traceability_pond"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-receiving"></i>
                <!-- 文本 -->
                <span>池塘管理</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/management-supplies"
              @click="saveNavState('/management-supplies')"
              v-if="permissionVisable.traceability_agricultural"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-grape"></i>
                <!-- 文本 -->
                <span>农资管理</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/seed-purchase"
              @click="saveNavState('/seed-purchase')"
              v-if="permissionVisable.traceability_shrimp"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-s-help"></i>
                <!-- 文本 -->
                <span>种苗进货</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/info-seed"
              @click="saveNavState('/info-seed')"
              v-if="permissionVisable.traceability_shrimpInfo"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-s-order"></i>
                <!-- 文本 -->
                <span>种苗信息</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/info-supplies"
              @click="saveNavState('/info-supplies')"
              v-if="permissionVisable.traceability_inputs"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-folder"></i>
                <!-- 文本 -->
                <span>投入品管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 设备管理 -->
          <el-submenu index="3">
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-crop"></i>
              <!-- 文本 -->
              <span>设备管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              index="/monitor-equipment"
              @click="saveNavState('/monitor-equipment')"
              v-if="permissionVisable.traceability_monitor"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-s-platform"></i>
                <!-- 文本 -->
                <span>监控设备</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/info-weather"
              @click="saveNavState('/info-weather')"
              v-if="permissionVisable.traceability_atmosphere"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-wind-power"></i>
                <!-- 文本 -->
                <span>气象设备</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/info-water-quality"
              @click="saveNavState('/info-water-quality')"
              v-if="permissionVisable.traceability_waterquality"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-odometer"></i>
                <!-- 文本 -->
                <span>水质设备</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 养殖生产 -->
          <el-submenu index="4">
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-film"></i>
              <!-- 文本 -->
              <span>养殖生产</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              index="/cold-storage"
              @click="saveNavState('/cold-storage')"
              v-if="permissionVisable.traceability_refrigeratory"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-mobile"></i>
                <!-- 文本 -->
                <span>冷库</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/process-plant"
              @click="saveNavState('/process-plant')"
              v-if="permissionVisable.traceability_process"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-house"></i>
                <!-- 文本 -->
                <span>加工厂</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/info-product"
              @click="saveNavState('/info-product')"
              v-if="permissionVisable.traceability_product"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-notebook-1"></i>
                <!-- 文本 -->
                <span>产品信息</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 订单物流 -->
          <el-submenu index="5">
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-c-scale-to-original"></i>
              <!-- 文本 -->
              <span>订单物流</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/management-order" @click="saveNavState('/management-order')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-document"></i>
                <!-- 文本 -->
                <span>订单管理</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/info-logistics"
              @click="saveNavState('/info-logistics')"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-truck"></i>
                <!-- 文本 -->
                <span>物流信息</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 系统设置 -->
          <el-submenu
            index="6"
            v-if="baseIdentity === '2' || baseIdentity === '3'"
          >
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-setting"></i>
              <!-- 文本 -->
              <span>基地管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/info-customer" @click="saveNavState('/info-customer')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-s-custom"></i>
                <!-- 文本 -->
                <span>客户管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/management-staff" @click="saveNavState('/management-staff')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-user"></i>
                <!-- 文本 -->
                <span>员工管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/management-inputs-classification" @click="saveNavState('/management-inputs-classification')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-caret-bottom"></i>
                <!-- 文本 -->
                <span>投入品分类管理</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/management-authority"
              @click="saveNavState('/management-authority')"
              v-if="baseIdentity === '2'"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-s-grid"></i>
                <!-- 文本 -->
                <span>权限管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/info-base" @click="saveNavState('/info-base')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-document-copy"></i>
                <!-- 文本 -->
                <span>基地信息</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import TheHeader from "../components/public_components/TheHeader";
export default {
  components: {
    TheHeader,
  },
  created() {
    if (!this.defines.baseId || this.defines.baseId == null) {
      console.log(this.defines.baseId);
      var This = this;
      // window.onload = function () {
      //   window.frames[0].postMessage(
      //     "",
      //     "http://106.75.132.85:9001/#/basePage"
      //   );
      //   if (location.href.indexOf("#") == -1) {
      //     location.href = location.href + "#";
      //     location.reload();
      //   }
      // };
      console.log("000000");
      //接收数据
      window.addEventListener(
        "message",
        function (e) {
          console.log(typeof e.data);
          if (
            typeof e.data != "object" &&
            e.data.substring(0, 6) === "Bearer"
          ) {
            window.localStorage.setItem("token", e.data);
            This.monitorUrl = "http://106.75.132.85:9002/livemonitor.html";
            This.isLogined(e.data);
          } else if (window.localStorage.getItem("token")) {
            This.isLogined(window.localStorage.getItem("token"));
          }
        },
        false
      );
      // }, 1000)
    } else {
      this.isLogined(window.localStorage.getItem("token"));
    }
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  data() {
    return {
      way: window.localStorage.getItem("way"),
      baseIdentity: window.localStorage.getItem("baseIdentity"),
      monitorUrl: "",
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: "/home",
    };
  },
  computed: {
    ...mapState(["permissionVisable"]),
  },
  methods: {
    ...mapMutations(["setPermissionList"]),
    // 验证用户是否有权限登录
    async isLogined(token) {
      const { data: res } = await this.$http.get(
        "http://106.75.154.40:9003/user/self",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res);
      console.log(111);
      if (res.code === 20000) {
        this.$router.push("/digital-base");
        this.defines.setBaseId(res.data.baseId);
        window.localStorage.setItem("baseId", res.data.baseId);
        window.localStorage.setItem("baseIdentity", res.data.baseIdentity);
        document.cookie = encodeURI("aaa=" + this.defines.baseId);
        this.getPermission();
      }
    },
    // 获取权限清单
    async getPermission() {
      let baseId = window.localStorage.getItem("baseId");
      let baseIdentity = window.localStorage.getItem("baseIdentity");
      const { data: res } = await this.$http.get(
        `http://106.75.154.40:9003/function/${baseId}/${baseIdentity}`,
        {
          headers: {
            Authorization: window.localStorage.getItem("token"),
          },
        }
      );
      console.log(res);
      if (res.code === 20000) {
        res.data.forEach((item) => {
          if (item.remarks === "溯源管理") {
            this.setPermissionList(item);
          }
        });
      }
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    // 退出登录操作
    backLogin() {
      window.localStorage.clear();
      this.defines.setBaseId("");
      this.setPermissionList(JSON.parse("{}"));
      if (this.way !== "1") {
        window.location.href = "http://106.75.132.85:9001/#/basePage";
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  // 撑满全屏
  height: 100%;
}

.el-aside {
  background-color: #0d3b53;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
  // background: url(../assets/bgc.jpg) no-repeat;
}

.toggle-button {
  background-color: #474e66;
  // 字体大小
  font-size: 10px;
  // 行高
  line-height: 24px;
  // 字体颜色
  color: #fff;
  // 水平居中
  text-align: center;
  // 字间距离
  letter-spacing: 0.2em;
  // 进过鼠标为小手
  cursor: pointer;
}
</style>
