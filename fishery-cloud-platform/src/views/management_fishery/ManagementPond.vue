 <template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>渔业管理</el-breadcrumb-item>
      <el-breadcrumb-item>池塘管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <TheCardHead>
        <div slot="CardTitle">
          <el-col :span="4">
            <i class="el-icon-receiving"></i>
            <span>池塘管理</span>
          </el-col>
        </div>
      </TheCardHead>
      <el-tabs type="border-card">
        <el-tab-pane label="池塘信息">
          <el-row>
            <el-col style="width: 100px; float: right">
              <el-button
                type="primary"
                @click="addPondInfo.dialogVisible = true"
                >添加池塘</el-button
              >
            </el-col>
          </el-row>
          <div class="bigBox">
            <!-- 池塘子组件 -->
            <pond
              :toPond="item"
              v-for="(item, index) in pondList"
              :key="index"
              @fatherMethod="getPondList"
            ></pond>
          </div>
          <ThePagination
            :toPagination="paginationInfo"
            @fatherMethod="paginationChangeEvent"
          ></ThePagination>
        </el-tab-pane>
        <el-tab-pane label="捕捞信息">
          <el-table border stripe :data="catchInfo">
            <el-table-column label="批次名称" prop="germchitBatchName">
            </el-table-column>
            <el-table-column label="捕捞人" prop="operatorName">
            </el-table-column>
            <el-table-column label="捕捞数量" prop="catchAmount">
            </el-table-column>
            <el-table-column label="捕捞质量" prop="totalWeight">
            </el-table-column>
            <el-table-column label="剩余质量" prop="surplusWeight">
            </el-table-column>
            <el-table-column label="剩余数量" prop="surplusAmount">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="创建订单"
                  placement="top-start"
                >
                  <el-button
                    type="primary"
                    icon="el-icon-s-cooperation"
                    size="small"
                    :disabled="
                      scope.row.surplusWeight == 0 ||
                      scope.row.surplusAmount == 0
                    "
                    @click="
                      creteOrderEvent(
                        scope.row
                      )
                    "
                  ></el-button>
                </el-tooltip>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                  @click="removeCatchInfo(scope.row.id)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <ThePagination
            :toPagination="paginationCatchInfo"
            @fatherMethod="paginationCatchChangeEvent"
          ></ThePagination>
        </el-tab-pane>
        <el-tab-pane label="投喂信息">
          <el-row>
            <el-col>
              <el-button
                @click="downExcel"
                style="width: 100px; float: right"
                type="success"
                >导出记录</el-button
              >
            </el-col>
          </el-row>
          <el-table border stripe :data="feedList">
            <el-table-column label="投喂人" prop="operatorName">
            </el-table-column>
            <el-table-column label="身份" prop="operatorIdentity">
            </el-table-column>
            <el-table-column label="投喂品" prop="supplyName">
            </el-table-column>
            <el-table-column label="投喂品类型" prop="supplyType">
            </el-table-column>
            <el-table-column label="投喂数量" prop="feedingVolume">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="small"
                  @click="editFeedEvent(scope.row.pondId)"
                ></el-button> -->
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                  @click="removeFeedInfo(scope.row.pondId)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <ThePagination
            :toPagination="paginationFeedInfo"
            @fatherMethod="paginationFeedChangeEvent"
          ></ThePagination>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加池塘 -->
    <addPond :toDialogInfo="addPondInfo" @fatherMethods="getPondList"></addPond>
    <!-- 创建订单 -->
    <Create-order
      :createdialogVisible="createdialogVisible"
      :orderid="orderid"
      :ordertitle="ordertitle"
      :germchitId="germchitId"
      :orderName="orderName"
      @refresh="eventRefresh"
      :catchMax="catchMax"
      :surplusAmount="surplusAmount"
      @createnotifyParent="changecreatedialogVisible"
    >
    </Create-order>
    <editFeedDialog
      :editId="editId"
      @fatherMethods="editFather"
      :dialogVisible="editFeedVisible"
    ></editFeedDialog>
  </div>
</template>

<script>
import TheCardHead from "../../components/ccy/TheCardHead";
import TheDialogAll from "../../components/ccy/TheDialogAll";
import ThePagination from "../../components/ccy/ThePagination";
import pond from "../../components/ccy/ManagementPond/pond";
import addPond from "../../components/ccy/ManagementPond/addPond";
import editFeedDialog from "../../components/ccy/ManagementPond/editFeedDialog";
import CreateOrder from "../../components/cgx/ManagementOrder/CreateOrder/createOrder";
export default {
  components: {
    TheCardHead,
    pond,
    ThePagination,
    TheDialogAll,
    addPond,
    CreateOrder,
    editFeedDialog,
  },
  data() {
    return {
      //全部池塘信息
      pondList: [],
      catchInfo: [], //捕捞信息
      paginationInfo: {
        size: 6,
        page: 1,
        total: 0,
      },
      paginationCatchInfo: {
        size: 6,
        page: 1,
        total: 0,
      },
      paginationFeedInfo: {
        size: 6,
        page: 1,
        total: 0,
      },
      feedList: [], //投喂信息
      baseId: this.$store.state.userInfo.baseId, //基地ID
      // 添加池塘的表单数据
      addeForm: {
        //与对话框的输入数据绑定
        area: "", //池塘面积
        baseId: "1248910886228332544", //基地id
        creator: "boss", //创建者
        depth: "", //池塘深度
        name: "", //池塘名称
        type: "", //池塘类型
      },
      addPondInfo: {
        dialogVisible: false,
        total: 0,
        size: 3,
        page: 1,
        pondId: "",
        addeForm: this.addeForm,
        // 添加表单的验证规则对象
        FormRules: {
          name: [
            { required: true, message: "请输入池塘名称", trigger: "blur" },
            {
              min: 2,
              max: 10,
              message: "池塘名称的长度在2~10个字符之间",
              trigger: "blur",
            },
          ],
          type: [
            { required: true, message: "请输入池塘类型", trigger: "blur" },
            {
              min: 2,
              max: 10,
              message: "池塘类型的长度在2~10个字符之间",
              trigger: "blur",
            },
          ],
          depth: [
            { required: true, message: "请输入池塘深度", trigger: "blur" },
          ],
          area: [
            { required: true, message: "请输入池塘面积", trigger: "blur" },
          ],
        },
        // rules:
      },
      editPondInfo: {
        title: "修改池塘信息",
        dialogVisible: false,
      },
      //投苗
      germchitList: [], // 种苗信息列表
      farmInfo: {
        title: "投苗信息面板",
        dialogVisible: false,
      },
      // 建议卡信息输入表单
      kindForm: {
        pondVolume: 0,
        pondDeep: 0,
        shrimpKindId: "",
        shrimpMethod: "",
      },
      //创建订单
      germchitId:null,
      createdialogVisible: false,
      orderid: "",
      orderName: "",
      ordertitle: "创建订单",
      catchMax: null, //最大出售质量
      surplusAmount: null, //最大出售数量
      //建议卡输入
      adviseInput: {
        title: "池塘信息输入",
        dialogVisible: false,
        // 建议卡的信息输入的验证规则对象
        kindFormRules: {
          kindName: [
            { required: true, message: "请输入虾的品种", trigger: "blur" },
          ],
          pondVolume: [
            { required: true, message: "请输入池塘面积", trigger: "blur" },
          ],
          pondDeep: [
            { required: true, message: "请输入池塘深度", trigger: "blur" },
          ],
        },
      },
      editId: "",
      editFeedVisible: false,
    };
  },
  created() {
    this.getPondList(); //获取池塘信息
    this.getCatchInfo(); //获取捕捞信息
    this.getFeedInfo(); //获取喂养信息
  },
  methods: {
    paginationChangeEvent(size, page) {
      this.paginationInfo.size = size;
      this.paginationInfo.page = page;
      this.getPondList();
    },
    paginationCatchChangeEvent(size, page) {
      this.paginationCatchInfo.size = size;
      this.paginationCatchInfo.page = page;
      this.getCatchInfo(); //获取捕捞信息
    },
    paginationFeedChangeEvent(size, page) {
      this.paginationFeedInfo.size = size;
      this.paginationFeedInfo.page = page;
      this.getFeedInfo(); //获取捕捞信息
    },
    async getPondList() {
      const { data: res } = await this.$pondController.get(
        `getInfo/${this.baseId}/${this.paginationInfo.size}/${this.paginationInfo.page}`
      );
      if (res.statusCode === 20000) {
        this.pondList = res.data.records;
        this.addPondInfo.total = res.data.total;
        this.paginationInfo.total = res.data.total;
      } else {
        console.log("查询池塘信息失败");
      }
    },
    eventRefresh() {
      this.getCatchInfo();
      this.getPondList();
    },
    //创建池塘
    async createPond() {
      console.log(this.addeForm);
      this.addPondInfo.baseId = "1248910886228332544";
      const { data: res } = await this.$pondController.post(
        `create}`,
        this.addeForm
      );
      if (res.statusCode !== 20000) {
        console.log("请求创建池塘失败");
      } else {
        console.log(res);
        this.addPondInfo.dialogVisible = !this.addPondInfo.dialogVisible;
        this.getPondList();
        this.reRender = true;
        this.elMessage.success("添加池塘成功!!");
      }
      console.log(res);
    },
    addPondEvent() {
      //确认添加池塘事件
      console.log("创建池塘事件");
      this.$refs.addeFormRef.dialogVerification();
    },

    //触发子组件的表单验证表单验证
    verification() {
      this.$refs.addeFormRef.dialogVerification();
    },
    async getCatchInfo() {
      const { data: res } = await this.$catchController.get(
        `${this.$store.state.baseInfo.id}/${this.paginationCatchInfo.size}/${this.paginationCatchInfo.page}`
      );
      if (res.statusCode === 20000) {
        this.paginationCatchInfo.total = res.data.total;
        this.catchInfo = res.data.records;
      } else {
        console.log("获取捕捞信息失败");
      }
    },
    parentMehod() {
      this.createPond();
    },
    // 监听捕捞对话框的关闭事件,关闭时对表单进行重置
    catchDialogClosed() {
      this.$refs.catchFormRef.resetFields();
    },
    //删除捕捞记录
    async removeCatchInfo(id) {
      const confirmResult = await this.elConfirm(
        `此操作将永久删除该捕捞纪录, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        return err;
      });
      if (confirmResult !== "confirm") {
        return this.elMessage.info("已取消删除");
      }
      const { data: res } = await this.$catchController.delete(`${id}`);
      if (res.statusCode === 20000) {
        this.elMessage.success("删除记录成功");
        this.getCatchInfo();
      }
    },
    changecreatedialogVisible() {
      this.createdialogVisible = false;
    },
    //创建订单
    creteOrderEvent(res) {
      console.log(res);
      this.orderid = res.id;
      this.orderName = res.germchitBatchName;
      this.surplusAmount = res.surplusAmount;
      this.catchMax = res.surplusWeight;
      this.germchitId = res.germchitId ;
      this.createdialogVisible = true;
    },
    async getFeedInfo() {
      const { data: res } = await this.$pondController.get(
        `feeding/${this.$store.state.baseInfo.id}/${this.paginationFeedInfo.size}/${this.paginationFeedInfo.page}`
      );
      // console.log(res);
      if (res.statusCode === 20000) {
        this.feedList = res.data.records;
        this.paginationFeedInfo.total = res.data.total;
      }
    },
    async removeFeedInfo(id) {
      const confirmResult = await this.elConfirm(
        "此操作将删除该池塘喂养记录，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        return err;
      });
      if (confirmResult !== "confirm") {
        return this.elMessage.info("已取消删除");
      }
      const { data: res } = await this.$pondController.delete(`feeding/${id}`);
      console.log(res);
      if (res.statusCode === 20000) {
        this.elMessage.success("删除成功");
        this.getFeedInfo();
      }
    },
    editFather() {
      this.editFeedVisible = false;
      this.getFeedInfo();
    },
    editFeedEvent(id) {
      this.editFeedVisible = true;
      this.editId = id;
    },
    async downExcel() {
      window.location.href =
        "http://119.23.218.131:9103/pond/feeding/excel/+this.$state.store.baseInfo.id";
    },
  },
};
</script>
<style lang="less">
.bigBox {
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
}
.bigBox p {
  color: #636e7b;
  margin: 5px 0;
}
.infoBox {
  padding-left: 20px;
}
.imgBox {
  width: 120px;
  height: 120px;
}
.imgBox img {
  border: 1px solid rgb(175, 172, 172);
  padding: 5px;
  border-radius: 100%;
  width: 100%;
  height: 100%;
}
.pondBody {
  border: 1px solid rgb(179, 179, 179);
  width: 31.5%;
  height: 200px;
  margin-left: 10px;
  border-radius: 4px;
}
.btnBox {
  border: 1px solid black;
  height: 10px;
  width: 100%;
}
.btnBox .blank {
  width: 120px;
}
.btnBox .btnGround {
  padding-left: 50px;
}
.dididi {
  border-collapse: collapse;
  border: 1px solid #c6e2ff;
  border-radius: 4px;
  width: 95%;
  td,
  th {
    border: 1px solid #b4b5b6;
    padding: 10px;
    text-align: center;
  }
  th {
    color: rgb(116, 114, 114);
  }
}
</style>
