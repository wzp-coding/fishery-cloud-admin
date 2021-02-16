<template>
  <div style="containter">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>对虾管理</el-breadcrumb-item>
      <el-breadcrumb-item>投入品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="containter">
      <TheCardAll :toCardInfo="allSupplyList">
        <div slot="CardTitle">
          <el-col :span="4">
            <i class="el-icon-folder"></i>
            <span>投入品管理</span>
          </el-col>
          <!-- 类型分类开始 -->
          <!-- <el-col style="width: 100px; float: right">
            
            <el-dropdown>
              <el-button size="medium">
                <span>1</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>1</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            
          </el-col> -->
          <!-- 类型分类结束 -->
          <el-col style="width: 100px; float: right; margin-right: 12px">
            <el-button
              type="primary"
              @click="toDialogSupply.dialogVisible = true"
              >添加投入品</el-button
            >
          </el-col>
        </div>

        <el-table-column type="expand">
          <template slot-scope="props" class="labelStyle">
            <el-form label-position="left" label-width="170px">
              <TheInfoSupplyLayout>
                <el-form-item label="投入品名称" class="down-label" slot="pre">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="投入品 ID" class="down-label" slot="after">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
              </TheInfoSupplyLayout>
              <TheInfoSupplyLayout>
                <el-form-item label="生产日期" class="down-label" slot="pre">
                  <span>{{ props.row.produceDate }}</span>
                </el-form-item>
                <el-form-item label="到期时间" class="down-label" slot="after">
                  <span>{{ props.row.shelfDate }}</span>
                </el-form-item>
              </TheInfoSupplyLayout>
              <TheInfoSupplyLayout
                ><el-form-item label="规格(mm)" class="down-label" slot="pre">
                  <span>{{ props.row.specification }}</span>
                </el-form-item>
                <el-form-item
                  label="投入品成分"
                  class="down-label"
                  slot="after"
                >
                  <span>{{ props.row.ingredient }}</span>
                </el-form-item>
              </TheInfoSupplyLayout>
              <TheInfoSupplyLayout>
                <el-form-item label="供应商名称" class="down-label" slot="pre">
                  <span>{{ props.row.supplierName }}</span>
                </el-form-item>
                <el-form-item
                  label="供应商地址"
                  class="down-label"
                  slot="after"
                >
                  <span>{{ props.row.supplierAddress }}</span>
                </el-form-item>
              </TheInfoSupplyLayout>
              <TheInfoSupplyLayout>
                <el-form-item label="检验人" class="down-label" slot="pre">
                  <span>{{ props.row.inspector }}</span>
                </el-form-item>
                <el-form-item
                  label="供应商电话"
                  class="down-label"
                  slot="after"
                >
                  <span>{{ props.row.supplierPhone }}</span>
                </el-form-item>
              </TheInfoSupplyLayout>
              <!-- <TheInfoSupplyLayout></TheInfoSupplyLayout> -->
              <el-form-item label="供应商生产许可证" class="down-label">
                <div class="downBox">
                  <img :src="props.row.supplierLicense" alt />
                  <span class="mask">
                    <span
                      class="mask-icon1"
                      @click="previewInfo(props.row.supplierLicense)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                  </span>
                </div>
              </el-form-item>
              <el-form-item label="投入品照片" class="down-label">
                <div class="downBox">
                  <img :src="props.row.picture" alt />
                  <span class="mask">
                    <span
                      class="mask-icon1"
                      @click="previewInfo(props.row.picture)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                  </span>
                </div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index" width="140"></el-table-column>
        <el-table-column label="投入品名称" prop="name"></el-table-column>
        <el-table-column label="投入品类型" prop="type"></el-table-column>
        <el-table-column label="生产日期" prop="produceDate"></el-table-column>
        <el-table-column label="到期时间" prop="shelfDate"></el-table-column>
        <el-table-column label="操作" width="143">
          <template slot-scope="scope">
            <el-row :gutter="15">
              <el-col :span="11"
                ><el-button size="mini" @click="editSupplyEvent(scope.row.id)"
                  >编辑</el-button
                ></el-col
              >
              <el-col :span="11"
                ><el-button size="mini" type="danger" @click="removeSupply(scope.row.id)">删除</el-button></el-col
              >
            </el-row>
          </template>
        </el-table-column>

        <!-- <ThePagination :toPagination="paginationInfo"></ThePagination> -->
      </TheCardAll>
      <ThePagination
        :toPagination="paginationInfo"
        @fatherMethod="paginationChangeEvent"
      ></ThePagination>
    </el-card>
    <!-- 添加信息 -->
    <TheDialogAll :toDialogInfo="toDialogSupply" :FormInfo="addSupplyInfo">
      <TheDialogLayout>
        <el-form-item label="投入品名称" prop="name" slot="pre">
          <el-input
            placeholder="请输入投入品名称"
            v-model="addSupplyInfo.name"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="检验人名称" prop="inspector" slot="after">
          <el-input
            placeholder="请输入投入品名称"
            v-model="addSupplyInfo.inspector"
            clearable
          ></el-input>
        </el-form-item>
      </TheDialogLayout>
      <TheDialogLayout>
        <el-form-item label="生产日期" prop="produceDate" slot="pre">
          <el-date-picker
            v-model="addSupplyInfo.produceDate"
            type="datetime"
            placeholder="选择生产日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="到期时间" prop="shelfDate" slot="after">
          <el-date-picker
            v-model="addSupplyInfo.shelfDate"
            type="datetime"
            placeholder="选择到期时间时间"
          ></el-date-picker>
        </el-form-item>
      </TheDialogLayout>
      <TheDialogLayout>
        <el-form-item label="规格(mm)" prop="specification" slot="pre">
          <el-input
            placeholder="请输入投入品规格"
            v-model="addSupplyInfo.specification"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="投入品类型" slot="after" prop="type">
          <el-select
            v-model="addSupplyInfo.type"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in typeOption"
              :key="item.id"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </TheDialogLayout>
      <TheDialogLayout>
        <el-form-item label="供应商姓名" prop="supplierName" slot="pre">
          <el-input
            placeholder="请输入供应商名称"
            v-model="addSupplyInfo.supplierName"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商电话" prop="supplierPhone" slot="after">
          <el-input
            placeholder="请输入供应商电话"
            v-model="addSupplyInfo.supplierPhone"
            clearable
          ></el-input>
        </el-form-item>
      </TheDialogLayout>
      <TheDialogLayout>
        <el-form-item label="供应商地址" prop="supplierAddress" slot="pre">
          <el-input
            placeholder="请输入供应商地址"
            v-model="addSupplyInfo.supplierAddress"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="投入品成分" prop="ingredient" slot="after">
          <el-input
            placeholder="请输入投入品成分"
            clearable
            v-model="addSupplyInfo.ingredient"
          ></el-input>
        </el-form-item>
      </TheDialogLayout>
      <el-row>
        <el-col :span="4">供应商生产许可证</el-col>
        <el-col :span="5">
          <el-upload
            action="https://www.baidu.com/"
            ref="upload"
            class="addBox"
          >
            <i class="el-icon-plus"></i> </el-upload
        ></el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="4">投入品成分</el-col>
        <el-col :span="5"
          ><el-upload
            action="http://106.75.154.40:9011/base/addPic"
            list-type="picture-card"
            :auto-upload="true"
            ref="upload"
            class="addBox"
          >
            <i class="el-icon-plus"></i> </el-upload
        ></el-col>
      </el-row> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="toDialogSupply.dialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="addSupplise">确 定</el-button>
      </span>
    </TheDialogAll>
    <!-- 编辑信息 -->
    <editSupply :toDialogInfo="toDialogEditInfo" @fatherMethod="getAllSupplInfo"></editSupply>
    <!-- <TheDialogAll :toDialogInfo="toDialogEditInfo"></TheDialogAll> -->
    <el-dialog :visible.sync="isPreview">
      <img :src="previewImg" alt class="previewImg" />
    </el-dialog>
  </div>
</template>

<script>
import TheCardAll from "../../components/ccy/TheCardAll";
import TheCardHead from "../../components/ccy/TheCardHead";
import ThePagination from "../../components/ccy/ThePagination";
import TheDialogAll from "../../components/ccy/TheDialogAll";
import TheDialogLayout from "../../components/ccy/TheDialogLayout";
import TheInfoSupplyLayout from "../../components/ccy/TheInfoSupplyLayout";
import editSupply from "../../components/ccy/InfoSupply/editSupply"

export default {
  name: "Suppliesinfo",
  data() {
    return {
      allSupplyList: [],
      toDialogSupply: {
        title: "添加投入品来源信息",
        dialogVisible: false,
        addeForm: this.addSupplyInfo,
        FormRules: {
          name: [
            { required: true, message: "请输入投入品名称", trigger: "blur" },
          ],
          produceDate: [
            { required: true, message: "请输入生产日期", trigger: "blur" },
          ],
          shelfDate: [
            { required: true, message: "请输入到期时间", trigger: "blur" },
          ],
          supplierName: [
            { required: true, message: "请输入供应商名称", trigger: "blur" },
          ],
          supplierPhone: [
            { required: true, message: "请输入供应商电话", trigger: "blur" },
            {
              min: 8,
              max: 11,
              message: "长度在 8 到 11 个字符",
              trigger: "blur",
            },
          ],
          supplierAddress: [
            { required: true, message: "请输入供应商地址", trigger: "blur" },
          ],
          specification: [
            { required: true, message: "请输入规格", trigger: "blur" },
          ],
        },
      },
      paginationInfo: {
        total: 0,
        size: 3,
        page: 1,
        // sizeGroup:[4,6,8,10]
      },
      // 放大图片路径
      previewImg: "",

      // 控制放大面板的显示和隐藏
      isPreview: false,
      addSupplyInfo: {
        // baseId:'1248910886228332544',
        // // gmtCreate:'',
        // // gmtModified:''
        // inWeight:'',         //剩余重量
        // operatorIdentity:'', //操作人
        // operatorName:'',     //操作人姓名
        // supplyName:'' ,       //投入品名称
        // supplyTypeName:'',    //投入品类型
        // warehouseNumber:''    //仓库号
        // id: "1352228355463303169",
        ingredient: "", //投入品成分
        inspector: "", //检验人
        name: "", //投入品名称
        picture: "", //投入品照片
        produceDate: "", //生产日期
        shelfDate: "", //保质期
        specification: 0, //规格
        supplierAddress: "", //供应商地址
        supplierLicense: "", //供应商许可证
        supplierName: "", //供应商姓名
        supplierPhone: "", //供应商电话
        type: "", //投入品编号 1鱼料 2饲料
        gmtCreate: "", //创造时间
      },
      typeOption: [
        {
          id: 1,
          name: "鱼料",
        },
        {
          id: 2,
          name: "饲料",
        },
      ],
      //修改投入品信息
      edifSupplyInfo: {
        id: "",
      },
      toDialogEditInfo: {
        title: "修改投入品信息",
        dialogVisible: false,
      },
    };
  },
  components: {
    TheCardAll,
    ThePagination,
    TheDialogAll,
    TheDialogLayout,
    TheInfoSupplyLayout,
    // LoginVue,
    TheCardHead,
    editSupply,
  },
  created() {
    this.getAllSupplInfo();
  },
  methods: {
    // 添加投入品
    async addSupplise() {
      let date = new Date();
      this.addSupplyInfo.specification = parseInt(
        this.addSupplyInfo.specification
      );
      console.log(this.addSupplyInfo.specification);
      this.addSupplyInfo.gmtCreate = this.timeFormat(date);
      this.addSupplyInfo.produceDate = this.timeFormat(
        this.addSupplyInfo.produceDate
      );
      this.addSupplyInfo.shelfDate = this.timeFormat(
        this.addSupplyInfo.shelfDate
      );
      console.log(this.addSupplyInfo);
      if (this.addSupplyInfo.type == "鱼料") {
        this.addSupplyInfo.type = 1;
      } else {
        this.addSupplyInfo.type = 2;
      }
      console.log(this.addSupplyInfo);
      const { data: res } = await this.$supplyController.post(
        "",
        this.addSupplyInfo
      );
      if (res.statusCode === 20000) {
        this.$message.success("添加投入品成功");
        this.toDialogSupply.dialogVisible = false;
        this.getAllSupplInfo();
      }
      console.log(res);
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
    async getAllSupplInfo() {
      // allSupplyList
      console.log(this.paginationInfo);
      const { data: res } = await this.$supplyController.get(
        `${this.paginationInfo.size}/${this.paginationInfo.page}`
      );
      this.allSupplyList = res.data.records;
      this.paginationInfo.total = res.data.total;
      console.log(res);
    },
    editSupplyEvent(id) {
      this.toDialogEditInfo.dialogVisible = true
      this.toDialogEditInfo.id = id
    },
    /* 图片相关的方法 */
    // 查看资料放大图片
    previewInfo(src) {
      this.isPreview = true;
      this.previewImg = src;
    },
    // 放大图片
    preview(Pic) {
      this.isPreview = true;
      this.previewImg = Pic;
    },
    // 分页组件事件
    paginationChangeEvent(size, page) {
      this.paginationInfo.size = size;
      this.paginationInfo.page = page;
      this.getAllSupplInfo();
    },
    //删除事件
    async removeSupply(id){
      const confirmResult = await this.$confirm(
        '此操作将永久删除该投入品信息, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
        // .catch 用于捕获错误返回给confirmResult
      ).catch((err) => {
        return err
      })
      if (confirmResult !== 'confirm') {
        // this.$message.info: 灰色提示框
        return this.$message.info('已取消删除')
      }
      const {data : res} = await this.$supplyController.delete(`${id}`)
      if(res.statusCode === 20000){
        this.$message.success('已成功删除该投入品信息')
        this.getAllSupplInfo()
      }
    }
  },
};
</script>

<style lang="less">
.down-label {
  .el-form-item__label {
    color: #99a9bf;
    font-weight: bold;
  }
  // img {
  //   width: 100%;
  //   height: 100%;
  // }
}
.containter{
  height: 1700px;
}
</style>