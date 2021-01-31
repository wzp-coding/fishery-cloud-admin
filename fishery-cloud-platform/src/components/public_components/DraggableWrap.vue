<template>
  <Draggable
    @start="drag = true"
    @end="drag = false"
    animation="1000"
    v-model="array"
    class="drag-wrap"
  >
    <transition-group>
      <slot v-for="(item) in slots" :name="item.name"
        >请包裹你的组件并指定名字</slot
      >
    </transition-group>
  </Draggable>
</template>
<script>
export default {
  data() {
    return {
      array:this.slots
    }
  },
  watch:{
    array(val){
      this.$emit('updateSlots',val)
    }
  },
  props: {
    slots: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="less" scoped>
</style>