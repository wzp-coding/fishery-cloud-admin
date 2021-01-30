<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>养殖管理</el-breadcrumb-item>
      <el-breadcrumb-item>🐟苗信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
    <TheCardAll>
      <div slot="CardTitle">
        <el-col :span="4">
          <i class="el-icon-s-order"></i>
          <span>虾苗信息</span>
        </el-col>
      </div>
      <el-table-column type="expand" slot="cardExpand">
        <template slot-scope="props">
          <el-form label-position="left" label-width="170px">
            <el-row style="margin-bottom: 0">
              <el-col :span="12">
                <el-form-item label="虾苗批次名称" class="down-label">
                  <span>{{ props.row.shrimpBatchName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="虾苗品种" class="down-label">
                  <span>{{ props.row.shrimpSpecies }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 0">
              <el-col :span="12">
                <el-form-item label="放苗时间" class="down-label">
                  <span>{{ props.row.seedlingTime }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="捕捞状态" class="down-label">
                  <span>{{
                    props.row.fishingStatus === "1" ? "已捕捞" : "未捕捞"
                  }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 0">
              <el-col :span="12">
                <el-form-item label="捕捞时间" class="down-label">
                  <span>{{
                    props.row.fishingStatus === "1" ? props.row.fishingTime : ""
                  }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="捕捞审核人" class="down-label">
                  <span>{{
                    props.row.fishingStatus === "1" ? props.row.createBy : ""
                  }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 0">
              <el-col :span="12">
                <el-form-item label="投放尾数/尾" class="down-label">
                  <span>{{ props.row.inputNum }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="产量kg" class="down-label">{{
                  props.row.fishingStatus === "1" ? props.row.yield : ""
                }}</el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 0">
              <el-col :span="12">
                <el-form-item label="剩余量/kg" class="down-label">
                  <span>{{
                    props.row.fishingStatus === "1" ? props.row.remain : ""
                  }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="规格(尾/kg)" class="down-label">
                  <span>{{
                    props.row.fishingStatus === "1"
                      ? props.row.specification
                      : ""
                  }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 0">
              <el-col :span="12">
                <el-form-item label="虾苗产地" class="down-label">
                  <span>{{ props.row.shrimpOrigin }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="虾苗供应商" class="down-label">
                  <span>{{ props.row.shrimpSupplier }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <div slot="ordinary">
        <el-table-column
          prop="shrimpSpecies"
          label="虾苗品种"
        ></el-table-column>
        <el-table-column label="捕捞状态">
          <template slot-scope="scope">{{
            scope.row.fishingStatus === "1" ? "已捕捞" : "未捕捞"
          }}</template>
        </el-table-column>
        <el-table-column prop="fishingTime" label="捕捞时间">
          <template slot-scope="scope">{{
            scope.row.fishingStatus === "1" ? scope.row.fishingTime : ""
          }}</template>
        </el-table-column>
        <el-table-column label="剩余量/kg">
          <template slot-scope="scope">
            {{
              scope.row.fishingStatus === "1" ? scope.row.remain : ""
            }} </template
          >kg
        </el-table-column>
        <el-table-column label="规格(尾/kg)">
          <template slot-scope="scope">{{
            scope.row.fishingStatus === "1" ? scope.row.specification : ""
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="240px" fixed="right">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
              :disabled="!permissionVisable.traceability_shrimpInfo_update"
            ></el-button>
            <!-- 订单按钮 -->
            <el-tooltip
              effect="dark"
              content="下订单"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-s-order"
                size="mini"
                v-show="scope.row.fishingStatus == 1 ? true : false"
                @click="orderById(scope.row.id)"
                :disabled="!permissionVisable.traceability_shrimpInfo_select"
              ></el-button>
            </el-tooltip>
            <!-- 入库按钮 -->
            <el-tooltip
              effect="dark"
              content="进入冷库"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="success"
                icon="el-icon-mobile"
                size="mini"
                v-show="scope.row.fishingStatus == 1 ? true : false"
                @click="storageById(scope.row.id)"
                :disabled="!permissionVisable.traceability_shrimpInfo_select"
              ></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeShrimpById(scope.row.id)"
              :disabled="!permissionVisable.traceability_shrimpInfo_delete"
            ></el-button>
          </template>
        </el-table-column>
      </div>
      <ThePagination slot="pagination"></ThePagination>
    </TheCardAll>
    </el-card>
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