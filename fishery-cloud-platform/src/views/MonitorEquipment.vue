<template>
  <div>
    <!--面包区域区域——start-->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>监控设备</el-breadcrumb-item>
    </el-breadcrumb> -->
    <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
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
      <MonitorEquipmentAddDevice v-show="ShowAddDevice" v-on:ShowAddDevice='ShowAddDevice=$event' @getequipmentList='getequipmentList'></MonitorEquipmentAddDevice>
      </transition>
      <!--添加设备区域——end-->

      <!--主体内容区域——start-->
      <el-row>
          <el-row style="margin-bottom:0">
            <el-col style="font-size:14px; font-weight:bold" :span="15">
              <i class="el-icon-s-order"></i>
              设备数量：{{total}}台
            </el-col>
            <el-col :span="9" :push="3">
              <SearchDevice :equipmentList="equipmentList" @searchdate="searchdate = $event"></SearchDevice>
            </el-col>
          </el-row>

          <!--设备信息列表区域——start-->
          <el-row style="margin-bottom:0">
            <el-table :data="equipmentList" border stripe>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" min-width></el-table-column>
            <el-table-column prop="deviceSerial" label="设备序列号" min-width></el-table-column>
            <el-table-column prop="createBy" label="创建者" min-width></el-table-column>
            <el-table-column prop="baseName" label="基地名称" min-width></el-table-column>
            <el-table-column prop="monitoringLocation" label="摄像头监控位置" min-width></el-table-column>
            <el-table-column prop="validateCode" label="设备验证码" min-width></el-table-column>
            <el-table-column prop="status" label="是否溯源" min-width align="center">
              <template slot-scope="scope">
                  <el-tag v-if="scope.row.statusCode == '1'" type="success">是</el-tag>
                  <el-tag type="danger" v-else-if="scope.row.statusCode == '0' ">否</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100px" align="center">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.statusCode" active-value="1" inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" @change="changeCode(scope.row.id,scope.row.statusCode)"></el-switch>
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

          <!--分页区域——start-->
          <Pagination :total="total" @pageChange="pageChange" :page_index="page_index" :page_size="page_size"></Pagination>
          <!--分页区域——end-->
      </el-row>
      <!--主体内容区域——end-->
    </el-card>
  </div>
</template>

<script>
import MonitorEquipmentAddDevice from '../components/yzc/MonitorEquipmentAddDevice'
import SearchDevice from '../components/yzc/SearchDevice'
// 引入分页组件
import Pagination from '../components/yzc/pagination'
import Breadcrumb from '../components/public_components/Breadcrumb'
export default {
  components: {
    MonitorEquipmentAddDevice,
    SearchDevice,
    Pagination,
    Breadcrumb
  },
  data() {
    return {
      breadcrumbs:["设备管理","监控设备"],
      total:0,
      // 控制添加监控设备卡片的显示隐藏
      ShowAddDevice: false,
      baseId:'1248910886228332544',
      //---------------设备信息列表相关属性——start
      //equipmentList 存放设备信息
      equipmentList:[],
      //---------------设备信息列表相关属性——end

      // -----------关于分页功能的属性——start
      // 当前页码 默认为1
      page_index: 1, 
      // 每页显示条数
      page_size: 5,
      // 总条数
      total: 0,
      // -----------关于分页功能的属性——end
    }
  },
  created() {
    this.getequipmentList()
  },
  methods: {
    // 获取监控设备信息列表
    async getequipmentList() {
      const {data:res} = await this.$base.post(`search/${this.page_index}/${this.page_size}`,{
        baseId: this.baseId
      })
      console.log(res);
      if(res.statusCode!==20000) {
        return this.$message.error('获取监控设备信息列表失败！')
      }
      this.equipmentList = res.data.records
      this.total = res.data.total
    },
    // 添加设备
    async addequipment() {
    },
    // 用于设备删除按钮 根据id删除设备
    async deletedevice(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该设备信息, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      }).catch((err) => {
        return err         
      });
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const {data:res} = await this.$base.delete(`/${id}`)
      if(res.statusCode!==20000) {
        return this.$message.error('删除设备失败！')
      }
      this.$message.success('删除设备成功！')
      this.getequipmentList()
    },
    // 修改设备的状态 即是否溯源
    async changeCode(id,status) {
      await this.$monitor.get(`modify/${id}/${status}`).then(res=> {
        if(res.data.statusCode!==20000) {
          return this.$message.error('修改失败！')
        }
        this.getequipmentList()
        this.$message.success('修改成功！')
      })
    },
    // 页码改变
    pageChange(page) {
      this.page_size = page.pagesize
      this.page_index = page.pageindex
      this.getequipmentList()
    },
    },
}
</script>

<style lang="less" scoped>
</style>