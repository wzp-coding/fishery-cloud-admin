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
            <el-button type="primary">添加信息</el-button>
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
  name: "Suppliesinfo",
  data() {
    return {
      // 类型
      typeContent: ["全部"],
      typeOn: "全部",
      // 分页
      pageInfo: {
        pagenum: 1,
        pagesize: 4,
      },
      // 是否放大
      isPreview: false,
      // 放大图片路径
      previewImg: "",
      // 基地id
      baseId: this.defines.baseId,
      // 投入品来源信息
      suppliesInfo: [],
      // 总条数
      total: 0,
      // 是否显示添加弹窗
      isShowAdd: false,
      // 是否显示编辑弹窗
      isShowEdit: false,
      // 分类信息
      valueType: [],
      categoryOptions: [],
      // 添加信息表单
      addForm: {
        // 投入品名称
        suppliesName: "",
        // 生产日期
        productDate: "",
        // 到期时间
        shelfDate: "",
        // 联系人
        inspector: "",
        // 供应商名称
        supplierName: "",
        // 供应商地址
        supplierAddr: "",
        // 供应商电话
        supplierPhone: "",
        // 供应商生产许可证
        supplierLicense: "",
        // 投入品照片
        suppliesPic: "",
        // 产品成分
        ingredient: "",
        // 产品规格
        specification: "",
        // 分类
        type: "",
      },
      // 修改信息弹窗
      editForm: {
        // 投入品名称
        suppliesName: "",
        // 生产日期
        productDate: "",
        // 到期时间
        shelfDate: "",
        // 联系人
        inspector: "",
        // 供应商名称
        supplierName: "",
        // 供应商地址
        supplierAddr: "",
        // 供应商电话
        supplierPhone: "",
        // 供应商生产许可证
        supplierLicense: "",
        // 投入品照片
        suppliesPic: "",
        // 产品成分
        ingredient: "",
        // 产品规格
        specification: "",
        // 分类
        type: "",
      },
      // 修改id
      suppliesinfoId: "",
      // 检验规则
      rules: {
        suppliesName: [
          { required: true, message: "请输入投入品名称", trigger: "blur" },
        ],
        productDate: [
          { required: true, message: "请输入生产日期", trigger: "blur" },
        ],
        shelfDate: [
          { required: true, message: "请输入到期时间", trigger: "blur" },
        ],
        supplierName: [
          { required: true, message: "请输入供应商名称", trigger: "blur" },
        ],
        inspector: [
          { required: true, message: "请输入联系人名称", trigger: "blur" },
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
        supplierAddr: [
          { required: true, message: "请输入供应商地址", trigger: "blur" },
        ],
        specification: [
          { required: true, message: "请输入规格", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    TheCardAll,
    ThePagination,
    TheDialogAll,
  },
};
</script>

<style>
</style>