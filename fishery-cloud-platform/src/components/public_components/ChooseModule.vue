<template>
  <el-drawer
    title="选择模块"
    :visible="isShowModule"
    direction="ltr"
    size="12%"
    :before-close="() => $emit('close')"
  >
    <el-row
      type="flex"
      justify="center"
      v-for="(item, index) in componentData"
      :key="index"
    >
      <el-checkbox
        v-model="item.checked"
        :label="item.cname"
        border
        @change="() => $emit('choose', componentData)"
      ></el-checkbox>
    </el-row>
  </el-drawer>
</template>
<script>
export default {
  props: {
    isShowModule: {
      type: Boolean,
      default: false,
    },
    componentData: {
      type: Array,
    },
  },
};
</script>
<style lang="less" scoped>
</style>