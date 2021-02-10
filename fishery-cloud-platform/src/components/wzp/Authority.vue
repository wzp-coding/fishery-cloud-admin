<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :before-close="ChangeDialogVisible"
    width="55%"
    center
    title="拥有权限"
  >
    <el-row v-for="(one,index) in permissionList" :key="one.id" :class="index === 0?['vcenter','bdbottom','bdtop']:['vcenter','bdbottom']">
      <!-- 渲染一级权限 -->
      <el-col :span="5">
        <el-row
          ><el-tag>{{ one.remarks }}</el-tag
          ><i class="el-icon-caret-right"></i
        ></el-row>
      </el-col>
      <el-col :span="19">
        <!-- 渲染二级权限 -->
        <el-row
          v-for="two in one.children"
          :key="two.id"
           :class="['vcenter','bdheight']"
        >
          <el-col :span="6">
            <el-tag type="success">
              {{ two.remarks }}
            </el-tag>
            <i class="el-icon-caret-right"></i>
          </el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 5px 5px"
              type="warning"
              v-for="three in two.children"
              :key="three.id"
            >
              {{ three.remarks }}
            </el-tag>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapState(["permissionList"]),
  },
  methods: {
    ChangeDialogVisible() {
      this.$emit("notifyParent");
    },
  },
};
</script>
<style lang="less" scoped>
.vcenter {
  display: flex;
  align-items: center;
}

.bdbottom {
  border-bottom: 1px dashed #ccc;
}
.bdtop {
  border-top: 1px dashed #ccc;
  padding-top: 20px;
}
.bdheight{
  height: 20px;
}
</style>