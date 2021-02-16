<template>
  <div id="digitalbase">
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumbs="['我的基地', '数字基地']"></Breadcrumb>
    <div class="cardBody">
      <el-row class="globalHeader" style="margin-bottom: 20px">
        <el-col :span="4">
          <i class="el-icon-s-data"></i><span>数字基地</span></el-col
        >
        <el-col style="width: 100px; float: right">
          <el-button
            type="primary"
            style="float: right"
            plain
            @click="isShowAuthority = true"
            >所持权限</el-button
          >
        </el-col>
      </el-row>
      <!-- 模块选择 -->
      <el-row
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
      </el-row>
      <!-- 模块布局 -->
      <el-row justify="space-around" type="flex">
        <!-- 使用draggable组件 v-model绑定数组 -->
        <Draggable
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
      </el-row>
    </div>
    <!-- 权限弹框 -->
    <Authority
      :dialog-visible="isShowAuthority"
      @close="() => (this.isShowAuthority = false)"
    ></Authority>
  </div>
</template>

<script>
import Authority from "../../components/wzp/Authority";
import {
  DraggableMap,
  DraggableWeatherCard,
  DraggableInfoBase,
} from "../../util/draggable";

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
    // 保存自定义  按钮
    saveComponentData() {
      // 保存选中模块的调整顺序
      localStorage.setItem(
        "componentCheckedData",
        JSON.stringify(this.componentCheckedData)
      );
      // 保存所有模块
      localStorage.setItem("componentData", JSON.stringify(this.componentData));
      this.$message.success("保存成功");
    },

    // 多选框触发事件
    handleChange(item) {
      // 模块选择的时候，componentData变化了，更新componentCheckedData
      if (item.checked) {
        // 选中
        this.componentCheckedData.push(item);
      } else {
        // 取消选中
        this.componentCheckedData.some((inner, index, origin) => {
          if (inner.id == item.id) {
            Array.prototype.splice.call(origin, index, 1);
            return true;
          }
          return false;
        });
      }
    },
  },
  created() {
    if (!localStorage.getItem("componentData")) {
      // 第一次载入页面
      this.componentCheckedData = this.componentData.filter(
        (item) => item.checked
      );
    } else {
      // 第二次以后载入页面，获取上次保存的自定义视图
      this.componentData = JSON.parse(localStorage.getItem("componentData"));
      this.componentCheckedData = JSON.parse(
        localStorage.getItem("componentCheckedData")
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
