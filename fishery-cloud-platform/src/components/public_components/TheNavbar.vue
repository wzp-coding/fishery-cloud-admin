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
      <el-submenu
        v-for="(oneLabel, name, index) in newSortMenus"
        :key="index"
        :index="`${index}`"
      >
        <template slot="title">
          <!-- 图标 -->
          <i :class="`el-icon-${oneLabel.icon}`"></i>
          <!-- 文本 -->
          <span>{{ name }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item
          v-for="(twoLabel, name, index) in oneLabel.children"
          :index="twoLabel.route"
          :key="index"
        >
          <template slot="title">
            <!-- 图标 -->
            <i :class="`el-icon-${twoLabel.icon}`"></i>
            <!-- 文本 -->
            <span>{{ name }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      isCollapse: false, // 是否折叠

      // 原始有固定顺序的标签菜单
      menus: {
        我的基地: {
          icon: "office-building",
          children: {
            数字基地: {
              icon: "s-data",
              route: "/digital-base",
            },
            实况监控: {
              icon: "stopwatch",
              route: "/monitor-live",
            },
            环境监测: {
              icon: "cloudy-and-sunny",
              route: "/monitor-environment",
            },
            疾病诊断: {
              icon: "search",
              route: "/disease-diagnosis",
            },
          },
        },
        渔业管理: {
          icon: "school",
          children: {
            池塘管理: {
              icon: "receiving",
              route: "/management-pond",
            },
            养殖建议: {
              icon: "s-claim",
              route: "/management-advise",
            },
            农资管理: {
              icon: "grape",
              route: "/management-supplies",
            },
            种苗管理: {
              icon: "shopping-cart-1",
              route: "/seed-purchase",
            },
            种苗信息: {
              icon: "s-order",
              route: "/info-seed",
            },
            投入品管理: {
              icon: "folder",
              route: "/info-supplies",
            },
          },
        },
        设备管理: {
          icon: "crop",
          children: {
            监控设备: {
              icon: "s-platform",
              route: "/monitor-equipment",
            },
            气象设备: {
              icon: "wind-power",
              route: "/info-weather",
            },
            水质设备: {
              icon: "odometer",
              route: "/info-water-quality",
            },
          },
        },
        养殖生产: {
          icon: "film",
          children: {
            冷库: {
              icon: "mobile",
              route: "/cold-storage",
            },
            加工厂: {
              icon: "house",
              route: "/process-plant",
            },
          },
        },
        订单物流: {
          icon: "c-scale-to-original",
          children: {
            订单管理: {
              icon: "document",
              route: "/management-order",
            },
            物流信息: {
              icon: "truck",
              route: "/info-logistics",
            },
          },
        },
        基地管理: {
          icon: "setting",
          children: {
            客户管理: {
              icon: "s-custom",
              route: "/info-customer",
            },

            员工管理: {
              icon: "user",
              route: "/management-staff",
            },

            权限管理: {
              icon: "s-grid",
              route: "/management-authority",
            },

            基地信息: {
              icon: "document-copy",
              route: "/info-base",
            },

            备忘录: {
              icon: "date",
              route: "/node-pad",
            },
          },
        },
        领导仓: {
          icon: "view",
          children: {
            基地数据: {
              icon: "s-home",
              route: "/leader-warehouse",
            },
          },
        },
      },

      newSortMenus: {}, // 有序的新菜单
    };
  },
  computed: {
    ...mapState(["userInfo", "shouldFlushNavbar"]),
  },
  watch: {
    shouldFlushNavbar(val) {
      if (val) {
        this.getLabel();
        this.$store.commit("setShouldFlushNavbar", false);
      }
    },
  },
  methods: {
    ...mapMutations(["setShouldFlushNavbar"]),

    // 获取动态菜单
    async getLabel() {
      const params = {
        baseId: this.userInfo.baseId,
        role: this.userInfo.role,
        userId: this.userInfo.id,
      };
      // console.log('params: ', params);
      const { data: res } = await this.$label.post("", params);
      console.log("this.$label: ", res);
      if (res.statusCode === 20000) {
        let data = JSON.parse(res.data);
        const labels = data.customized_labels
          ? data.customized_labels
          : data.labels;
        this.newSortMenus = this.formatLabel(labels);
        console.log("this.newSortMenus: ", this.newSortMenus);
      } else {
        console.error(res.message);
      }
    },

    // 将接口返回的无序菜单数组格式化
    // 根据labels判断原始的menus是否有标签，没有则删除即可
    formatLabel(labels) {
      console.log("labels: ", labels);
      let cMenu = {};
      labels.forEach((item) => {
        let childMap = this._.cloneDeep(this.menus[item.name]);
        let pitem = {
          icon: childMap.icon,
          children: {},
        };
        item.children.forEach((citem) => {
          pitem.children[citem] = childMap.children[citem];
        });
        cMenu[item.name] = pitem;
      });
      console.log("cMenu: ", cMenu);
      return cMenu;
    },
  },
  created() {
    this.getLabel();
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