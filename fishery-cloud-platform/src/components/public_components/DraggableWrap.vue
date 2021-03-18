<template>
  <!-- 模块布局 -->
  <el-row>
    <!-- 使用draggable组件 v-model绑定数组 -->
    <Draggable
      @start="drag = true"
      @end="drag = false"
      animation="1000"
      style="width: 100%"
      v-model="moduleChecked"
    >
      <transition-group>
        <slot :moduleChecked="moduleChecked"></slot>
      </transition-group>
    </Draggable>
  </el-row>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // 控制是否拖拽
      drag: false,

      // 存放被选中的可拖拽组件
      moduleChecked: [],

      // id->module映射
      idToModule: {},
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  props: {
    modules: {
      type: Array,
    },
    changeLayout: {
      type: Function,
    },
    changeItem: {
      type: Object,
    },
  },
  methods: {
    async getModuleChecked() {
      this.modules.forEach((item) => {
      this.$set(this.idToModule, item.id, item);
    });
      const { data: res } = await this.$drag.get(
        `/checked/${this.userInfo.id}`
      );
        console.log('moduleCheckedIds: ', res);
      if (res.statusCode === 20000) {
        this.moduleChecked = res.data.map((id) => {
          return this.idToModule[id];
        });
        console.log("this.moduleChecked: ", this.moduleChecked);
      } else {
        this.moduleChecked = this.modules.filter((item) => item.checked);
      }
    },
  },
  watch: {
    modules(val){
      console.log('val: ', val);
      if(!val){
        return;
      }else{
        this.getModuleChecked();
      }
    },
    changeItem: {
      handler(cur){
        console.log("cur: ", cur);
        if (!cur.checked) {
          let index = this.moduleChecked.findIndex((item) => item.id == cur.id);
          this.moduleChecked.splice(index, 1);
        } else {
          this.moduleChecked.push(cur);
        }
        console.log("this.modules: ", this.modules);
      },
      deep:true
    },
    // 当用户拖拽的时候，将最新的拖拽数组的顺序反馈给父组件
    moduleChecked(val) {
      this.changeLayout(val);
    },
  },
};
</script>