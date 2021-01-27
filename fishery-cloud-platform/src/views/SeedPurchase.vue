<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>对虾管理</el-breadcrumb-item>
      <el-breadcrumb-item>虾苗进货</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
    <TheCardAll>
      <div slot="CardTitle">
        <el-col :span="4">
          <i class="el-icon-s-help"></i>
          <span>虾苗进货</span>
        </el-col>
        <el-col style="width: 75px; float: right">
          <download-excel
            class="export-excel-wrapper"
            name="虾苗进货信息导出.xls"
          >
            <el-button type="success">导出</el-button>
          </download-excel>
        </el-col>
        <el-col style="float: right; width: 100px; margin-right: 10px">
          <el-button type="primary">添加虾苗</el-button>
        </el-col>
      </div>
      <el-table-column type="expand" slot="cardExpand">
        <template slot-scope="props">
          <el-form label-position="left" label-width="170px">
            <el-row style="margin-bottom: 0">
              <el-col :span="12">
                <el-form-item label="虾苗批次名称" class="down-label">
                  <span>无</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="虾苗品种" class="down-label">
                  <span>无</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 0">
              <el-col :span="12">
                <el-form-item label="虾苗产地" class="down-label">
                  <span>无</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="虾苗供应商" class="down-label">
                  <span>无</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 0">
              <el-col :span="12">
                <el-form-item label="虾苗数量/尾" class="down-label">
                  <span>无</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="剩余数量/尾" class="down-label">
                  <span>无</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 0">
              <el-col :span="12">
                <el-form-item label="产量/kg" class="down-label">
                  <span>无</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="创建者" class="down-label">
                  <span>无</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 0">
              <el-col :span="12">
                <el-form-item label="创建时间" class="down-label">
                  <span>无</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="供应商联系电话" class="down-label">
                  <span>无</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="质检图片" class="down-label">
              <div class="downBox">
                <img :src="props.row.qualityInspection" alt />
                <span class="mask">
                  <span
                    class="mask-icon1"
                    @click="previewInfo(props.row.qualityInspection)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                </span>
              </div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <div slot="ordinary">
        <el-table-column
          prop="shrimpBatchName"
          label="虾苗批次名称"
        ></el-table-column>
        <el-table-column
          prop="shrimpSpecies"
          label="虾苗品种"
        ></el-table-column>
        <el-table-column
          prop="shrimpNumber"
          label="虾苗数量/尾"
        ></el-table-column>
        <el-table-column
          prop="remainNumber"
          label="剩余数量/尾"
        ></el-table-column>
        <el-table-column prop="yield" label="产量kg"></el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
              :disabled="!permissionVisable.traceability_shrimp_update"
            ></el-button>
            <!-- 删除按钮 -->
            <!-- type="danger": 红色警告按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeShrimpById(scope.row.id)"
              :disabled="!permissionVisable.traceability_shrimp_delete"
            ></el-button>
          </template>
        </el-table-column>
      </div>
      <ThePagination slot="pagination"></ThePagination>
    </TheCardAll>
    </el-card>
    <!-- echarts视图 -->
    <el-card style="margin-top: 1rem" v-show="!!ShrimpName">
      <div style="display: flex">
        <div ref="stockChart" style="width: 52%; height: 376px"></div>
        <div ref="outChart" style="width: 45%; height: 376px"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import TheCardAll from "../components/ccy/TheCardAll";
import TheCardHead from "../components/ccy/TheCardHead";
import ThePagination from "../components/ccy/ThePagination";
import TheDialogAll from "../components/ccy/TheDialogAll";
import { mapState } from "vuex";
export default {
  data() {
    return {
      token: window.localStorage.getItem("token"),

    appear:true,
      // 现有的虾类产量
      ShrimpOutValue: [],

      // 现有的虾类品众
      ShrimpName: [],

      // 数值和名称
      ShrimpValue: [],

      // 基地编号
      baseId: this.defines.baseId,

      // 用于存放人员信息
      personInfoList: [],

      // 虾苗列表
      ShrimpList: [],

      // 虾苗品种列表
      ShrimpSpeciesList: [],

      // 查询到的虾苗批次信息对象，用于修改信息
      editForm: {
        id: "",
        shrimpBatchName: "",
        shrimpSpecies: "",
        shrimpOrigin: "",
        shrimpSupplier: "",
        shrimpNumber: "",
        yield: 0,
        baseId: "",
        createBy: "",
        createDate: "",
        remainNumber: 0,
        // 质检图片
        qualityInspection: "",
        // 供应商电话
        supplierPhone: "",
      },

      // 添加虾苗批次的表单数据
      addeForm: {
        // 虾苗批次名称
        shrimpBatchName: "无",
        // 虾苗品种
        shrimpSpecies: "",
        // 虾苗产地
        shrimpOrigin: "",
        // 虾苗供应商
        shrimpSupplier: "",
        // 虾苗数量
        shrimpNumber: "",
        // 基地编号
        baseId: "",
        // 创建者
        createBy: "",
        // 创建时间
        createDate: "",
        // 剩余数量
        remainNumber: "",
        // 质检图片
        qualityInspection: "",
        // 供应商联系电话
        supplierPhone: "",
      },

      // 添加表单的验证规则对象
      addeFormRules: {
        shrimpBatchName: [
          { required: true, message: "请输入虾苗批次名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "虾苗批次名称的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        supplierPhone: [
          { required: true, message: "请输入供应商联系电话", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "供应商联系电话的长度在2~15个字符之间",
            trigger: "blur",
          },
        ],
        shrimpSpecies: [
          { required: true, message: "请输入虾苗品种", trigger: "blur" },
        ],
        shrimpOrigin: [
          { required: true, message: "请输入虾苗产地", trigger: "blur" },
        ],
        shrimpSupplier: [
          { required: true, message: "请输入虾苗供应商", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "虾苗供应商名称的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        shrimpNumber: [
          { required: true, message: "请输入虾苗数量", trigger: "blur" },
        ],
        createBy: [
          { required: true, message: "请输入创建者", trigger: "blur" },
        ],
      },

      // 修改表单的验证规则对象
      editFormRules: {
        shrimpBatchName: [
          { required: true, message: "请输入虾苗批次名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "虾苗批次名称的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        shrimpSpecies: [
          { required: true, message: "请输入虾苗品种", trigger: "blur" },
        ],
        shrimpOrigin: [
          { required: true, message: "请输入虾苗产地", trigger: "blur" },
        ],
        shrimpSupplier: [
          { required: true, message: "请输入虾苗供应商", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "虾苗供应商名称的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        shrimpNumber: [
          { required: true, message: "请输入虾苗数量", trigger: "blur" },
        ],
        createBy: [
          { required: true, message: "请输入创建者", trigger: "blur" },
        ],
        createDate: [
          { required: true, message: "请输入创建时间", trigger: "blur" },
        ],
        yield: [{ required: true, message: "请输入产量", trigger: "blur" }],
      },
      // 放大图片路径
      previewImg: "",

      // 控制放大面板的显示和隐藏
      isPreview: false,

      // 控制添加虾苗的开关
      addDialogVisible: false,

      // 控制修改虾苗信息对话框的显示和隐藏
      aditDialogVisible: false,

      // 用于控制分页的当前页码和条数
      pageInfo: {
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 4,
      },
      // 总条数
      total: 0,

      // 导出表格信息
      json_fields: {
        虾苗批次名称: "shrimpBatchName",
        虾苗品种: "shrimpSpecies",
        虾苗产地: "shrimpOrigin",
        虾苗供应商: "shrimpSupplier",
        供应商电话: "supplierPhone",
        "虾苗数量/尾": "shrimpNumber",
        "剩余数量/尾": "remainNumber",
        产量kg: "yield",
        创建者: "createBy",
        创建时间: "createDate",
      },

      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 ",
          },
        ],
      ],
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