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
          <el-col style="float: right; width: 100px; margin-right: 10px">
            <el-button type="primary" >添加种苗</el-button>
          </el-col>
        </div>
      </TheCardHead>
      <el-table border stripe :data="allSeedInfo" >
        <el-table-column type="expand" >
          <template slot-scope="props" >
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
        @fatherMethod="getSeedInfoList"
      ></ThePagination>
    </el-card>
    <TheDialogAll :toDialogInfo="toDialogEditInfo" :FormInfo="editInfo">
      <TheLayout>
        <el-form-item label-width="120px" label="种苗批次名称" slot="pre" prop="germchitBatchName">
          <el-input v-model="editInfo.germchitBatchName"></el-input>
        </el-form-item>
        <el-form-item label-width="100px" label="种苗品种" slot="after" prop="germchitSpecies">
          <el-select v-model="editInfo.germchitSpecies" placeholder="请选择">
            <el-option
              v-for="item in allSeedSpecise"
              :key="item.id"
              :value="item.germchitBatchName"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </TheLayout>
      <TheLayout>
        <el-form-item label-width="120px" label="种苗产地" slot="pre" prop="germchitOrigin">
          <el-input v-model="editInfo.germchitOrigin"></el-input>
        </el-form-item>
        <el-form-item
          label="种苗供应商"
          slot="after"
          prop="germchitSupplierName"
        >
          <el-input v-model="editInfo.germchitSupplierName"></el-input>
        </el-form-item>
      </TheLayout>
      <TheLayout>
        <el-form-item label-width="120px" label="放苗时间" slot="pre" prop="gmtModified">
          <el-date-picker
            v-model="editInfo.gmtModified"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="种苗数量" slot="after" prop="germchitAmount">
          <el-input v-model="editInfo.germchitAmount"> </el-input>
        </el-form-item>
      </TheLayout>
      <TheLayout>
        <el-form-item
        label-width="120px"
          label="供应商电话"
          slot="pre"
          prop="germchitSupplierPhone"
        >
          <el-input v-model="editInfo.germchitSupplierPhone"></el-input>
        </el-form-item>
      </TheLayout>
      <!--  -->
      <el-row>
        <el-col :span="4"><span>上传质检图片</span></el-col>
        <el-col :span="19"
          ><el-upload
            action="http://106.75.154.40:9011/base/addPic"
            list-type="picture-card"
            :auto-upload="true"
            ref="upload"
            class="addBox"
          >
            <i class="el-icon-plus"></i> </el-upload
        ></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="toDialogEditInfo.dialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="editSeedInfo">确 定</el-button>
      </span>
    </TheDialogAll>
    <TheDialogAll :toDialogInfo="toDialogPurchase">
      <el-form-item label="购买数量" prop="purchaseAmount">
        <el-input-number
          v-model="purchaseInfo.purchaseAmount"
          controls-position="right"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="操作者" prop="creatorName">
        <el-input v-model="purchaseInfo.creatorName"></el-input>
      </el-form-item>
      <span slot="footer" class="dialog-footer">
        <el-button @click="toDialogPurchase.dialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="purchaseEvent">确 定</el-button>
      </span>
    </TheDialogAll>
  </div>
</template>

<script>
import TheCardAll from "../components/ccy/TheCardAll";
import TheCardHead from "../components/ccy/TheCardHead";
import ThePagination from "../components/ccy/ThePagination";
import TheDialogAll from "../components/ccy/TheDialogAll";
import TheLayout from "../components/ccy/TheLayout";
export default {
  components: {
    TheCardAll,
    ThePagination,
    TheDialogAll,
    TheCardHead,
    TheLayout,
  },
  data() {
    return {
      //种苗信息数组
      allSeedInfo: [],
      allSeedSpecise: [],
      //分页信息
      paginationInfo: {
        total: 0,
        size: 4,
        currentPage: 1,
        // sizeGroup:[4,6,8,10]
      },
      toDialogEditInfo: {
        title: "修改信息",
        dialogVisible: false,
        addeForm:this.editInfo,
        width:'50%',
        FormRules: {
          germchitBatchName: [
            { required: true, message: "请输入批次名称", trigger: "blur" },
            {
              min: 2,
              max: 10,
              message: "种苗苗批次名称的长度在2~10个字符之间",
              trigger: "blur",
            },
          ],
          germchitSpecies: [
            { required: true, message: "请输入种苗品种", trigger: "blur" },
          ],
          germchitOrigin: [
            { required: true, message: "请输入种苗产地", trigger: "blur" },
          ],
          germchitSupplierName: [
            { required: true, message: "请输入供货商名称", trigger: "blur" },
            {
              min: 2,
              max: 10,
              message: "供货商名称的长度在2~10个字符之间",
              trigger: "blur",
            },
          ],
        },
      },
      editInfo: {
        // title: "修改信息",
        // dialogVisible: false,
        id: "", //种苗ID
        germchitAmount: 0, //剩余数量
        germchitOrigin: "", //产地
        germchitBatchName: "", //种苗批次
        germchitQualityInspection:
          "https://i0.hdslb.com/bfs/sycp/creative_img/202101/b6a0a2ac780098692874fbdfe4d14d70.jpg", //质检图片
        germchitSpecies: "", //种苗品种
        germchitSupplierName: "", //供应商名称
        germchitSupplierPhone: "", //供应商电话
        // gmtCreate: "", //创建时间
        gmtModified: "", //修改时间
      },
      toDialogPurchase: {
        title: "订单信息",
        dialogVisible: false,
        width:'20%'
      },
      purchaseInfo: {
        creatorName: "", //操作者
        baseId: "1248910886228332544",
        purchaseAmount: "", //购买数量
        germchitId: "", //购买商品ID
      },
    };
  },
  created() {
    this.getSeedInfoList(4, 1);
    this.getSeedInfoSpecies();
  },
  methods: {
    test(){
      console.log(this.$store.state);
    },
    //获取所有种苗信息 分页
    async getSeedInfoList(size, page) {
      const { data: res } = await this.$germchit.get(`${size}/${page}`);
      console.log(res);
      this.allSeedInfo = res.data.records;
      this.paginationInfo.total = res.data.total;
    },
    //获取所有种苗信息非分页
    async getSeedInfoSpecies() {
      const { data: res } = await this.$germchit.get();
      console.log(res);
      this.allSeedSpecise = res.data;
    },
    editView(id) {
      console.log(id);
      this.editInfo.id = id;
      this.toDialogEditInfo.dialogVisible = true;
    },
    //修改
    async editSeedInfo() {
      console.log(this.editInfo);
      this.editInfo.gmtModified = this.timeFormat(this.editInfo.gmtModified);
      const { data: res } = await this.$germchit.put("", this.editInfo);
      this.getSeedInfoList(4, 1);
      this.toDialogEditInfo.dialogVisible = false;
      console.log(res);
      // console.log(id);
    },
    //下订单
    async purchaseEvent() {
      const { data: res } = await this.$germchitManagerController.post(
        "purchase",
        this.purchaseInfo
      );
      if (res.statusCode === 20000) {
        this.$message.success("提交订单成功");
      } else {
        console.log("下订单失败");
      }
      this.toDialogPurchase.dialogVisible = false;
    },
    async removeGermchit(id) {
      // console.log('2');
      const confirmResult = await this.$confirm(
        "此操作将永久删除该种苗苗信息, 是否继续?",
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
      // 如果确认删除，则返回值为字符串 confirm
      // 如果取消了删除， 则返回值为字符串 cancel
      if (confirmResult !== "confirm") {
        // this.$message.info: 灰色提示框
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$germchit.delete(`${id}`);
      console.log(res);
      this.$message.success("删虾苗信息成功！！");
      this.getSeedInfoList(3, 1);
    },
    //添加种苗信息
    addGermchit(){},
    purchaseView(id) {
      this.toDialogPurchase.dialogVisible = true;
      this.purchaseInfo.germchitId = id;
      console.log(id);
    },
    timeFormat(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
    ev1(){
      // alert('11')
      console.log('111');
    }
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