<template>
  <div>
    <!-- 面包屑导航区域 -->
    <Breadcrumb :breadcrumbs="['权限管理', '权限管理']"></Breadcrumb>
    <!-- 主体 -->
    <el-card>
      <!-- 标题添加区域 -->
      <el-row
        class="globalHeader"
        style="margin-bottom: 20px; padding-bottom: 45px"
      >
        <el-col :span="4">
          <i class="el-icon-s-grid"></i>
          <span>权限管理</span>
        </el-col>
      </el-row>
      <el-table :data="roleList" style="width: 100%" border stripe>
        <el-table-column label="角色身份">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="拥有权限">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="roleId=scope.row.id;isShowAuthority=true;"
              >查看权限</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              icon="el-icon-setting"
              @click="settingAuthority(scope.row.id)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-drawer
      :with-header="false"
      :visible.sync="isShowDrawer"
      direction="rtl"
    >
      <el-tree
        ref="treeRef"
        :data="bossAuthority"
        :props="defaultProps"
        default-expand-all
        :default-checked-keys="selectedId"
        node-key="id"
        show-checkbox
      ></el-tree>
      <div style="padding: 20px 10px; overflow: hidden">
        <el-button style="float: right; margin: 0 20px" type="primary"
          >分配</el-button
        >
        <el-button style="float: right">取消</el-button>
      </div>
    </el-drawer>
    <!-- 权限弹框 -->
    <Authority
      :dialog-visible="isShowAuthority"
      @close="()=>this.isShowAuthority=true"
      :roleId="roleId"
    ></Authority>
    <!-- 分页组件 -->
  </div>
</template>
<script>
import Authority from '../../components/wzp/Authority'
export default {
  data() {
    return {
      // 查看权限按钮
      isShowAuthority: false,
      // 点击查看按钮时的roleId
      roleId:undefined,
      // 分配权限按钮
      isShowDrawer: false,
      // 角色列表
      roleList: [],
      baseId: localStorage.getItem("baseId"),
      baseIdentity: localStorage.getItem("baseIdentity"),
      token: localStorage.getItem("token"),
      bossAuthority: [
        {
          label: "池塘管理",
          id: 1,
          children: [
            { label: "池塘增加", id: 12 },
            { label: "池塘删除", id: 13 },
            { label: "池塘修改", id: 14 },
            { label: "池塘查询", id: 15 },
          ],
        },
        {
          label: "农资管理",
          id: 2,
          children: [
            { label: "农资增加", id: 16 },
            { label: "农资删除", id: 17 },
            { label: "农资修改", id: 18 },
            { label: "农资查询", id: 19 },
          ],
        },
        {
          label: "虾苗进货",
          id: 3,
          children: [
            { label: "虾苗进货增加", id: 20 },
            { label: "虾苗进货删除", id: 21 },
            { label: "虾苗进货修改", id: 22 },
            { label: "虾苗进货查询", id: 23 },
          ],
        },
        {
          label: "虾苗信息",
          id: 4,
          children: [
            { label: "虾苗信息增加", id: 24 },
            { label: "虾苗信息删除", id: 25 },
            { label: "虾苗信息修改", id: 26 },
            { label: "虾苗信息查询", id: 27 },
          ],
        },
        {
          label: "投入品管理",
          id: 5,
          children: [
            { label: "投入品增加", id: 28 },
            { label: "投入品删除", id: 29 },
            { label: "投入品修改", id: 30 },
            { label: "投入品查询", id: 31 },
          ],
        },
        {
          label: "监控设备",
          id: 6,
          children: [
            { label: "监控增加", id: 32 },
            { label: "监控删除", id: 33 },
            { label: "监控修改", id: 34 },
            { label: "监控查询", id: 35 },
          ],
        },
        {
          label: "气象设备",
          id: 7,
          children: [
            { label: "气象设备增加", id: 36 },
            { label: "气象设备删除", id: 37 },
            { label: "气象设备修改", id: 38 },
            { label: "气象设备查询", id: 39 },
          ],
        },
        {
          label: "水质设备",
          id: 8,
          children: [
            { label: "水质设备增加", id: 40 },
            { label: "水质设备删除", id: 41 },
            { label: "水质设备修改", id: 42 },
            { label: "水质设备查询", id: 43 },
          ],
        },
        {
          label: "冷库",
          id: 9,
          children: [
            { label: "冷库增加", id: 44 },
            { label: "冷库删除", id: 45 },
            { label: "冷库修改", id: 46 },
            { label: "冷库查询", id: 47 },
          ],
        },
        {
          label: "加工厂",
          id: 10,
          children: [
            { label: "加工厂增加", id: 48 },
            { label: "加工厂删除", id: 49 },
            { label: "加工厂修改", id: 50 },
            { label: "加工厂查询", id: 51 },
          ],
        },
        {
          label: "产品信息",
          id: 11,
          children: [
            { label: "产品增加", id: 52 },
            { label: "产品删除", id: 53 },
            { label: "产品修改", id: 54 },
            { label: "产品查询", id: 55 },
          ],
        },
      ],
      managerAuthority: {
        label: "溯源管理",
        authorityId: "1324928369070018560",
        children: [
          {
            label: "池塘管理",
            authorityId: "1324928826706341888",
            children: [
              { label: "池塘查询", authorityId: "1324931271993962496" },
            ],
          },
          {
            label: "农资管理",
            authorityId: "1324931271993962497",
            children: [
              { label: "农资删除", authorityId: "1324934160988561410" },
            ],
          },
          {
            label: "虾苗进货",
            authorityId: "1324931271993962498",
            children: [
              { label: "虾苗进货删除", authorityId: "1324934160992755716" },
            ],
          },
          {
            label: "虾苗信息",
            authorityId: "1324931271993962499",
            children: [
              { label: "虾苗信息删除", authorityId: "1324940916355612673" },
            ],
          },
          {
            label: "投入品管理",
            authorityId: "1324931271993962500",
            children: [
              { label: "投入品删除", authorityId: "1324940916355612677" },
            ],
          },
          {
            label: "监控设备",
            authorityId: "1324931271993962501",
            children: [
              { label: "监控删除", authorityId: "1324941567521292288" },
            ],
          },
          {
            label: "气象设备",
            authorityId: "1324931271993962502",
            children: [
              { label: "气象设备删除", authorityId: "1324941567521292292" },
            ],
          },
          {
            label: "水质设备",
            authorityId: "1324931271993962503",
            children: [
              { label: "水质设备增加", authorityId: "1324942303269236736" },
              { label: "水质设备删除", authorityId: "1324942303269236737" },
            ],
          },
          {
            label: "冷库",
            authorityId: "1324931271993962504",
            children: [
              { label: "冷库删除", authorityId: "1324942303269236742" },
              { label: "冷库修改", authorityId: "1324942303269236743" },
            ],
          },
          {
            label: "加工厂",
            authorityId: "1324931271993962505",
            children: [
              { label: "加工厂删除", authorityId: "1324943021229309953" },
            ],
          },
          {
            label: "产品信息",
            authorityId: "1324934160988561408",
            children: [
              { label: "产品删除", authorityId: "1324943021229309957" },
            ],
          },
        ],
      },
      references: [
        { authorityId: "1324928369070018560", label: "溯源管理" },
        { label: "池塘管理", id: 1, authorityId: "1324928826706341888" },
        { label: "池塘增加", id: 12, authorityId: "1324929250763042816" },
        { label: "池塘删除", id: 13, authorityId: "1324929521148768256" },
        { label: "池塘修改", id: 14, authorityId: "1324931061892829184" },
        { label: "池塘查询", id: 15, authorityId: "1324931271993962496" },
        { label: "农资管理", id: 2, authorityId: "1324931271993962497" },
        { label: "农资增加", id: 16, authorityId: "1324934160988561409" },
        { label: "农资删除", id: 17, authorityId: "1324934160988561410" },
        { label: "农资修改", id: 18, authorityId: "1324934160992755712" },
        { label: "农资查询", id: 19, authorityId: "1324934160992755713" },
        { label: "虾苗进货", id: 3, authorityId: "1324931271993962498" },
        { label: "虾苗进货增加", id: 20, authorityId: "1324934160992755715" },
        { label: "虾苗进货删除", id: 21, authorityId: "1324934160992755716" },
        { label: "虾苗进货修改", id: 22, authorityId: "1324934160992755717" },
        { label: "虾苗进货查询", id: 23, authorityId: "1324934160992755718" },
        { label: "虾苗信息", id: 4, authorityId: "1324931271993962499" },
        { label: "虾苗信息增加", id: 24, authorityId: "1324940916355612672" },
        { label: "虾苗信息删除", id: 25, authorityId: "1324940916355612673" },
        { label: "虾苗信息修改", id: 26, authorityId: "1324940916355612674" },
        { label: "虾苗信息查询", id: 27, authorityId: "1324940916355612675" },
        { label: "投入品管理", id: 5, authorityId: "1324931271993962500" },
        { label: "投入品增加", id: 28, authorityId: "1324940916355612676" },
        { label: "投入品删除", id: 29, authorityId: "1324940916355612677" },
        { label: "投入品修改", id: 30, authorityId: "1324940916355612678" },
        { label: "投入品查询", id: 31, authorityId: "1324940916355612679" },
        { label: "监控设备", id: 6, authorityId: "1324931271993962501" },
        { label: "监控增加", id: 32, authorityId: "1324941567517097984" },
        { label: "监控删除", id: 33, authorityId: "1324941567521292288" },
        { label: "监控修改", id: 34, authorityId: "1324941567521292289" },
        { label: "监控查询", id: 35, authorityId: "1324941567521292290" },
        { label: "气象设备", id: 7, authorityId: "1324931271993962502" },
        { label: "气象设备增加", id: 36, authorityId: "1324941567521292291" },
        { label: "气象设备删除", id: 37, authorityId: "1324941567521292292" },
        { label: "气象设备修改", id: 38, authorityId: "1324941567521292293" },
        { label: "气象设备查询", id: 39, authorityId: "1324941567521292294" },
        { label: "水质设备", id: 8, authorityId: "1324931271993962503" },
        { label: "水质设备增加", id: 40, authorityId: "1324942303269236736" },
        { label: "水质设备删除", id: 41, authorityId: "1324942303269236737" },
        { label: "水质设备修改", id: 42, authorityId: "1324942303269236738" },
        { label: "水质设备查询", id: 43, authorityId: "1324942303269236739" },
        { label: "冷库", id: 9, authorityId: "1324931271993962504" },
        { label: "冷库增加", id: 44, authorityId: "1324942303269236741" },
        { label: "冷库删除", id: 45, authorityId: "1324942303269236742" },
        { label: "冷库修改", id: 46, authorityId: "1324942303269236743" },
        { label: "冷库查询", id: 47, authorityId: "1324942303269236744" },
        { label: "加工厂", id: 10, authorityId: "1324931271993962505" },
        { label: "加工厂增加", id: 48, authorityId: "1324943021229309952" },
        { label: "加工厂删除", id: 49, authorityId: "1324943021229309953" },
        { label: "加工厂修改", id: 50, authorityId: "1324943021229309954" },
        { label: "加工厂查询", id: 51, authorityId: "1324943021229309955" },
        { label: "产品信息", id: 11, authorityId: "1324934160988561408" },
        { label: "产品增加", id: 52, authorityId: "1324943021229309956" },
        { label: "产品删除", id: 53, authorityId: "1324943021229309957" },
        { label: "产品修改", id: 54, authorityId: "1324943021229309958" },
        { label: "产品查询", id: 55, authorityId: "1324943021229309959" },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      selectedId: [],
      nowSelectedId: 2,
    };
  },
  components:{
    Authority
  },
  methods: {
    // 分页获取角色
    async getRoleList(page,size){
      const {data:res} = await this.$role.get(`/${page}/${size}`);

    },
    settingAuthority(id) {
      this.isShowDrawer = true;
    },

  },
};
</script>
<style lang="less" scoped>
.el-tag {
  margin: 7px;
}
.el-drawer__body {
  overflow-y: scroll;
}
.bdtop {
  border-top: 1px dashed #ccc;
}
.bdbottom {
  border-bottom: 1px dashed #ccc;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>