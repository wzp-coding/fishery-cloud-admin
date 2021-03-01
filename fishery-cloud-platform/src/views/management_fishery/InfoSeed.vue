<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>养殖管理</el-breadcrumb-item>
      <el-breadcrumb-item>种苗信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <TheCardHead>
        <div slot="CardTitle">
          <el-col :span="4">
            <i class="el-icon-s-order"></i>
            <span>种苗信息</span>
          </el-col>
          <el-col style="float: right; width: 100px; margin-right: 10px">
            <el-button type="primary" @click="toaddSeed.dialogVisible = true"
              >添加种苗</el-button
            >
          </el-col>
        </div>
      </TheCardHead>
      <el-table border stripe :data="allSeedInfo">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="left"
              inline
              label-width="170px"
              class="exp"
            >
              <el-row style="margin-bottom: 0">
                <el-col :span="12">
                  <el-form-item label="种苗批次名称">
                    <span>{{ props.row.germchitBatchName }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="种苗品种">
                    <span>{{ props.row.germchitSpecies }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="margin-bottom: 0">
                <el-col :span="12">
                  <el-form-item label="种苗产地">
                    <span>{{ props.row.germchitOrigin }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="供应商名称">
                    <span>{{ props.row.germchitSupplierName }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="margin-bottom: 0">
                <el-col :span="12">
                  <el-form-item label="供应商电话">
                    <span>{{ props.row.germchitSupplierPhone }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="种苗数量">
                    <span>{{ props.row.germchitAmount }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <div>质检图片</div> -->
            </el-form>
          </template>
        </el-table-column>
        <!--普通列-->
        <el-table-column
          prop="germchitSpecies"
          label="种苗品种"
        ></el-table-column>
        <el-table-column label="种苗产地" prop="germchitOrigin">
        </el-table-column>
        <el-table-column label="种苗数量" prop="germchitAmount">
        </el-table-column>
        <el-table-column label="供货商姓名" prop="germchitSupplierName">
        </el-table-column>
        <el-table-column label="操作" width="240px" fixed="right">
          <!--  -->
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip
              effect="dark"
              content="修改按钮"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                @click="editView(scope.row.id)"
                icon="el-icon-edit"
                size="mini"
              ></el-button
            ></el-tooltip>
            <el-tooltip
              effect="dark"
              content="下订单"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-s-order"
                @click="purchaseView(scope.row.id)"
                size="mini"
              ></el-button> </el-tooltip
            ><!-- 入库按钮 -->
            <el-tooltip
              v-if="false"
              effect="dark"
              content="进入冷库"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="success"
                icon="el-icon-mobile"
                size="mini"
              ></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip
              effect="dark"
              content="删除按钮"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeGermchit(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <ThePagination
        :toPagination="paginationInfo"
        @fatherMethod="paginationChangeEvent"
      ></ThePagination>
    </el-card>

    <!--添加种苗对话框-->
    <addSeed
      :toAddSeedInfo="toaddSeed"
      @fatherMethod="getSeedInfoList"
    ></addSeed>

    <!--修改种苗信息-->
    <editSeed
      :toEditSeedInfo="toEditSeedInfo"
      @fatherMethod="getSeedInfoList"
    ></editSeed>
    <!-- 下订单 -->
    <purchaseSeed
      :toPurchaseInfo="toPurchaseInfo"
      @fatherMethod="getSeedInfoList"
    ></purchaseSeed>
  </div>
</template>

<script>
import TheCardHead from "../../components/ccy/TheCardHead";
import ThePagination from "../../components/ccy/ThePagination";
import TheLayout from "../../components/ccy/TheLayout";
import addSeed from "../../components/ccy/InfoSeed/addSeed";
import editSeed from "../../components/ccy/InfoSeed/editSeed";
import purchaseSeed from "../../components/ccy/InfoSeed/purchaseSeed";
export default {
  components: {
    ThePagination,
    TheCardHead,
    TheLayout,
    addSeed,
    editSeed,
    purchaseSeed,
  },
  data() {
    return {
      //种苗信息数组
      allSeedInfo: [],
      allSeedSpecise: [],
      //分页信息
      paginationInfo: {
        total: 0,
        size: 3,
        page: 1,
      },
      //修改种苗信息
      toEditSeedInfo: {
        dialogVisible: false,
        id: "",
      },
      //下订单

      toPurchaseInfo: {
        germchitId: "", //购买商品ID,
        dialogVisible: false,
      },
      toaddSeed: {
        dialogVisible: false,
      },
    };
  },
  created() {
    this.getSeedInfoList();
    this.getSeedInfoSpecies();
  },
  methods: {
    //获取所有种苗信息 分页
    async getSeedInfoList() {
      const { data: res } = await this.$germchit.get(
        `${this.paginationInfo.size}/${this.paginationInfo.page}`
      );
      console.log(res);
      this.allSeedInfo = res.data.records;
      this.paginationInfo.total = res.data.total;
    },
    //获取所有种苗信息非分页
    async getSeedInfoSpecies() {
      const { data: res } = await this.$germchit.get();
      this.allSeedSpecise = res.data;
    },
    editView(id) {
      console.log(id);
      this.toEditSeedInfo.id = id;
      this.toEditSeedInfo.dialogVisible = true;
    },

    async removeGermchit(id) {
      const confirmResult = await this.elConfirm(
        "此操作将永久删除该种苗信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
        // .catch 用于捕获错误返回给confirmResult
      ).catch((err) => {
        return err;
      });

      if (confirmResult !== "confirm") {
        return this.elMessage.info("已取消删除");
      }
      const { data: res } = await this.$germchit.delete(`${id}`);
      console.log(res);
      this.elMessage.success('删种苗信息成功！！')
      this.getSeedInfoList();
    },
    purchaseView(id) {
      console.log(this);
      this.toPurchaseInfo.dialogVisible = true;
      this.toPurchaseInfo.germchitId = id;
      console.log(id);
    },
    paginationChangeEvent(size, page) {
      this.paginationInfo.size = size;
      this.paginationInfo.page = page;
      this.getSeedInfoList();
    },
  },
};
</script>

<style scoped>
.exp label {
  width: 90px;
}
.exp .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>