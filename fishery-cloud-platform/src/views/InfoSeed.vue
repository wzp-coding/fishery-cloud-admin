<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>养殖管理</el-breadcrumb-item>
      <el-breadcrumb-item>🐟苗信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <TheCardHead>
        <div slot="CardTitle">
          <el-col :span="4">
            <i class="el-icon-s-order"></i>
            <span>鱼苗信息</span>
          </el-col>
        </div>
      </TheCardHead>
      <el-table border stripe :data="allSeedInfo">
        <el-table-column type="expand" >
          <template slot-scope="props">
            <el-form label-position="left" inline label-width="170px" class="exp">
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
          <!-- slot-scope="scope" -->
          <template >
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <ThePagination :toPagination="paginationInfo"  @fatherMethod="getSeedInfoList"></ThePagination>
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
    TheCardHead,
  },
  data() {
    return {
      //种苗信息数组
      allSeedInfo: [],
      //分页信息
      paginationInfo: {
        total:0,
        size:4,
        currentPage:1,
        // sizeGroup:[4,6,8,10]
      },
    };
  },
  created() {
    this.getSeedInfoList(4,1);
  },
  methods: {
    //获取所有种苗信息
    async getSeedInfoList(size,page) {
      const { data: res } = await this.$germchit.get(`${size}/${page}`);
      console.log(res);
      this.allSeedInfo = res.data.records;
      this.paginationInfo.total = res.data.total;
    },

  },
};
</script>

<style scoped>
.exp label {
  width: 90px;
  color: #99a9bf;
}
.exp .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>