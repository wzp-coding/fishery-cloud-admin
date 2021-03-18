<!--
* @FileDescription:
模块弹框，用于展示可选择的模块
接受两个参数
isShowModule<Boolean>： 控制展示弹框
modules<Array>: 所有模块的数据数组

接受两个注册事件
@close:关闭弹窗前的回调（无参数）
@choose:多选框改变的回调（接受一个参数，该参数是新的）
* @Author: 吴泽鹏
* @Date: 
* @LastEditors: 吴泽鹏
* @LastEditTime: 
-->
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
      v-for="(item, index) in modules"
      :key="index"
    >
      <el-checkbox
        @change="() => $emit('choose', item)"
        v-model="item.checked"
        :label="item.cname"
        border
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
    modules: {
      type: Array,
    },
  },
};
</script>