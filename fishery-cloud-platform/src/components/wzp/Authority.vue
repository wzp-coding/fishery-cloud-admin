<template>
  <el-dialog
    :visible="dialogVisible"
    :before-close="
      (done) => {
        this.$emit('close');
        done();
      }
    "
    @open="openProxy"
    width="55%"
    center
    title="拥有权限"
  >
    <el-row
      v-for="(one, index) in dataList"
      :key="one.id"
      :class="
        index === 0 ? ['vcenter', 'bdbottom', 'bdtop'] : ['vcenter', 'bdbottom']
      "
    >
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
          :class="['vcenter', 'bdheight']"
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
  data() {
    return {
      dataList: [],
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
    roleId: {
      type: String,
    },
  },
  computed: {
    ...mapState(["permissionList"]),
  },
  methods: {
    // 根据roleId获取权限列表
    async getFunctionByRoleId(roleId) {
      const { data: res } = await this.$function.get(`/findFunction/${roleId}`);
      console.log("findFunction: ", res);
      if (res.statusCode === 20000) {
        res.data.length === 0 ? this.elMessage.info("暂无权限") : "";
        this.dataList = res.data;
      } else {
        this.elMessage.error(res.message);
      }
    },

    // 打开之前判断处理
    async openProxy() {
      if (this.roleId) {
        // 查看角色权限（权限管理页面）
        await this.getFunctionByRoleId(this.roleId);
      } else {
        // 查看登录用户权限（数字基地页面）
        this.dataList = this.permissionList;
      }
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
.bdheight {
  height: 20px;
}
</style>