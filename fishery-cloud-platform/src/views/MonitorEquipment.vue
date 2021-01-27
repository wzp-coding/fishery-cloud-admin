<template>
  <div>
    <!--面包区域区域——start-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>监控设备</el-breadcrumb-item>
    </el-breadcrumb>
    <!--面包区域区域——end--> 

    <el-card>
      <!--标题区域——start-->
      <el-row class="globalHeader" style="margin-bottom: 20px; padding-bottom: 45px">
        <el-col :span="22">
          <i class="el-icon-s-platform"></i>
          <span>监控设备</span>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="ShowAddDevice=true" round>添加设备</el-button>
        </el-col>
      </el-row>
      <!--标题区域——send-->

      <!--添加设备区域——start-->
      <transition name="el-zoom-in-top">
      <MonitorEquipmentAddDevice v-show="ShowAddDevice" v-on:ShowAddDevice='ShowAddDevice=$event'></MonitorEquipmentAddDevice>
      </transition>
      <!--添加设备区域——end-->

      <!--主体内容区域——start-->
      <el-row>
          <el-row style="margin-bottom:0">
            <el-col style="font-size:14px; font-weight:bold" :span="15">
              <i class="el-icon-s-order"></i>
              设备数量：台
            </el-col>
            <el-col :span="9" :push="3">
              <SearchDevice :equipmentList="equipmentList" @searchdate="searchdate = $event"></SearchDevice>
            </el-col>
          </el-row>

          <!--设备信息列表区域——start-->
          <el-row style="margin-bottom:0">
            <el-table :data="equipmentList" border stripe>
            <el-table-column prop="index" label="序号"></el-table-column>
            <el-table-column prop="createDate" label="创建时间"></el-table-column>
            <el-table-column prop="deviceSerial" label="设备序列号"></el-table-column>
            <el-table-column prop="createBy" label="创建者"></el-table-column>
            <el-table-column prop="baseName" label="基地名称"></el-table-column>
            <el-table-column prop="monitoringLocation" label="摄像头监控位置"></el-table-column>
            <el-table-column prop="validateCode" label="设备验证码"></el-table-column>
            <el-table-column prop="status" label="是否溯源"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.switch" active-color="#13ce66" inactive-color="#ff4949" @change="changeCode(scope.row.id, scope.row.statusCode)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
              <el-tooltip content="删除设备"><el-button type="danger" icon="el-icon-delete" circle @click="deletedevice(scope.row.id)"></el-button></el-tooltip>
              </template>
            </el-table-column>
            </el-table>
          </el-row>
          <!--设备信息列表区域——end-->
      </el-row>
      <!--主体内容区域——end-->

      <!--分页区域——start-->
        <!-- <Pagination :total="page_total" @pageChange="pageChange"  :page_index="page_index"></Pagination> -->
      <!--分页区域——end-->
    </el-card>
  </div>
</template>

<script>
import MonitorEquipmentAddDevice from '../components/yzc/MonitorEquipmentAddDevice'
import SearchDevice from '../components/yzc/SearchDevice'
// 引入分页组件
import Pagination from '../components/yzc/pagination'
export default {
  components: {
    MonitorEquipmentAddDevice,
    SearchDevice,
    Pagination
  },
  data() {
    return {
      // 控制添加监控设备卡片的显示隐藏
      ShowAddDevice: false,

      //---------------设备信息列表相关属性——start
      //equipmentList 存放设备信息
      equipmentList:[
        {index:'210',createDate:'2021-1-20',deviceSerial:'8236',createBy:'小明',baseName:'仲恺基地',monitoringLocation: '北楼5号',validateCode:'9861',status:'1'},
        {index:'211',createDate:'2021-1-25',deviceSerial:'7768',createBy:'小来',baseName:'仲恺基地2',monitoringLocation: '南楼6号',validateCode:'9861',status: '0'},
        {index:'212',createDate:'2021-1-28',deviceSerial:'9514',createBy:'小亮',baseName:'仲恺基地3',monitoringLocation: '北楼5号',validateCode:'9861',status: '1'}
      ],
      //---------------设备信息列表相关属性——end

      // -----------关于分页功能的属性——start
      // 当前页码 默认为1
      page_index: 1, 
      //每页显示的条数 默认5
      page_size: 5,
      // total是数据总条数
      page_total: 0,
      // -----------关于分页功能的属性——end
    }
  },
  methods: {
    // 用于设备删除按钮 根据id删除设备
    deletedevice(id) {
      this.$confirm('此操作将永久删除该设备信息, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      }).then(() => {
        this.$message({
        type: 'success',
        message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
        type: 'info',
        message: '已取消删除'
        });          
      });
    },
    // 修改设备的状态 即是否溯源
    changeCode(id,status) {}
    },
    // 页码改变
    pageChange(page) {
      this.page_index = page.page_index
	    this.page_size = page.page_limit
    },
}
</script>

<style lang="less" scoped>
</style>