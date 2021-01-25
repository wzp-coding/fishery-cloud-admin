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
import ljc from "../processPlant/processPlant";
export default {
  props: {
    id: {},
    title: {},
  },
  data() {
    return {
      model: new ljc(this),
    };
  },
  created() {},
  methods: {
    /* 删除开始 */
    async removeById() {
      const confirmResult = await this.$confirm(
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
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.model.removeById(this.id);
      if (res.statusCode == 20000) {
        this.$emit("getAllInfo");
        this.$message.success(res.message);
      }
    },
    /* 删除结束 */
  },
};
</script>

<style scoped>
</style>
