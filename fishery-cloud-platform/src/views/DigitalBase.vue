<template>
  <div id="digitalbase">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的基地</el-breadcrumb-item>
      <el-breadcrumb-item>数字基地</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="cardBody">
      <el-row class="globalHeader" style="margin-bottom: 20px">
        <el-col :span="4">
          <i class="el-icon-s-data"></i> <span>数字基地</span></el-col
        >
        <el-col style="width: 100px; float: right">
          <el-button
            type="primary"
            style="float: right"
            plain
            @click="ChangeAuthorityShow"
            >所持权限</el-button
          >
        </el-col>
      </el-row>
      <el-row
        ><span>组件模块：</span>
        <el-checkbox v-for="(item,index) in componentData" :key="index" v-model="item.checked" :label="item.name" border @change="handleChange"></el-checkbox>
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
        <!-- <Draggable
          @start="onStart"
          @end="onEnd"
          animation="1000"
          style="width: 100%"
          v-model="ids"
        >
          <transition-group>
            <el-col
              v-for="item in ids"
              :key="item.id"
              :span="item.id === 2 ? 11 : 6"
              style="margin:5px;"
            >
              <InfoBase v-if="item.id === 1"></InfoBase>
              <Map map-name="base" v-if="item.id === 2"></Map>
              <WeatherCard v-if="item.id === 3"></WeatherCard>
            </el-col>
          </transition-group>
        </Draggable> -->
        <Draggable
          @start="onStart"
          @end="onEnd"
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
import axios from "axios";
import Authority from "../components/wzp/Authority";
import DraggableMap from "../components/wzp/draggable/DraggableMap";
import DraggableWeatherCard from "../components/wzp/draggable/DraggableWeatherCard";
import DraggableInfoBase from "../components/wzp/draggable/DraggableInfoBase";
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
      isShowAuthority: false,
      drag: false,
      ids: [{ id: 1 }, { id: 2 }, { id: 3 }],
      isShow: true,
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
          checked:true
        },
      ],
    };
  },
  computed: {
    componentCheckedData() {
      return this.componentData.filter((item) => item.checked);
    },
  },
  methods: {
    saveComponentData(){
      localStorage.setItem('componentData',JSON.stringify(this.componentData));
    },
    handleChange(val){
      console.log('val: ', val);
    },
    handleCancleCmp() {
      this.isShow = false;
    },
    ChangeAuthorityShow() {
      this.isShowAuthority = !this.isShowAuthority;
    },
    onStart(e) {
      this.drag = true;
    },
    onEnd(e) {
      this.drag = false;
    },
  },
  created() {
    if (localStorage.getItem("componentData")) {
      this.componentData = JSON.parse(localStorage.getItem("componentData"));
      console.log('this.componentData: ', this.componentData);
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
