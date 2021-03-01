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
        <el-menu-item index="/management-advise">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-s-claim"></i>
            <!-- 文本 -->
            <span>养殖建议</span>
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
        <!-- <el-menu-item index="/management-inputs-classification">
          <template slot="title">
         
            <i class="el-icon-caret-bottom"></i>
         
            <span>投入品分类管理</span>
          </template>
        </el-menu-item> -->
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
      isCollapse: false,// 是否折叠

      menus:[// 固定顺序
        {
          title:'我的基地',
          icon:'office-building',
          items:[
            {
              title:'数字基地',
              icon:'s-data',
              route:'/digital-base'
            },
            {
              title:'实况监控',
              icon:'stopwatch',
              route:'/monitor-live'
            },
            {
              title:'环境监测',
              icon:'cloudy-and-sunny',
              route:'/monitor-environment'
            },
            {
              title:'疾病诊断',
              icon:'search',
              route:'/disease-diagnosis'
            },
          ]
        },
        {
          title:'渔业管理',
          icon:'school',
          items:[
            {
              title:'池塘管理',
              icon:'receiving',
              route:'/management-pond'
            },
            {
              title:'农资管理',
              icon:'grape',
              route:'/management-supplies'
            },
            {
              title:'种苗进货',
              icon:'s-help-and-sunny',
              route:'/seed-purchase'
            },
            {
              title:'种苗信息',
              icon:'s-order',
              route:'/info-seed'
            },
            {
              title:'投入品管理',
              icon:'folder',
              route:'/info-supplies'
            },
          ]
        },
        {
          title:'设备管理',
          icon:'crop',
          items:[
            {
              title:'监控设备',
              icon:'s-platform',
              route:'/monitor-equipment'
            },
            {
              title:'气象设备',
              icon:'wind-power',
              route:'/info-weather'
            },
            {
              title:'水质设备',
              icon:'odometer',
              route:'/info-water-quality'
            },
          ]
        },
        {
          title:'养殖生产',
          icon:'film',
          items:[
            {
              title:'冷库',
              icon:'mobile',
              route:'/monitor-equipment'
            },
            {
              title:'加工厂',
              icon:'house',
              route:'/info-weather'
            },
            {
              title:'产品信息',
              icon:'notebook-1',
              route:'/info-water-quality'
            },
          ]
        },
        {
          title:'订单物流',
          icon:'c-scale-to-original',
          items:[
            {
              title:'订单管理',
              icon:'document',
              route:'/management-order'
            },
            {
              title:'物流信息',
              icon:'truck',
              route:'/info-logistics'
            },
          ]
        },
        {
          title:'基地管理',
          icon:'setting',
          items:[
            {
              title:'客户管理',
              icon:'s-custom',
              route:'/info-customer'
            },
            {
              title:'员工管理',
              icon:'user',
              route:'/management-staff'
            },
            {
              title:'投入品分类管理',
              icon:'caret-bottom',
              route:'/management-inputs-classification'
            },
            {
              title:'权限管理',
              icon:'s-grid',
              route:'/management-authority'
            },
            {
              title:'基地信息',
              icon:'document-copy',
              route:'/info-base'
            },
            {
              title:'备忘录',
              icon:'date',
              route:'/'
            },
          ]
        },
        {
          title:'领导仓',
          icon:'view',
          items:[
            {
              title:'基地信息',
              icon:'s-home',
              route:'/leader-warehouse'
            }
          ]
        },
      ],

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