<template>
  <div>
    <!-- 删除按钮开始 -->
    <el-button
      type="danger"
      icon="el-icon-delete"
      size="mini"
      @click="removeById()"
    ></el-button>
    <!-- 删除按钮结束 -->
  </div>
</template>
<script>
export default {
  props: {
    // 要删除的ID
    id: {},
    // 标题
    title: {},
    // 删除路径
    deleteUrl: {},
    // 根路径
    root: {},
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    /* 删除开始 */
    async removeById() {
      const confirmResult = await this.elConfirm(
        `此操作将永久删除${this.title}, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        return err;
      });
      if (confirmResult !== "confirm") {
        return this.elMessage.info("已取消删除");
      }
      const { data: res } = await this["$" + this.root].delete(
        `${this.deleteUrl}/${this.id}`
      );
      if (res.statusCode == 20000) {
        this.$emit("getAllInfo");
        this.elMessage.success(res.message);
      }
    },
    /* 删除结束 */
  },
};
</script>

<style scoped>
</style>
