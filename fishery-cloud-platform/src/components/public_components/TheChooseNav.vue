<template>
  <el-drawer
    title="选择菜单"
    :visible="isShow"
    direction="rtl"
    @open="openProxy"
    :before-close="() => $emit('close')"
    size="20%"
    style="overflow: auto"
  >
    <el-tree
      ref="tree"
      :data="navList"
      :props="defaultChecked"
      default-expand-all
      node-key="id"
      show-checkbox
    ></el-tree>
    <div style="padding: 20px 10px; overflow: hidden">
      <el-button
        style="float: right; margin: 0 20px"
        type="primary"
        @click="saveNav"
        >保存</el-button
      >
      <el-button style="float: right" @click="() => this.$emit('close')"
        >取消</el-button
      >
    </div>
  </el-drawer>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
    },
  },
  data() {
    return {
      navList: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      preUserChecked: {
        children: "children",
        label: "label",
      },
    };
  },
  // 获取树结构的中的所有叶子节点
  defaultChecked() {
    let tem = [""];

    return tem;
  },
  methods: {
    saveNav() {
      // 这里注意：还要获取半选中的父节点
      //   const curUserChecked = this.$refs.tree
      //     .getHalfCheckedKeys()
      //     .concat(this.$refs.tree.getCheckedKeys());
      // 接下来跟上一次用户选择的菜单比较也就是preUserChecked
      // 比较将增加的添加到addList中，减少的添加到subList中传给后端
    },
    openProxy() {
      // 打开之前先请求该用户最原始所拥有的标签菜单（并存在本地，不必总是请求）
      // 存在本地注意通过用户ID作为键值，防止两个不同的用户在同一台电脑登录
      
      // 再请求该用户已经选择的标签菜单（进行初始化tree，同时记录一下标签菜单）
      // 这里设置上一次已经选择的二级菜单，注意defaultChecked包含的只有叶子节点
      //   this.$refs.tree.setCheckedKeys(this.defaultChecked);
    },
  },
};
</script>
<style lang="less" scoped>
</style>