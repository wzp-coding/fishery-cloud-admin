<template>
  <div id="digitalbase">
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumbs="['我的基地', '数字基地']"></Breadcrumb>
    <!-- 内容区 -->
    <div class="cardBody">
      <el-row class="globalHeader" style="margin-bottom: 20px">
        <el-col :span="4">
          <i class="el-icon-s-data"></i><span>数字基地</span></el-col
        >
        <el-col style="width: 170px; float: right">
          <el-button
            type="primary"
            style="float: left"
            @click="isShowAuthority = true"
            >所持权限</el-button
          >
          <!-- 下拉框保存 -->
          <More
            :defLayout="() => (this.isShowModule = true)"
            :modules="modules"
            :moduleChecked="moduleChecked"
          ></More>
        </el-col>
      </el-row>
      <!-- 模块布局 -->
      <DraggableWrap
        :modules="modules"
        :changeLayout="
          (newModuleChecked) => (this.moduleChecked = newModuleChecked)
        "
        :changeItem="changeItem"
        justify="space-around"
        type="flex"
      >
        <template v-slot:default="scope">
          <component
            style="margin: 5px"
            v-for="item in scope.moduleChecked"
            :key="item.id"
            :is="item.name"
          />
        </template>
      </DraggableWrap>
    </div>
    <!-- 权限弹框 -->
    <Authority
      :dialog-visible="isShowAuthority"
      @close="() => (this.isShowAuthority = false)"
    ></Authority>

    <!-- 模块选择框 -->
    <ChooseModule
      @choose="(item) => (this.changeItem = item)"
      @close="() => (this.isShowModule = false)"
      :isShowModule="isShowModule"
      :modules="modules"
    ></ChooseModule>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Authority from "../../components/wzp/Authority";
import { DigitalBase as dragComps } from "../../util/draggable/wzp";

export default {
  name: "DigitalBase",
  components: {
    ...dragComps,
    Authority,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  data() {
    return {
      // 控制展示权限对话框
      isShowAuthority: false,

      // 控制展示模块选择框
      isShowModule: false,

      // 存放可拖拽模块
      modules: [],

      // 存放被选中的可拖拽模块
      moduleChecked: [],

      changeItem:{}
    };
  },
  methods: {
    async getModules() {
      const { data: res } = await this.$drag.get("/all");
      console.log('res: ', res);
      if (res.statusCode === 20000) {
        this.modules = res.data;
      } else {
        console.error(res.message);
      }
    },
  },
  async created() {
    await this.getModules();
    // this.save('DigitalBase','wzp');
  },
};
</script>

<style lang="less" scoped>
.cardBody {
  width: 100%;
}
.el-carousel {
  .el-carousel__container {
    border: none;
    .el-carousel__item {
      border: none;
    }
  }
}
.hiddenEle {
  opacity: 0;
}
</style>
