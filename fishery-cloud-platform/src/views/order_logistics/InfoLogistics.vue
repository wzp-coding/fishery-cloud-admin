<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>订单物流</el-breadcrumb-item>
      <el-breadcrumb-item>物流信息</el-breadcrumb-item>
      <el-breadcrumb-item v-if="!crad">站点管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row
        class="globalHeader"
        style="margin-bottom: 20px; padding-bottom: 45px"
      >
        <el-col :span="4">
          <i class="el-icon-document"></i>
          <span v-if="crad">物流信息</span>
          <span v-if="!crad">站点管理</span>
        </el-col>
      </el-row>
    <!-- 卡片视图区域 -->
    <el-tabs type="border-card" @tab-click="changes()">
      <el-tab-pane label="物流信息">
      <!-- 物流信息列表区域 -->
      <el-table :data="logisticsList" border stripe>
        <!-- border： 加入边框线 -->
        <!-- type="index"： 索引列 -->
        >
        <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-row :gutter="10">
            <el-col >
              <el-form-item label="基地id">
                <span>{{props.row.baseId}}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="订单物流id">
                <span>{{props.row.id}}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="创建时间">
                <span>{{props.row.gmtCreate}}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="修改时间">
                <span>{{props.row.gmtModified}}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="起点站">
                <span>{{props.row.logisticsStartStation.logisticsStationAddress}}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="终点站">
                <span>{{props.row.logisticsArrivalStation.logisticsStationAddress}}</span>
              </el-form-item>
            </el-col>
            </el-row>
        </el-form>
      </template>
    </el-table-column>
        <el-table-column
          prop="logisticsOrderCreateBy"
          label="创建人"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="logisticsOrderStatus"
          :formatter="logisticsType"
          label="物流状态"
          width="120"
        ></el-table-column>
         <el-table-column
          prop="logisticsStartStation.logisticsStationAddress"
          label="起点站"
          width="200"
        ></el-table-column>
         <el-table-column
          prop="logisticsArrivalStation.logisticsStationAddress"
          label="终点站"
          width="200"
        ></el-table-column>
         <el-table-column
          prop="gmtCreate"
          label="创建时间"
          width="100"
        ></el-table-column>

        <el-table-column label="操作" width="350px">
          <template slot-scope="scope">
             <el-row :gutter="30">
            <el-col :span="4">
              <!-- 修改按钮 -->
              <el-tooltip
              effect="dark"
              content="修改订单"
              placement="top"
              :enterable="false"
            >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row)"
            ></el-button>
              </el-tooltip>
            </el-col>
            <!-- 查看物流信息 -->
            <el-col :span="4">
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
                @click="toShowLogisticsInfo(scope.row.id)"
              ></el-button>
            </el-tooltip>
            </el-col>
            <!-- 进站操作 -->
            <el-col :span="4">
            <el-tooltip
              effect="dark"
              content="进站"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-caret-bottom"
                size="mini"
                @click="InopenStationVisible(scope.row.id)"
              ></el-button>
            </el-tooltip>
            </el-col>
            <!-- 出站操作 -->
            <el-col :span="4">
            <el-tooltip
              effect="dark"
              content="出站"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-caret-top"
                size="mini"
                @click="OutsetStation(scope.row.id)"
              ></el-button>
            </el-tooltip>
            </el-col>
            <!-- 删除按钮 -->
            <el-col :span="4">
              <el-tooltip
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deletelogistics(scope.row.id)"
              ></el-button>
            </el-tooltip>
            </el-col>
             </el-row>
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
      </el-tab-pane>
      
     <el-tab-pane label="站点管理">
       <div style="width: 75px; float: right;padding:0 30px 10px 0">
          <el-button type="primary" style=" " @click="createstation()">创建站点</el-button>
        </div>
      <!-- 物流信息列表区域 -->
      <el-table :data="stationList" border stripe>
        <!-- border： 加入边框线 -->
        <!-- type="index"： 索引列 -->
        >
        <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-row :gutter="10">
            <el-col>
              <el-form-item label="位置">
                <span>{{props.row.logisticsStationAddress}}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="电话：">
                <span>{{props.row.phoneNumber}}</span>
              </el-form-item>
            </el-col>
            <el-col >
              <el-form-item label="基地id">
                <span>{{props.row.baseId}}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="站点id">
                <span>{{props.row.id}}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="创建时间">
                <span>{{props.row.gmtCreate}}</span>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="修改时间">
                <span>{{props.row.gmtModified}}</span>
              </el-form-item>
            </el-col>            
            </el-row>
        </el-form>
      </template>
    </el-table-column>
          <el-table-column
          label="站点地址"
          prop="logisticsStationAddress">
          </el-table-column>
          <el-table-column
            label="电话"
            prop="phoneNumber">
          </el-table-column>
          <el-table-column
            label="类型"
            :formatter="stationjudge"
            prop="logisticsStationType">
          </el-table-column>

        <el-table-column label="操作" width="240px">
          <template slot-scope="scope">
             <el-row :gutter="10">
            <!-- 修改按钮 -->
            <el-col :span="6">
              <el-tooltip
              effect="dark"
              content="修改站点信息"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="Modifystation(scope.row)"
              ></el-button>
            </el-tooltip>
            </el-col>
            <!-- 删除按钮 -->
            <el-col :span="6">
              <el-tooltip
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deletestation(scope.row.id)"
              ></el-button>
            </el-tooltip>
            </el-col>
             </el-row>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange2"
        @current-change="handleCurrentChange2"
        :current-page="pageInfo2.pagenum"
        :page-sizes="[4, 6, 8, 10]"
        :page-size="pageInfo2.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total2"
      >
      </el-pagination>
      </el-tab-pane>
    </el-tabs>
     <Created-logisrics
      :stationcard="stationcard"
      :stationtitle="stationtitle"
      :stationData="stationData"
      :look2="look2"
      @createnotifyParent2="createnotifyParent2"
      >
      </Created-logisrics>
      <ModifyLogistics
      :createdialogVisible="createdialogVisible"
      :id="logisticsId"
      :look="look"
     @createnotifyParent="changeModifyLogistics"
      >
      </ModifyLogistics>
      <Show-info
      :title="title"
      :is-logistics="jugie"
      :dialog-visible="dialogVisible"
      :id="id"
      @notifyParent="ChangeDialogVisible"
    ></Show-info> 

      <StationForm
      @formClose="formClose"
      @InsetStation="InsetStation"
      :stationVisible="stationVisible"
      :title="stationFromtitle"
      >
      </StationForm>
     
  </div>
  
</template>
<script>
import ModifyLogistics from "../../components/cgx/LogisticsOrder/ModifyLogistics"
import ShowInfo from   "../../components/cgx/ManagementOrder/ShowInfo/ShowInfo1";
import StationForm from "../../components/cgx/LogisticsOrder/StationForm"
import CreatedLogisrics from "../../components/cgx/LogisticsOrder/createdLogisrics.vue"
export default {
  components:{
    ModifyLogistics,
    ShowInfo,
    StationForm,
    CreatedLogisrics,
  },
  data(){
    return {
      //创建站点的组件变量
      stationcard:false,
      stationtitle:"",
      stationData:{},
      look2:true,

      stationType:['养殖基地','个人', '企业', '加工厂', '冷库'],
      stationFromtitle:"",
      //控制站点表单
      stationVisible:false,
      //控制物流位置
      dialogVisible:false,
      itMap:false,
      //坐标
      initPoint:{
        lat:"",
        lng:""
      },
      id:"",
      title:"物流位置",
      jugie:true,
      
      look:true,
      createdialogVisible:false,
      logisticsId:"",
      //物流状态
      logisticsJudge:["运输中","已送达"],
      crad:true,
      //站点列表
      stationList:[],
      //物流信息列表
      logisticsList:[],
      baseId:"",
      // 用于控制分页的当前页码和条数
      pageInfo: {
      // 当前页码
      pagenum: 1,
      // 每页显示条数
      pagesize: 10,
      },
       pageInfo2: {
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 10,
      },
      total:null,
      total2:null,
    }
  },
  methods:{
    //删除站点
   async deletestation(id){
      const confirmResult = await this.elConfirm(
        `此操作将永久删除站点, 是否继续?`,
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
      const { data: res } = await this.$logistics.delete(
        `station/${id}`
      );
      if (res.statusCode == 20000) { 
        this.elMessage.success(res.message);
      }
      this.setNode();
    },
    //修改站点
    Modifystation(data){
      console.log("55555555")
      this.stationcard=true
      this.stationtitle = "修改站点信息"
      this.stationData = data
      this.look2 = !this.look2
    },
    //站点创建
    createstation(){
      console.log("222222")
      this.stationcard=true
      this.stationtitle = "添加站点"
      console.log(this.stationcard,this.stationtitle)
    },
    //关闭站点
    createnotifyParent2(){
      this.stationcard = false
      this.setNode();
    },
    //站点判断类型
        stationjudge(rwo){
            return this.stationType[rwo.logisticsStationType]
        },
    //删除
    async deletelogistics(id){
        const confirmResult = await this.elConfirm(
        `此操作将永久删除订单, 是否继续?`,
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
      const { data: res } = await this.$logistics.delete(
        `order/${id}`
      );
      if (res.statusCode == 20000) { 
        this.elMessage.success(res.message);
      }
      this.setNode();
    },
    //入站
    async InsetStation(station){
        const {data : res} = await this.$logistics.put(`path/${this.logisticsId}/${station.id}`)
         console.log("---->",res.data)
       if (res.statusCode == 20000) {
         return this.elMessage.success(res.message);
      }
       else  { 
        return this.elMessage.error("入站失败");
        }
    },
    //出站1
    async OutsetStation(id){
       const confirmResult = await this.elConfirm(
        `是否决定出站`,
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
        return this.elMessage.info("已取消出站");
      }
       const {data : res} = await this.$logistics.get(`path/${id}`)
       console.log("路径-->",res.data)
       if (res.statusCode != 20000) {
         return this.elMessage.error("res.message");
      }
      let stationid = res.data[res.data.length-1].logisticsPathStationId
      this.OutsetStation2(stationid,id)
    },
    //出站2
    async OutsetStation2(stationid,id){
      const {data : res} = await this.$logistics.post(`path/${id}/${stationid}`)
      if (res.statusCode = 20000) {
         return this.elMessage.success(res.message);
      }
      else{
        return this.elMessage.error("出站失败！");
      }
      
    },
    //打开站点from
    InopenStationVisible(id){
      this.logisticsId = id
      this.stationVisible = true
      this.stationFromtitle = "选择入站站点"
    },
    OutopenStationVisible(id){
      this.logisticsId = id
      this.stationVisible = true
      this.stationFromtitle = "选择出站站点"
    },
    //关闭站点form
      formClose(){
      this.stationVisible = false
      },
    //物流信息开
     toShowLogisticsInfo(id){
       console.log("id-->",id)
       this.dialogVisible = true
       this.id = id
    },
    //物流信息关
    ChangeDialogVisible(){
       this.dialogVisible = false
    },

    //打开物流信息修改
    showEditDialog(id){
      this.logisticsId = id
      this.createdialogVisible = true
      this.look = !this.look
      
    },
    //关闭物流信息修改
    changeModifyLogistics(){
      this.createdialogVisible = false;
      this.setNode();
    },
    //获取时间
    theTime(rwo){
      return rwo.gmtCreate.substring(0,10)
    },
    //物流状态判断
    logisticsType(rwo){
      return this.logisticsJudge[rwo.logisticsOrderStatus];
    },
    //改变卡片
    changes(){
      this.crad = !this.crad
      this.setNode()
    },
    // 监听pagesize(每页显示条数)改变事件
    handleSizeChange(newSize) {
      this.pageInfo.pagesize = newSize;
      this.getlogisticsList();
    },
    handleSizeChange2(newSize) {
      this.pageInfo2.pagesize = newSize;
      this.getstationList();
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.pageInfo.pagenum = newPage;
      this.getlogisticsList();
      console.log("222333")
    },
    handleCurrentChange2(newPage) {
      this.pageInfo2.pagenum = newPage;
      this.getstationList();
      console.log("111222")
    },
    //初始化
    setNode(){
      if (this.baseId !== "") {
        this.getlogisticsList()
        this.getstationList()
      } else {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        setTimeout(() => {
          this.baseId = this.$store.state.userInfo.baseId
         this.getlogisticsList()
         this.getstationList()
          loading.close();
        }, 1000);
      }
      
    },
    //获取物流信息列表
     async getlogisticsList(){
      const {data : res} = await this.$logistics.put(
        `order/${this.baseId}/${this.pageInfo.pagenum}/${this.pageInfo.pagesize}`,{"sort": 0,"status": 2}
      );
      console.log("获取物流列表-->",res.data)
       if (res.statusCode !== 20000) {
        return this.$message.error("获取物流信息列表失败！！");
      }
      this.logisticsList = res.data.records
      this.total = res.data.total;
      console.log("物流total-->",res.data.total)
    },
    //获取站点信息列表
    async getstationList(){
      const {data : res} = await this.$logistics.get(
        `station/${this.baseId}/${this.pageInfo2.pagenum}/${this.pageInfo2.pagesize}`
      );
      console.log("res",res)
      console.log("获取站点列表-->",res.data.records)
       if (res.statusCode !== 20000) {
        return this.$message.error("获取站点列表失败！！");
      }
      this.stationList = res.data.records
      this.total2 = res.data.total;
      console.log("站点total-->",res.data.total)
    },
  },
  created(){
    this.baseId = this.$store.state.userInfo.baseId
    this.setNode();
    console.log(this.baseId)
  },
  
}
</script>
<style lang="less" scoped>