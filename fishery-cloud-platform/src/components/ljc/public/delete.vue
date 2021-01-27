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
import ljcPlant from "../processPlant/processPlant";
import ljcProduct from "../product/product";
import ljcCraft from "../craft/craft";
export default {
  props: {
    id: {},
    title: {},
    tag: {},
  },
  data() {
    return {
      Plant: new ljcPlant(this),
      Product: new ljcProduct(this),
      Craft: new ljcCraft(this),
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
      if (this.tag == "product") {
        const { data: res } = await this.Product.removeById(this.id);
        this.messageInfo(res);
      }
      if (this.tag == "plant") {
        const { data: res } = await this.Plant.removeById(this.id);
        this.messageInfo(res);
      }
      if (this.tag == "craft") {
        const { data: res } = await this.Craft.removeById(this.id);
        this.messageInfo(res);
      }
    },
    /* 删除结束 */

    /* 提示判断开始 */
    messageInfo(res) {
      if (res.statusCode == 20000) {
        this.$emit("getAllInfo");
        this.$message.success(res.message);
      }
    },
    /* 提示判断结束 */
  },
};
</script>

<style scoped>
</style>
