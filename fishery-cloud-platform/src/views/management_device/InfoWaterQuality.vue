<template>
  <div>
    <!--面包区域区域——start-->
    <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
    <!--面包区域区域——end--> 

    <!--卡片视图区域——start-->
    <el-card>

      <!--标题区域——start-->
      <el-row class="globalHeader" style="margin-bottom: 20px; padding-bottom: 45px">
        <el-col :span="22">
          <i class="el-icon-s-platform"></i>
          <span>水质设备</span>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="ShowAddDevice=true" v-auth="'traceability_waterquality_add'">添加设备</el-button>
        </el-col>
      </el-row>
      <!--标题区域——send-->

      <!--主体内容区域——start-->

      <!--添加设备区域——start-->
      <transition name="el-zoom-in-top">
      <InfoWaterQualityAddDevice v-show="ShowAddDevice" :pondList="pondList" v-on:ShowAddDevice='ShowAddDevice=$event' v-on:getequipmentList="getequipmentList"></InfoWaterQualityAddDevice>
      </transition>
      <!--添加设备区域——end-->

      <!--设备信息列表区域——start-->
      <el-row>
          <el-row style="margin-bottom:0">
            <el-col style="font-size:14px; font-weight:bold" :span="15">
              <i class="el-icon-s-order"></i>
              设备数量：{{totalequipment}}台
            </el-col>
            <!--搜索区域——start-->
            <el-col :span="9" :push="3">
              <SearchDevice @getequipmentList="getequipmentList" @searchfor="searchfor($event)" :SearchType="SearchType" :auth="'traceability_waterquality_select'"></SearchDevice>
            </el-col>
            <!--搜索区域——end-->
          </el-row>
          <!--设备信息列表区域——start-->
          <el-row style="margin-bottom:0">
            <el-table :data="equipmentList" border stripe>
            <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
            <el-table-column prop="updateTime" label="添加时间"></el-table-column>
            <el-table-column prop="equipmentName" label="设备名称"></el-table-column>
            <el-table-column prop="username" label="用户名称"></el-table-column>
            <el-table-column prop="baseName" label="基地名称"></el-table-column>
            <el-table-column prop="poodId" label="池塘编号"></el-table-column>
            <el-table-column prop="remarks" label="备注信息"></el-table-column>
            <el-table-column label="操作" width="180px" align="center">
              <template slot-scope="scope">
              <el-tooltip content="修改设备信息">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="editshow(scope.row)" v-auth="'traceability_waterquality_update'"></el-button>
              </el-tooltip>
              <el-tooltip content="修改水质预警阈值"><el-button type="success" icon="el-icon-data-line" size="mini" @click="ToManagementWQW(scope.row.equipmentId)"></el-button></el-tooltip>
              <el-tooltip content="删除设备"><el-button type="danger" icon="el-icon-delete" size="mini" @click="deletedevice(scope.row.id)" v-auth="'traceability_waterquality_delete'"></el-button></el-tooltip>
              </template>
            </el-table-column>
            </el-table>
          </el-row>
          <!--设备信息列表区域——end-->
      </el-row>
      <!--设备信息列表区域——end-->

      <!--修改信息对话框区域——start-->
      <el-dialog title="修改水质信息" :visible.sync="editDialogVisible" width="35%" @close="aditDialogClosed">
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
          <el-form-item label="设备名称" prop="equipmentName"><el-input v-model="editForm.equipmentName"></el-input></el-form-item>
          <el-form-item label="用户名称" prop="username"><el-input v-model="editForm.username"></el-input></el-form-item>
          <el-form-item label="基地名称" prop="baseName"><el-input v-model="editForm.baseName" readonly></el-input></el-form-item>
          <el-form-item label="选择池塘" prop="pondId">
            <el-select v-model="editForm.poodId" placeholder="请选择">
              <el-option v-for="item in pondList" :key="item.pondId" :label="item.name" :value="item.pondId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注信息" prop="remarks"><el-input v-model="editForm.remarks"></el-input></el-form-item>
        </el-form>
        <!--对话框底部按钮——start-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editEquipmentInfo">确 定</el-button>
        </span>
        <!--对话框底部按钮——end-->
      </el-dialog>
      <!--修改信息对话框区域——end-->

        <!--分页区域——start-->
        <Pagination :total="total" @pageChange="pageChange" :page_index="page_index" :page_size="page_size"></Pagination>
        <!--分页区域——end-->

      <!--主体内容区域——end-->
    </el-card>
    <!--卡片视图区域——end-->
  </div>
</template>

<script>
// 引入添加设备子组件
import InfoWaterQualityAddDevice from '../../components/yzc/InfoWaterQuality/InfoWaterQualityAddDevice'
// 引入搜索设备组件
import SearchDevice from '../../components/yzc/SearchDevice.vue'
// 引入分页组件
import Pagination from '../../components/yzc/pagination'
import Breadcrumb from '../../components/public_components/Breadcrumb'
export default {
  components: {
    InfoWaterQualityAddDevice,
    SearchDevice,
    Pagination,
    Breadcrumb
  },
  created() {
    // 获取设备信息
    this.getequipmentList()
    // 将获取到的数据赋值给展示的数组
    this.showinfo()
    // 获取池塘信息
    this.getpondList()
  },
  data() {
    return {
      breadcrumbs:["设备管理","水质设备"],
      SearchType:'水质设备',
      //---------------设备信息列表相关属性——start
      // 水质设备对应的typeId
      typeId: '1',
      // 基地id
      baseId:this.$store.state.userInfo.baseId,
      //equipmentList 存放设备信息
      equipmentList:[],
      // 设备的总数
      totalequipment:'',
      //---------------设备信息列表相关属性——end

      // 控制设备添加卡片的显示与隐藏
      ShowAddDevice: false,

      //---------------设备信息修改相关属性——start
      // 控制修改对话框的显示隐藏
      editDialogVisible: false,
      // 存放修改对象的信息
      editForm: {
        equipmentName:'',
        username: '',
        baseName: '',
        poodId: '',
        remarks: ''
      },
      // 查询表单的验证规则 editFormRules
      editFormRules: {
        equipmentName: [
            { required: true, message: '请输入设备名称', trigger: 'blur' }
          ],
        username: [
            { required: true, message: '请输入用户名称', trigger: 'blur' }
          ],
        baseName: [
            { required: true, message: '请输入基地名称', trigger: 'blur' }
          ],
        poodId: [
            { required: true, message: '请选择池塘', trigger: 'blur' }
          ]
        },
      // 池塘
      pondList:[],
      //---------------设备信息修改相关属性——end

      // -----------关于分页功能的属性——start
      // 当前页码 默认为1
      page_index: 1, 
      // 每页显示条数
      page_size: 5,
      // 总条数
      total: 0,
      // -----------关于分页功能的属性——end

      // 存放搜索到的数据
      searchdate:[]
    }
  },
  methods: {
    // 搜索
    searchfor(info) {
      if(info !== []) {
        this.equipmentList = info
      }else {
        this.getequipmentList()
      }
    },
    // 获取设备信息  
    async getequipmentList() {
      const { data:res } = await this.$equipment.get(`/findAllByBaseId/${this.baseId}/${this.typeId}/${this.page_index}/${this.page_size}`)
      if(res.statusCode !== 20000) {
        return this.elMessage.error('获取设备信息失败！')
      }
      this.equipmentList = res.data.records
      this.total = res.data.total
      this.totalequipment = res.data.total
    },
    // 获取池塘信息
    async getpondList() {
      const {data:res} = await this.$originAxios.get(`http://119.23.218.131:9103/pond/getInfo/${this.baseId}/500/1`)
      if(res.statusCode !== 20000) {
        return this.elMessage.error('获取池塘信息失败！')
      }
      this.pondList = res.data.records
    },
    // 修改数据确定按钮 提交表单
    async editEquipmentInfo() {
      const {data:res} = await this.$equipment.put(`/${this.editForm.id}`,this.editForm)
      if(res.statusCode !== 20000) {
        return this.elMessage.error('修改信息失败！')
      }
      this.elMessage.success('修改成功')
      this.getequipmentList()
      this.editDialogVisible = false
    },
    // 监听修改信息对话框的关闭事件 关闭时重置表单
    aditDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 用于操作中的修改水质预警阈值按钮 跳转到水质预警阈值页面
    ToManagementWQW(id) {
      this.$router.push({
        path:'/management-water-quality-warn',
        query: {
          equipmentId:id
        }
      })
    },
    // 页码改变
    pageChange(page) {
      this.page_size = page.pagesize
      this.page_index = page.pageindex
      this.getequipmentList()
    },
    // 用于显示编辑设备信息按钮
    editshow(info) {
      this.editForm = info
      this.editDialogVisible = true
    },
    // 将获取到的数据赋值给展示的数组
    showinfo() {
      this.searchdate = this.equipmentList
    },
    // 用于设备删除按钮 根据id删除设备
    async deletedevice(id) {
      const confirmResult = await this.elConfirm('此操作将永久删除该设备信息, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      }).catch((err) => {
        return err         
      });
      if (confirmResult !== 'confirm') {
        return this.elMessage.info('已取消删除')
      }
      const {data:res} = await this.$equipment.delete(`/${id}`)
      if(res.statusCode!==20000) {
        return this.elMessage.error('删除设备失败！')
      }
      this.elMessage.success('删除设备成功！')
      this.getequipmentList()
    }
  },
}
</script>

<style lang="less" scoped>
</style>