<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>对虾管理</el-breadcrumb-item>
      <el-breadcrumb-item>投入品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <TheCardAll>
        <div slot="CardTitle">
          <el-col :span="4">
            <i class="el-icon-folder"></i>
            <span>投入品管理</span>
          </el-col>
          <el-col style="width: 100px; float: right">
            <!-- 类型分类开始 -->
            <el-dropdown>
              <el-button size="medium">
                <span>1</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>1</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- 类型分类结束 -->
          </el-col>
          <el-col style="width: 100px; float: right">
            <el-button
              type="primary"
              @click="toDialogSupply.dialogVisible = true"
              >添加信息</el-button
            >
          </el-col>
        </div>
        <div slot="cardExpand">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" label-width="170px">
                <el-row style="margin-bottom: 0">
                  <el-col :span="12">
                    <el-form-item label="投入品名称" class="down-label">
                      <span>{{ props.row.suppliesName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="投入品 ID" class="down-label">
                      <span>{{ props.row.id }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-bottom: 0">
                  <el-col :span="12">
                    <el-form-item label="生产日期" class="down-label">
                      <span>{{ props.row.productDate }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="到期时间" class="down-label">
                      <span>{{ props.row.shelfDate }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-bottom: 0">
                  <el-col :span="12">
                    <el-form-item label="规格(mm)" class="down-label">
                      <span>{{ props.row.specification }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="投入品类型" class="down-label">
                      <span>{{ props.row.type }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-bottom: 0">
                  <el-col :span="12">
                    <el-form-item label="供应商名称" class="down-label">
                      <span>{{ props.row.supplierName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="供应商地址" class="down-label">
                      <span>{{ props.row.supplierAddr }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="联系人" class="down-label">
                      <span>{{ props.row.inspector }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="供应商电话" class="down-label">
                      <span>{{ props.row.supplierPhone }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
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
                    <img :src="props.row.suppliesPic" alt />
                    <span class="mask">
                      <span
                        class="mask-icon1"
                        @click="previewInfo(props.row.suppliesPic)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                    </span>
                  </div>
                </el-form-item>
                <el-form-item label="产品成分" class="down-label">
                  <div class="downBox">
                    <img :src="props.row.ingredient" alt />
                    <span class="mask">
                      <span
                        class="mask-icon1"
                        @click="previewInfo(props.row.ingredient)"
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
        </div>
        <div slot="ordinary">
          <el-table-column
            label="投入品名称"
            prop="suppliesName"
            width="207"
          ></el-table-column>
          <el-table-column
            label="投入品类型"
            prop="type"
            width="160"
          ></el-table-column>
          <el-table-column
            label="生产日期"
            prop="productDate"
            width="270"
          ></el-table-column>
          <el-table-column
            label="到期时间"
            prop="shelfDate"
            width="270"
          ></el-table-column>
          <el-table-column label="操作" width="143">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row)"
                :disabled="!permissionVisable.traceability_inputs_update"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"
                :disabled="!permissionVisable.traceability_inputs_delete"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </div>
        <ThePagination
          slot="pagination"
          :toPagination="paginationInfo"
        ></ThePagination>
      </TheCardAll>
    </el-card>
    <TheDialogAll :toDialogInfo="toDialogSupply" :FormInfo="addSupplyInfo">
      <TheDialogLayout>
        <el-form-item label="投入品名称" prop="name" slot="pre">
          <el-input
            placeholder="请输入投入品名称"
            v-model="addSupplyInfo.name"
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
      </TheDialogLayout>
      <el-row>
        <el-col :span="4">供应商生产许可证</el-col>
        <el-col :span="5">
          <el-upload
            action="http://106.75.154.40:9011/base/addPic"
            list-type="picture-card"
            :auto-upload="true"
            ref="upload"
            class="addBox"
          >
            <i class="el-icon-plus"></i> </el-upload
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="4">投入品照片</el-col>
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
      </el-row>
      <el-row>
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
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="toDialogSupply.dialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="addSupplise">确 定</el-button>
      </span>
    </TheDialogAll>
  </div>
</template>

<script>
import TheCardAll from "../components/ccy/TheCardAll";
import TheCardHead from "../components/ccy/TheCardHead";
import ThePagination from "../components/ccy/ThePagination";
import TheDialogAll from "../components/ccy/TheDialogAll";
import TheDialogLayout from "../components/ccy/TheDialogLayout";
export default {
  name: "Suppliesinfo",
  data() {
    return {
      toDialogSupply: {
        title: "添加投入品来源信息",
        dialogVisible: true,
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
        size: 4,
        currentPage: 1,
        // sizeGroup:[4,6,8,10]
      },
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
        ingredient: "", //投入品成分
        inspector: "", //检验人
        name: "", //投入品名称
        picture: "", //投入品照片
        produceDate: "", //生产日期
        shelfDate: "", //保质期
        specification: "", //规格
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
    };
  },
  components: {
    TheCardAll,
    ThePagination,
    TheDialogAll,
    TheDialogLayout,
  },
  created() {},
  methods: {
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
  },
};
</script>

<style>
</style>