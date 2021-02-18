<template>
  <!-- 模块布局 -->
  <el-row>
    <!-- 使用draggable组件 v-model绑定数组 -->
    <Draggable
      @start="drag = true"
      @end="drag = false"
      animation="1000"
      style="width: 100%"
      v-model="componentCheckedData"
    >
      <transition-group>
        <slot :componentCheckedData="componentCheckedData"></slot>
      </transition-group>
    </Draggable>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      // 控制是否拖拽
      drag: false,
      // 存放被选中的可拖拽组件
      componentCheckedData: [],
    };
  },
  props: {
    componentData: {
      type: Array,
    },
  },
  watch: {
    componentData: {
      handler(val){
        this.componentCheckedData = val.filter((item) => item.checked)
      },
      deep:true,
      immediate:true
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
</style>