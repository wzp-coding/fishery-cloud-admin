<template>
  <el-dialog
  :visible.sync="dialogVisible"
  :before-close="ChangeDialogVisible"
  center
  title="拥有权限">
    <el-row :class="['vcenter', 'bdbottom', 'bdtop']">
      <!-- 渲染一级权限 -->
      <el-col :span="5"
        
        ><el-tag>{{ permissionList.remarks }}</el-tag
        ><i class="el-icon-caret-right"></i
      ></el-col>
      <el-col :span="19">
        <!-- 渲染二级权限 -->
        <el-row
          v-for="(item2, i2) in permissionList.children"
          :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
          style="margin-bottom: 0px"
          :key="item2.id"
        >
          <el-col :span="6">
            <el-tag type="success">
              {{ item2.remarks }}
            </el-tag>
            <i class="el-icon-caret-right"></i>
          </el-col>
          <el-col :span="18">
            <el-tag
            style="margin:5px 5px;"
              type="warning"
              v-for="item3 in item2.children"
              :key="item3.id"
            >
              {{ item3.remarks }}
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
      ChangeDialogVisible(){
          this.$emit('notifyParent');
      }
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
}
</style>