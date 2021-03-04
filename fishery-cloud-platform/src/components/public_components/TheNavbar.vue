<template>
  <el-aside :width="isCollapse ? '64px' : '200px'" style="transition: 0.5s">
    <div class="toggle-button" @click="isCollapse = !isCollapse">|||</div>
    <!-- 侧边栏菜单区域 -->
    <el-menu
      class="el-menu-vertical-demo"
      unique-opened
      :collapse-transition="false"
      :collapse="isCollapse"
      router
      :default-active="$route.path"
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
        <el-menu-item index="/digital-base">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-s-data"></i>
            <!-- 文本 -->
            <span>数字基地</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/monitor-live">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-stopwatch"></i>
            <!-- 文本 -->
            <span>实况监控</span>
            <!-- <a :href="this.monitorUrl" target="_blank" style="text-decoration:none;color:white"></a> -->
          </template>
        </el-menu-item>
        <el-menu-item index="/monitor-environment">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-cloudy-and-sunny"></i>
            <!-- 文本 -->
            <span>环境监测</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/disease-diagnosis">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-search"></i>
            <!-- 文本 -->
            <span>疾病诊断</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <!-- 渔业管理 -->
      <el-submenu index="2">
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-school"></i>
          <!-- 文本 -->
          <span>渔业管理</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item index="/management-pond">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-receiving"></i>
            <!-- 文本 -->
            <span>池塘管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/management-supplies">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-grape"></i>
            <!-- 文本 -->
            <span>农资管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/seed-purchase">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-s-help"></i>
            <!-- 文本 -->
            <span>种苗进货</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/info-seed">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-s-order"></i>
            <!-- 文本 -->
            <span>种苗信息</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/info-supplies">
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
        <el-menu-item index="/monitor-equipment">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-s-platform"></i>
            <!-- 文本 -->
            <span>监控设备</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/info-weather">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-wind-power"></i>
            <!-- 文本 -->
            <span>气象设备</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/info-water-quality">
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
        <el-menu-item index="/cold-storage">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-mobile"></i>
            <!-- 文本 -->
            <span>冷库</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/process-plant">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-house"></i>
            <!-- 文本 -->
            <span>加工厂</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/info-product">
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
        <el-menu-item index="/management-order">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-document"></i>
            <!-- 文本 -->
            <span>订单管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/info-logistics">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-truck"></i>
            <!-- 文本 -->
            <span>物流信息</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <!-- 系统设置 -->
      <el-submenu index="6">
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-setting"></i>
          <!-- 文本 -->
          <span>基地管理</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item index="/info-customer">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-s-custom"></i>
            <!-- 文本 -->
            <span>客户管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/management-staff">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-user"></i>
            <!-- 文本 -->
            <span>员工管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/management-inputs-classification">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-caret-bottom"></i>
            <!-- 文本 -->
            <span>投入品分类管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/management-authority">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-s-grid"></i>
            <!-- 文本 -->
            <span>权限管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/info-base">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-document-copy"></i>
            <!-- 文本 -->
            <span>基地信息</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/node-pad">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-document-copy"></i>
            <!-- 文本 -->
            <span>备忘录</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <!-- 领导仓 -->
      <el-submenu index="7">
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-view"></i>
          <!-- 文本 -->
          <span>领导仓</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item index="/leader-warehouse">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-view"></i>
            <!-- 文本 -->
            <span>基地信息</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  data() {
    return {
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: "/digital-base",
    };
  },
};
</script>
<style lang="less" scoped>
.el-aside {
  .el-menu {
    border-right: none;
  }
}

.toggle-button {
  // 字体大小
  font-size: 10px;
  // 行高
  line-height: 24px;
  // 水平居中
  text-align: center;
  // 字间距离
  letter-spacing: 0.2em;
  // 进过鼠标为小手
  cursor: pointer;
}
</style>