<template>
  <div>
    <Draggable
      @start="drag = true"
      @end="drag = false"
      animation="1000"
      v-model="componentData"
    >
      <transition-group>
        <component
          style="margin: 5px"
          v-for="(item, index) in componentCheckedData"
          :key="index"
          :is="item.name"
        />
      </transition-group>
    </Draggable>
  </div>
</template>
<script>
export default {
  props: {
    num: {
      type: Number,
      required: true,
    },
  },
};
</script>
<style lang="less" scoped>
</style>