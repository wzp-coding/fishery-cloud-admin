<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>养殖管理</el-breadcrumb-item>
      <el-breadcrumb-item>农资管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row
      class="globalHeader"
      style="
        margin-bottom: 20px;
        padding-bottom: 45px;
        background-color: #eaedf1;
      "
    >
      <el-col :span="4">
        <i class="el-icon-grape"></i>
        <span>农资管理</span>
      </el-col>
    </el-row>
    <el-tabs type="border-card">
      <el-tab-pane label="入库记录">
        <TheCardAll>
          <div slot="CardTitle">
            <el-col style="width: 100px; float: right; margin-left: 10px">
              <el-button type="primary" @click="toDialogAddInfo.dialogVisible = true">农资入库</el-button>
            </el-col>
            <!-- <el-col style="width: 100px; float: right">
              <el-select >
                <el-option> </el-option>
              </el-select>
            </el-col> -->
          </div>
          <div slot="ordinary">
            <el-table-column type="index"> </el-table-column>
            <!-- <el-table-column
              prop="suppliesName"
              label="农资名称"
            ></el-table-column>
            <el-table-column
              prop="inTime"
              label="入库日期"
              width="180px"
            ></el-table-column>
            <el-table-column prop="inOperator" label="操作人"></el-table-column>
            <el-table-column prop="warehouse" label="仓库号"></el-table-column>
            <el-table-column
              prop="inNumber"
              label="入库数量(kg)"
            ></el-table-column>
            <el-table-column prop="remainNumber" label="剩余数量(kg)">
              <template slot-scope="scope">
                <el-tag type="info" v-if="scope.row.remainNumber > 20">{{
                  scope.row.remainNumber
                }}</el-tag>
                <el-tag type="danger" v-else>{{
                  scope.row.remainNumber
                }}</el-tag>
              </template>
            </el-table-column> -->
            <el-table-column label="操作" width="180px">
              <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  
                ></el-button>
                <!-- 出库按钮 -->
                <el-tooltip
                  effect="dark"
                  content="出库"
                  placement="top"
                  :enterable="false"
                >
                  <el-button
                    type="warning"
                    icon="el-icon-upload2"
                    size="mini"
                    
                  ></el-button>
                </el-tooltip>
                <!-- 删除按钮 -->
                <!-- type="danger": 红色警告按钮 -->
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  
                ></el-button>
              </template>
            </el-table-column>
          </div>
          <ThePagination slot="pagination"></ThePagination>
        </TheCardAll>
      </el-tab-pane>
      <el-tab-pane label="出库记录">
        <TheCardAll :toCardInfo="toCardInfoOut">
          <div slot="CardTitle">
            <el-col style="width: 100px; float: right; margin-bottom: 10px">
              <!-- <el-select v-model="selectType2" @change="typeChange2">
                <el-option
                  v-for="item in type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> -->
            </el-col>
          </div>
          <div slot="ordinary">
            <!-- <el-table-column type="index"> </el-table-column>
            <el-table-column
              prop="suppliesName"
              label="农资名称"
            ></el-table-column>
            <el-table-column
              prop="outTime"
              label="出库日期"
              width="180px"
            ></el-table-column>
            <el-table-column
              prop="outOperator"
              label="操作员"
            ></el-table-column>
            <el-table-column prop="warehouse" label="仓库号"></el-table-column>
            <el-table-column
              prop="outNumber"
              label="出库数量(kg)"
            ></el-table-column> -->
            <el-table-column label="操作" width="180px">
              <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="small"
                ></el-button>
                <!-- 删除按钮 -->
                <!-- type="danger": 红色警告按钮 -->
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                
                ></el-button>
              </template>
            </el-table-column>
          </div>
        </TheCardAll>
      </el-tab-pane>
    </el-tabs>
    <TheDialogAll :toDialogInfo="toDialogAddInfo">
      <el-form-item label="操作者身份" prop="operatorIdentity">
        <el-input v-model="addInfo.operatorIdentity"></el-input>
      </el-form-item>
      <el-form-item label="操作者姓名" prop="operatorName">
        <el-input v-model="addInfo.operatorName"></el-input>
      </el-form-item>
      <el-form-item label="投入品类别" prop="supplyTypeName">
        <el-input v-model="addInfo.supplyTypeName"></el-input>
      </el-form-item>
      <el-form-item label="请输入仓库号" prop="warehouseNumber">
        <el-input v-model="addInfo.warehouseNumber"></el-input>
      </el-form-item>
      <!-- <el-form-item label="">
        <el-input v-model=""></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model=""></el-input>
      </el-form-item> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="toDialogAddInfo.dialogVisible = false">取消</el-button>
        <el-button type="primary" 
        @click="addBaseSupply"
          >确 定</el-button
        >
      </span>
    </TheDialogAll>
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
  data(){
    return {
      baseId:'1248910886228332544',
      baseSupplyList:[],
      paginationInfo:{
        page:1,
        size:3,
        total:0
      },
      addInfo:{
        baseId:1248910886228332544,
        gmtCreate:'',
        inWeight:'',
        operatorIdentity:'',
        operatorName:'',
        supplyId:'',
        supplyName:'',
        supplyTypeName:'',
        warehouseNumber:''
      },
      toDialogAddInfo:{
        title:'农资入库',
        width:'23%',
        dialogVisible:false,
        FormInfo:this.addInfo
      },
      //传入组件的出库记录
      toCardInfoOut:[]
    }
  },
  created(){
    this.getBaseSupplyInfo()
  },
  methods:{
    async getBaseSupplyInfo(){
      const {data: res} = await this.$baseSupply.get(`in/${this.baseId}/${this.paginationInfo.size}/${this.paginationInfo.page}`)
      console.log(res);
    },
    async addBaseSupply(){
      console.log(this.addInfo);
    }
  }
};
</script>

<style>
</style>