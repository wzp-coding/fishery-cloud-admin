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
    changeLayout: {
      type: Function,
    },
  },
  watch: {
    // 当第一次传入，选择模块，第二次载入页面时
    componentData: {
      handler(val) {
        const compCheckedData=localStorage.getItem("wzp-DigitalBase-checked");
        if(compCheckedData){
          // 第二次载入页面的时候，获取上一次用户保存的布局
          this.componentCheckedData = JSON.parse(compCheckedData);
          localStorage.removeItem("wzp-DigitalBase-checked")
        }else{
          this.componentCheckedData = val.filter((item) => item.checked);
        }
      },
      deep: true,
      immediate: true,
    },

    // 当用户拖拽的时候，将最新的拖拽数组的顺序反馈给父组件
    componentCheckedData(val) {
      this.changeLayout(val);
    },
  },
};
</script>