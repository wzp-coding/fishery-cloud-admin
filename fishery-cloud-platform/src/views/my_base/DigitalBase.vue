<template>
  <div id="digitalbase">
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumbs="['我的基地', '数字基地']"></Breadcrumb>
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
          <More
            :defLayout="() => (this.isShowModule = true)"
            :saveLayout="saveLayout"
          ></More>
        </el-col>
      </el-row>
      <!-- <el-row
        ><span>组件模块：</span>
        <el-checkbox
          v-for="(item, index) in componentData"
          :key="index"
          v-model="item.checked"
          :label="item.cname"
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
      </el-row> -->
      <!-- 模块布局 -->
      <DraggableWrap
        :componentData="componentData"
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
      <!-- <el-row justify="space-around" type="flex"> -->
      <!-- 使用draggable组件 v-model绑定数组 -->
      <!-- <Draggable
          @start="drag = true"
          @end="drag = false"
          animation="1000"
          style="width: 100%"
          v-model="componentCheckedData"
        >
          <transition-group>
            <component
              style="margin: 5px"
              v-for="item in componentCheckedData"
              :key="item.id"
              :is="item.name"
            />
          </transition-group>
        </Draggable>
      </el-row> -->
    </div>
    <!-- 权限弹框 -->
    <Authority
      :dialog-visible="isShowAuthority"
      @close="() => (this.isShowAuthority = false)"
    ></Authority>

    <!-- 模块选择框 -->
    <ChooseModule
      @close="() => (this.isShowModule = false)"
      @choose="handleChoose"
      :isShowModule="isShowModule"
      :componentData="componentData"
    ></ChooseModule>
  </div>
</template>

<script>
import Authority from "../../components/wzp/Authority";
import { DigitalBase as dragComps } from "../../util/draggable";

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
          name: "DraggableMap",
          cname: "基地地图",
          checked: true,
        },
        {
          id: 2,
          name: "DraggableWeatherCard",
          cname: "天气卡片",
          checked: false,
        },
        {
          id: 3,
          name: "DraggableInfoBase",
          cname: "基地信息",
          checked: true,
        },
      ],

      // 存放被选中的可拖拽组件
      componentCheckedData: [],
    };
  },
  methods: {
    saveLayout() {},

    // 选择模块时触发
    handleChoose(item){
      // console.log('item: ', item);
      if (item.checked) {
        // 选中
        this.componentCheckedData.push(item);
      } else {
        // 取消选中
        this.componentCheckedData.some((inner, index, origin) => {
          if (inner.id == item.id) {
            origin.splice( index, 1);
            return true;
          }
          return false;
        });
      }
    },
    // 保存自定义  按钮
    saveComponentData() {
      // 保存选中模块的调整顺序
      localStorage.setItem(
        "componentCheckedData",
        JSON.stringify(this.componentCheckedData)
      );
      // 保存所有模块
      localStorage.setItem("componentData", JSON.stringify(this.componentData));
      this.elMessage.success("保存成功");
    },
  },
  created() {},
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
