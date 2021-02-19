<template>
  <div id="digitalbase">
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumbs="['我的基地', '数字基地']"></Breadcrumb>
    <!-- 内容区 -->
    <div class="cardBody">
      <el-row class="globalHeader" style="margin-bottom: 20px">
        <el-col :span="4">
          <i class="el-icon-s-data"></i><span>数字基地</span></el-col
        >
        <el-col style="width: 170px; float: right">
          <el-button
            type="primary"
            style="float: left"
            plain
            @click="isShowAuthority = true"
            >所持权限</el-button
          >
          <!-- 下拉框保存 -->
          <More
            :defLayout="() => (this.isShowModule = true)"
            :componentData="componentData"
            :componentCheckedData="componentCheckedData"
          ></More>
        </el-col>
      </el-row>
      <!-- 模块布局 -->
      <DraggableWrap
        :componentData="componentData"
        :changeLayout="
          (newComponentCheckedData) =>
            (this.componentCheckedData = newComponentCheckedData)
        "
        justify="space-around"
        type="flex"
      >
        <template v-slot:default="scope">
          <component
            style="margin: 5px"
            v-for="item in scope.componentCheckedData"
            :key="item.id"
            :is="item.name"
          />
        </template>
      </DraggableWrap>
    </div>
    <!-- 权限弹框 -->
    <Authority
      :dialog-visible="isShowAuthority"
      @close="() => (this.isShowAuthority = false)"
    ></Authority>

    <!-- 模块选择框 -->
    <ChooseModule
      @close="() => (this.isShowModule = false)"
      @choose="(newComponentData) => (this.componentData = newComponentData)"
      :isShowModule="isShowModule"
      :componentData="componentData"
    ></ChooseModule>
  </div>
</template>

<script>
import Authority from "../../components/wzp/Authority";
import { DigitalBase as dragComps } from "../../util/draggable/wzp";

export default {
  name: "DigitalBase",
  components: {
    ...dragComps,
    Authority,
  },
  data() {
    return {
      // 控制展示权限对话框
      isShowAuthority: false,

      // 控制展示模块选择框
      isShowModule: false,

      // 存放可拖拽组件
      componentData: [
        {
          id: 1,
          name: "DraggableInfoBase",
          cname: "基地信息",
          checked: true,
        },
        {
          id: 2,
          name: "DraggableMap",
          cname: "基地地图",
          checked: true,
        },
        {
          id: 3,
          name: "DraggableWeatherCard",
          cname: "天气卡片",
          checked: true,
        },
      ],

      // 存放被选中的可拖拽组件
      componentCheckedData: [],
    };
  },
  created() {
    if (!localStorage.getItem("wzp-DigitalBase-modules")) {
      // 第一次载入页面
      this.componentCheckedData = this.componentData.filter(
        (item) => item.checked
      );
    } else {
      // 第二次以后载入页面，获取上次保存的自定义视图
      this.componentData = JSON.parse(
        localStorage.getItem("wzp-DigitalBase-modules")
      );
      this.componentCheckedData = JSON.parse(
        localStorage.getItem("wzp-DigitalBase-checked")
      );
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
