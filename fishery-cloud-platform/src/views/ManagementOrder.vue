<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>订单物流</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row
        class="globalHeader"
        style="margin-bottom: 20px; padding-bottom: 45px"
      >
        <el-col :span="4">
          <i class="el-icon-document"></i>
          <span>订单管理</span>
        </el-col>
      </el-row>

      <!-- 订单信息列表区域 -->
      <el-table :data="OrderList" border stripe>
        <!-- border： 加入边框线 -->
        <!-- type="index"： 索引列 -->
        >
        <el-table-column type="index"> </el-table-column>
        <!-- <el-table-column
          prop="logisticsId"
          label="物流编号"
          width="180"
        ></el-table-column> -->

        <el-table-column
          prop="customerName"
          label="客户名"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="customerType"
          label="客户类型"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="money"
          label="金额/元"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="weight"
          label="重量/kg"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="createBy"
          label="创建者"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="receiptAddress"
          label="收货地址"
        ></el-table-column>
        <el-table-column label="二维码" width="150">
          <template slot-scope="scope">
            <!-- 物流二维码按钮 -->
            <el-button
              type="primary"
              size="mini"
              @click="logisticsOrcode(scope.row.adultShrimpId)"
              >物流</el-button
            >
            <!-- 溯源二维码按钮 -->
            <el-button
              type="success"
              size="mini"
              @click="originOrcode(scope.row.adultShrimpId)"
              >溯源</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 查看虾苗信息按钮 -->
            <el-tooltip
              effect="dark"
              content="虾苗信息"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-tickets"
                size="mini"
                @click="toShowShrimpInfo(scope.row.shrimpId)"
              ></el-button>
            </el-tooltip>

            <!-- 查看物流信息 -->
            <el-tooltip
              effect="dark"
              content="物流信息"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="success"
                icon="el-icon-truck"
                size="mini"
                @click="
                  toShowLogisticsInfo(scope.row.adultShrimpId)
                "
              ></el-button>
            </el-tooltip>

            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeOrderById(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pagenum"
        :page-sizes="[4, 6, 8, 10]"
        :page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 修改订单信息的对话框 -->
    <el-dialog
      title="修改订单信息"
      :visible.sync="aditDialogVisible"
      width="30%"
      @close="aditDialogClosed"
    >
      <!-- 内容主题区 -->
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="120px"
      >
        <el-form-item label="客户名" prop="customerName">
          <el-input v-model="editForm.customerName"></el-input>
        </el-form-item>
        <el-form-item label="客户类型" prop="customerType">
          <el-select v-model="editForm.customerType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额/元" prop="money">
          <el-input-number
            v-model="editForm.money"
            controls-position="right"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="重量/kg" prop="weight">
          <el-input-number
            v-model="editForm.weight"
            controls-position="right"
            :min="0"
            :max="remain + constWeight"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="操作人" prop="createBy">
          <el-select v-model="editForm.createBy" placeholder="请选择">
            <el-option
              v-for="(item, i) in personInfoList"
              :key="i"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建日期" prop="createDate">
          <el-date-picker
            v-model="editForm.createDate"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="收货地址" prop="receiptAddress">
          <el-input v-model="editForm.receiptAddress"></el-input>
        </el-form-item>
      </el-form>
      <!-- 页脚 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="aditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editOrderInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 展示虾苗信息 或者 物流信息-->
    <show-info
      :title="title"
      :is-logistics="isLogistics"
      :dialog-visible="dialogVisible"
      :id="showInfoId"
      @notifyParent="ChangeDialogVisible"
    ></show-info>

    <!-- 物流二维码 -->
    <el-dialog
      title="物流二维码"
      width="30%"
      :visible.sync="isShowLCode"
      @close="closeCode(1)"
    >
      <div id="lcode" ref="lcode" style="margin: auto"></div>
      <p style="text-align: center; font-size: 20px">
        溯源码 {{ adultShrimpId }}
      </p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowLCode = false">取 消</el-button>
        <el-button type="primary" @click="toLcodeWeb(adultShrimpId)"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 溯源二维码 -->
    <el-dialog
      title="溯源二维码"
      width="30%"
      :visible.sync="isShowOCode"
      @close="closeCode(2)"
    >
      <div id="ocode" ref="ocode" style="margin: auto"></div>
      <p style="text-align: center; font-size: 20px">
        溯源码 {{ adultShrimpId }}
      </p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowOCode = false">取 消</el-button>
        <el-button type="primary" @click="toOcodeWeb(adultShrimpId)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import ShowInfo from "../components/cgx/ShowInfo";
export default {
  components: {
    ShowInfo,
  },
  data() {
    return {
      // 传递给子组件
      title: "虾苗信息",
      isLogistics: false,
      showInfoId: "",
      dialogVisible: false,
      // -----------------------------------
      token: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMzE5OTg5MjAwMjg1MTcxNzEyIiwic3ViIjoi6ICB5p2_IiwiaWF0IjoxNjExMTIyOTE4LCJyb2xlcyI6InVzZXIiLCJleHAiOjE2MTExODMzOTh9.Pg7aUlzkg1ZJ7QsSwdyJDqe5bfJyWMXnWgvHVjZCVcQ",
      // 基地编号
      baseId: "1248910886228332544",
      // 是否显示物流二维码页面
      isShowLCode: false,
      // 是否显示溯源二维码页面
      isShowOCode: false,
      // 用于控制分页的当前页码和条数
      pageInfo: {
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 4,
      },

      // 总条数
      total: 0,

      // 控制修改订单信息对话框的显示和隐藏
      aditDialogVisible: false,

      //   保存重量，用于修改
      constWeight: 0,

      // 保存虾苗剩余量
      remain: 0,

      // 修改表单的验证规则对象
      editFormRules: {
        shrimpBatchName: [
          { required: true, message: "请输入批次名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "虾苗批次名称的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        customerName: [
          { required: true, message: "请输入客户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "客户名的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        money: [{ required: true, message: "请输入金额", trigger: "blur" }],
        weight: [{ required: true, message: "请输入重量", trigger: "blur" }],
        createDate: [
          { required: true, message: "请输入创建日期", trigger: "blur" },
        ],
        receiptAddress: [
          { required: true, message: "请输入收货地址", trigger: "blur" },
        ],
      },

      // 保存客户类型选项·
      options: [
        {
          value: "个人",
          label: "个人",
        },
        {
          value: "企业",
          label: "企业",
        },
      ],

      // 用于存放人员信息
      personInfoList: [],

      // 订单列表
      OrderList: [],

      // 修改：查询到的订单信息
      editForm: {},

      
      // 当前点击订单的城虾id
      adultShrimpId: "",
    };
  },
};
</script>

<style lang="less" scoped>
#lcode,
#ocode {
  height: 250px;
  width: 250px;
  padding: 5px;
  border: 1px solid rgb(161, 161, 161);
  border-radius: 6px;
}
#map {
  width: 100%;
  height: 480px;
}
</style>
