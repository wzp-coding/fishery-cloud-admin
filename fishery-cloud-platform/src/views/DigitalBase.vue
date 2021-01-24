<template>
  <div id="digitalbase">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的基地</el-breadcrumb-item>
      <el-breadcrumb-item>数字基地</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="cardBody">
      <el-row class="globalHeader" style="margin-bottom: 20px;">
        <el-col :span="4">
          <i class="el-icon-s-data"></i><span>数字基地</span></el-col
        >
        <el-col style="width: 100px; float: right">
          <el-button
            type="primary"
            style="float: right;"
            plain
            @click="ChangeAuthorityShow"
            >所持权限</el-button
          >
        </el-col>
      </el-row>
      <el-row
        ><span>组件模块：</span>
        <el-checkbox
          v-for="(item, index) in checkBox"
          :key="index"
          v-model="item.checked"
          :label="item.name"
          border
          @change="handleChange(item)"
        ></el-checkbox>
        <el-button
          type="primary"
          style="float: right"
          plain
          @click="saveComponentData"
          >保存自定义</el-button
        >
      </el-row>
      <el-row justify="space-around" type="flex">
        <!-- <el-col :span="6">
          <InfoBase></InfoBase>
        </el-col>
        <el-col :span="11">
          <Map map-name="base"></Map>
        </el-col>
        <el-col :span="6">
          <WeatherCard></WeatherCard>
        </el-col> -->
        <!--使用draggable组件 v-model绑定数组-->
        <Draggable
          @start="drag = true"
          @end="drag = false"
          animation="1000"
          style="width: 100%"
          v-model="componentData"
        >
          <transition-group>
            <component
              style="margin: 5px"
              v-for="(item, index) in componentCheckedData"
              :key="index"
              :is="item.component"
            />
          </transition-group>
        </Draggable>
      </el-row>
    </div>
    <Authority
      :dialog-visible="isShowAuthority"
      @notifyParent="ChangeAuthorityShow"
    ></Authority>
  </div>
</template>

<script>
const DraggableInfoBase = {
  components: { InfoBase },
  render(h) {
    return (
      <el-col span={6}>
        <InfoBase></InfoBase>
      </el-col>
    );
  },
};
const DraggableMap = {
  components: { Map },
  render(h) {
    return (
      <el-col span={11}>
        <Map map-name="logistics"></Map>
      </el-col>
    );
  }, 
};
const DraggableWeatherCard = {
  components: { WeatherCard },
  render(h) {
    return (
      <el-col span={6}>
        <WeatherCard></WeatherCard>
      </el-col>
    );
  },
};
import Authority from "../components/wzp/Authority";
import Map from "../components/public_components/Map";
import WeatherCard from "../components/wzp/WeatherCard";
import InfoBase from "../components/wzp/InfoBase";
export default {
  name: "DigitalBase",
  components: {
    DraggableMap,
    DraggableWeatherCard,
    DraggableInfoBase,
    Authority,
  },
  data() {
    return {
      // 控制展示权限对话框
      isShowAuthority: false,

      // 控制是否拖拽
      drag: false,

      // 存放可拖拽组件
      componentData: [
        {
          component: "DraggableMap",
          name: "基地地图",
          checked: true,
        },
        {
          component: "DraggableWeatherCard",
          name: "天气卡片",
          checked: false,
        },
        {
          component: "DraggableInfoBase",
          name: "基地信息",
          checked: true,
        },
      ],

      // 多选框
      checkBox: [],
    };
  },
  computed: {
    // 过滤出componentData中被选中的组件
    componentCheckedData() {
      return this.componentData.filter((item) => item.checked);
    },
  },
  methods: {
    // 所持权限  按钮
    ChangeAuthorityShow() {
      this.isShowAuthority = !this.isShowAuthority;
    },
    // 保存自定义  按钮
    saveComponentData() {
      // 保存调整后的模块顺序
      localStorage.setItem("componentData", JSON.stringify(this.componentData));
      // 保存模块的选择与否
      localStorage.setItem("initCheckbox", JSON.stringify(this.checkBox));
      this.$message.success("保存成功");
    },

    // 多选框触发事件
    handleChange(item) {
      // 模块选择的时候，同时改变componentData让组件重新渲染
      this.componentData.some((data, index, origin) => {
        if (data.component == item.component) {
          origin[index].checked = item.checked;
          return true;
        }
        return false;
      });
    },
  },
  created() {
    // 获取最初自定义模块的顺序
    if (!localStorage.getItem("initCheckbox")) {
      // 第一次载入页面
      localStorage.setItem("initCheckbox", JSON.stringify(this.componentData));
      this.checkBox = JSON.parse(JSON.stringify(this.componentData));
    } else {
      // 第二次以后载入页面
      this.checkBox = JSON.parse(localStorage.getItem("initCheckbox"));
    }
    // 获取上次保存的自定义视图
    if (localStorage.getItem("componentData")) {
      // 第二次以后载入页面
      this.componentData = JSON.parse(localStorage.getItem("componentData"));
    }
  },
};
</script>

<style lang="less" scoped>
.cardBody {
  width: 100%;
}
.globalHeader {
  background-color: #eaedf1;
}
.el-carousel {
  .el-carousel__container {
    border: none;
    .el-carousel__item {
      border: none;
    }
  }
}
.hiddenEle {
  opacity: 0;
}
</style>
