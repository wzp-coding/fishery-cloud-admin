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
        <el-table-column type="index"> </el-table-column>
        <el-table-column
          prop=""
          label=""
          width="120"
        ></el-table-column>

        <el-table-column label="操作" width="240px">
          <template slot-scope="scope">
             <el-row :gutter="10">
            <el-col :span="6">
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
              @click="showEditDialog(scope.row.id)"
            ></el-button>
              </el-tooltip>
            </el-col>
            <!-- 修改按钮 -->
            <el-col :span="6">
              <el-tooltip
              effect="dark"
              content="修改物流信息"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-box"
                size="mini"
                @click="delivery(scope.row.id)"
              ></el-button>
            </el-tooltip>
            </el-col>
            <!-- 查看物流信息 -->
            <el-col :span="6">
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
            <el-col :span="6">
            <el-tooltip
              effect="dark"
              content="进站"
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
            <!-- 出站操作 -->
            <el-col :span="6">
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
                @click="111"
              ></el-button>
            </el-tooltip>
            </el-col>
             </el-row>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <Pagination 
      :total="total" 
      @pageChange="pageChange" 
      :page_index="page_index" 
      :page_size="page_size">
      </Pagination>
      </el-tab-pane>
      
     
    </el-tabs>

  </div>
</template>
<script>
import Pagination from "../../components/cgx/public/pagination"
export default {
  components:{
    Pagination
  },
  data(){
    return {
      crad:true,
      //站点列表
      stationList:[],
      //物流信息列表
      logisticsList:[],
      baseId:"",
      // 用于控制分页的当前页码和条数
      page_size:5,
      page_index:1,
      total:0,
    };
  },
  methods:{
    //改变卡片页面
 
    // 页码改变
        pageChange(page) {
          this.page_size = page.pagesize
          this.page_index = page.pageindex
          this.getmyarticle()
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
        `order/${this.baseId}/${this.page_index}/${this.page_size}`,{}
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
        `station/${this.baseId}/${this.pageInfo.pagenum}/${this.pageInfo.pagesize}`
      );
      console.log("res",res)
      console.log("获取站点列表-->",res.data.records)
       if (res.statusCode !== 20000) {
        return this.$message.error("获取站点列表失败！！");
      }
      this.stationList = res.data.records
      // this.total = res.data.total;
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