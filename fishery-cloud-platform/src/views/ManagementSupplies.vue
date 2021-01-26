<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>养殖管理</el-breadcrumb-item>
      <el-breadcrumb-item>农资管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row
      class="globalHeader"
      style="
        margin-bottom: 20px;
        padding-bottom: 45px;
        background-color: #eaedf1;
      "
    >
      <el-col :span="4">
        <i class="el-icon-grape"></i>
        <span>农资管理</span>
      </el-col>
    </el-row>
    <el-tabs type="border-card">
      <el-tab-pane label="入库记录">
        <TheCardAll>
          <div slot="CardTitle">
            <el-col style="width: 100px; float: right; margin-left: 10px">
              <el-button type="primary">农资入库</el-button>
            </el-col>
            <el-col style="width: 100px; float: right">
              <el-select @change="typeChange1">
                <el-option> </el-option>
              </el-select>
            </el-col>
          </div>
          <div slot="ordinary">
            <el-table-column type="index"> </el-table-column>
            <el-table-column
              prop="suppliesName"
              label="农资名称"
            ></el-table-column>
            <el-table-column
              prop="inTime"
              label="入库日期"
              width="180px"
            ></el-table-column>
            <el-table-column prop="inOperator" label="操作人"></el-table-column>
            <el-table-column prop="warehouse" label="仓库号"></el-table-column>
            <el-table-column
              prop="inNumber"
              label="入库数量(kg)"
            ></el-table-column>
            <el-table-column prop="remainNumber" label="剩余数量(kg)">
              <template slot-scope="scope">
                <el-tag type="info" v-if="scope.row.remainNumber > 20">{{
                  scope.row.remainNumber
                }}</el-tag>
                <el-tag type="danger" v-else>{{
                  scope.row.remainNumber
                }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180px">
              <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="inEditDialog(scope.row.id)"
                  :disabled="
                    !permissionVisable.traceability_agricultural_update
                  "
                ></el-button>
                <!-- 出库按钮 -->
                <el-tooltip
                  effect="dark"
                  content="出库"
                  placement="top"
                  :enterable="false"
                >
                  <el-button
                    type="warning"
                    icon="el-icon-upload2"
                    size="mini"
                    @click="deliveryDialog(scope.row.id)"
                    :disabled="
                      !permissionVisable.traceability_agricultural_select
                    "
                  ></el-button>
                </el-tooltip>
                <!-- 删除按钮 -->
                <!-- type="danger": 红色警告按钮 -->
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="removeSuppliesInById(scope.row.id)"
                  :disabled="
                    !permissionVisable.traceability_agricultural_delete
                  "
                ></el-button>
              </template>
            </el-table-column>
          </div>
          <ThePagination slot="pagination"></ThePagination>
        </TheCardAll>
      </el-tab-pane>
      <el-tab-pane label="出库记录">
        <TheCardAll>
          <div slot="CardTitle">
            <el-col style="width: 100px; float: right; margin-bottom: 10px">
              <el-select v-model="selectType2" @change="typeChange2">
                <el-option
                  v-for="item in type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </div>
          <div slot="ordinary">
            <el-table-column type="index"> </el-table-column>
            <el-table-column
              prop="suppliesName"
              label="农资名称"
            ></el-table-column>
            <el-table-column
              prop="outTime"
              label="出库日期"
              width="180px"
            ></el-table-column>
            <el-table-column
              prop="outOperator"
              label="操作员"
            ></el-table-column>
            <el-table-column prop="warehouse" label="仓库号"></el-table-column>
            <el-table-column
              prop="outNumber"
              label="出库数量(kg)"
            ></el-table-column>
            <el-table-column label="操作" width="180px">
              <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="small"
                  @click="outEditDialog(scope.row.id)"
                  :disabled="
                    !permissionVisable.traceability_agricultural_update
                  "
                ></el-button>
                <!-- 删除按钮 -->
                <!-- type="danger": 红色警告按钮 -->
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                  @click="removeSuppliesOutById(scope.row.id)"
                  :disabled="
                    !permissionVisable.traceability_agricultural_delete
                  "
                ></el-button>
              </template>
            </el-table-column>
          </div>
        </TheCardAll>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TheCardAll from "../components/ccy/TheCardAll";
import TheCardHead from "../components/ccy/TheCardHead";
import ThePagination from "../components/ccy/ThePagination";
import TheDialogAll from "../components/ccy/TheDialogAll";
export default {
  components: {
    TheCardAll,
    ThePagination,
    TheDialogAll,
  },
};
</script>

<style>
</style>