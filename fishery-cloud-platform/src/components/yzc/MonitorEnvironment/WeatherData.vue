<template>
    <div>
        <el-card shadow="never" style="border:0">
        <!--头部区域 标题and按钮 start-->
        <el-row :gutter="30" class="globalHeader" style="margin-bottom:20px;padding-bottom:45px">
        <el-col :span="21">
             <div class="grid-content bg-purple">
                <i class="el-icon-s-custom"></i>
                <span>气象数据</span>
             </div>
        </el-col>
         <el-col :span="3">
             <div class="grid-content bg-purple">
                 <el-button type="primary" @click="ShowAddDialog()" size="mini">上传数据</el-button>
             </div>
         </el-col>
        </el-row>
        <!--头部区域 标题and按钮 end-->

        <!--添加对话框——start-->
        <el-dialog title="上传数据" :visible.sync="addDialogVisible" width="35%" @close="addDialogClosed">
            
            <!--表单内容——start-->
            <el-form :model="addeForm" ref="addeFormRef" label-width="100px">
                <el-form-item label="气温 ℃">
                    <el-input v-model="addeForm.airTemperature"></el-input>
                </el-form-item>
                <el-form-item label="电能 mV">
                    <el-input v-model="addeForm.electricEnergy"></el-input>
                </el-form-item>
                <el-form-item label="工作状态">
                    <el-select v-model="addeForm.equipmentWorking" placeholder="请选择">
                        <el-option v-for="item in status" :key="item.value" :label="item.text" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="湿度 %">
                    <el-input v-model="addeForm.humidity"></el-input>
                </el-form-item>
                <el-form-item label="光照 Lux">
                    <el-input v-model="addeForm.illumination"></el-input>
                </el-form-item>
                <el-form-item label="雨量 mm">
                    <el-input v-model="addeForm.rain"></el-input>
                </el-form-item>
                <el-form-item label="土湿 %">
                    <el-input v-model="addeForm.soilMoisture"></el-input>
                </el-form-item>
                <el-form-item label="土温 ℃">
                    <el-input v-model="addeForm.soilTemperature"></el-input>
                </el-form-item>
                <el-form-item label="风向">
                    <el-input v-model="addeForm.windDirect"></el-input>
                </el-form-item>
                <el-form-item label="风速 m/s">
                    <el-input v-model="addeForm.windSpeed"></el-input>
                </el-form-item>
                <el-form-item label="采集时间">
                    <el-date-picker v-model="addeForm.acquisitionTime" type="datetime" placeholder="选择时间"></el-date-picker>
                </el-form-item>
            </el-form>
            <!--表单内容——end-->

            <!--底部按钮区域——start-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addwarning">确 定</el-button>
            </span>
            <!--底部按钮区域——end-->

        </el-dialog>
        <!--添加对话框——end-->

        <!--修改对话框——start-->
        <el-dialog title="更新数据" :visible.sync="editDialogVisible" width="35%" @close="aditDialogClosed">

            <!--表单内容——start -->
            <el-form :model="editForm" ref="editFormRef" label-width="100px">
                <el-form-item label="气温 ℃">
                    <el-input v-model="editForm.airTemperature"></el-input>
                </el-form-item>
                <el-form-item label="电能 mV">
                    <el-input v-model="editForm.electricEnergy"></el-input>
                </el-form-item>
                <el-form-item label="工作状态">
                    <el-select v-model="editForm.equipmentWorking" placeholder="请选择">
                        <el-option v-for="item in status" :key="item.value" :label="item.text" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="湿度 %">
                    <el-input v-model="editForm.humidity"></el-input>
                </el-form-item>
                <el-form-item label="光照 Lux">
                    <el-input v-model="editForm.illumination"></el-input>
                </el-form-item>
                <el-form-item label="雨量 mm">
                    <el-input v-model="editForm.rain"></el-input>
                </el-form-item>
                <el-form-item label="土湿 %">
                    <el-input v-model="editForm.soilMoisture"></el-input>
                </el-form-item>
                <el-form-item label="土温 ℃">
                    <el-input v-model="editForm.soilTemperature"></el-input>
                </el-form-item>
                <el-form-item label="风向">
                    <el-input v-model="editForm.windDirect"></el-input>
                </el-form-item>
                <el-form-item label="风速 m/s">
                    <el-input v-model="editForm.windSpeed"></el-input>
                </el-form-item>
                <el-form-item label="采集时间">
                    <el-date-picker v-model="editForm.acquisitionTime" type="datetime" placeholder="选择时间"></el-date-picker>
                </el-form-item>
            </el-form>
            <!--表单内容——end-->

            <!--底部按钮区域——start-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editwarningInfo">确 定</el-button>
            </span>
            <!--底部按钮区域——end-->
        </el-dialog>
        <!--修改对话框——end-->

        <!--预警列表区域——start-->
          <el-table :data="warningList" border stripe>
              <el-table-column type="expand">
                  <template slot-scope="scope">
                      <el-form label-position="left" inline class="demo-table-expand">
                          <el-form-item label="光照"><span>{{scope.row.illumination}} {{scope.row.illuminationUnit}}</span></el-form-item>
                          <el-form-item label="电能"><span>{{scope.row.electricEnergy}} {{scope.row.electricEnergyUnit}}</span></el-form-item>
                          <el-form-item label="湿度"><span>{{scope.row.humidity}} {{scope.row.humidityUnit}}</span></el-form-item>
                          <el-form-item label="雨量"><span>{{scope.row.rain}} {{scope.row.rainUnit}}</span></el-form-item>
                          <el-form-item label="土湿"><span>{{scope.row.soilMoisture}} {{scope.row.soiMoistureUnit}}</span></el-form-item>
                          <el-form-item label="土温"><span>{{scope.row.soilTemperature}} {{scope.row.soilTemperatureUnit}}</span></el-form-item>
                          <el-form-item label="风向"><span>{{scope.row.windDirect}} {{scope.row.windDirectUnit}}</span></el-form-item>
                          <el-form-item label="风速"><span>{{scope.row.windSpeed}} {{scope.row.windSpeedUnit}}</span></el-form-item>
                      </el-form>
                  </template>
              </el-table-column>
              <el-table-column prop="id" label="编号"></el-table-column>
              <el-table-column prop="acquisitionTime" label="添加时间">
                  <template slot-scope="scope">
                  <i class="el-icon-time"></i> {{scope.row.acquisitionTime}}
                  </template>
                  </el-table-column>
              <el-table-column prop="equipmentWorking" label="工作状态">
              <template slot-scope="scope">
                  <el-tag v-if="scope.row.equipmentWorking == '1'" type="success">工作中</el-tag>
                  <el-tag type="danger" v-else-if="scope.row.equipmentWorking == '0' ">关闭</el-tag>
                  <el-tag type="warning" v-else-if="scope.row.equipmentWorking == '2' ">故障</el-tag>
                  <el-tag type="info" v-else-if="scope.row.equipmentWorking == null">状态未知</el-tag>
                  <el-tag type="info" v-else-if="scope.row.equipmentWorking == '' ">状态未知</el-tag>
              </template>
              </el-table-column>
              <el-table-column label="操作" width="140px" align="center">
                  <template slot-scope="scope">
                      <el-button type="primary" icon="el-icon-edit" circle @click="showEditDialog(scope.row.id)"></el-button>
                      <el-button type="danger" icon="el-icon-delete" circle @click="deletemessage(scope.row.id)"></el-button>
                  </template>
              </el-table-column>
          </el-table>
        <!--预警列表区域——end-->

        <!--分页区域——start-->
        <Pagination :total="page_total" @pageChange="pageChange"  :page_index="page_index" :page_size="page_size"></Pagination>
        <!--分页区域——end-->
        </el-card>
    </div>
</template>

<script>
// 引入分页组件
import Pagination from '../pagination'
export default {
    components: {
        Pagination
    },
    data() {
        return {
            id:'',
            baseId:'1248910886228332544',
            // -----------关于添加阈值对话框的属性——start
            // 控制对话框的显示隐藏 默认隐藏
            addDialogVisible: false,
            // 状态
            status: [
                { value:0, text:'关闭' },
                { value:1, text:'开启' },
                { value:2, text:'故障' }
            ],
            // 气象设备的：电能，光照，风速，风向，气温，湿度，雨量，土温，土湿
            equipmentOptions: [
                {
                   value: '电能'
                },
                {
                    value: '光照'
                },
                {
                   value: '风速'
                },
                {
                   value: '风向'
                },
                {
                   value: '气温'
                },
                {
                   value: '湿度'
                },
                {
                   value: '雨量'
                },
                {
                   value: '土温'
                },
                {
                   value: '土湿'
                }
            ],
            // 添加表单的数据
            addeForm: {
                acquisitionTime: '',
                airTemperature: '',
                airTemperatureUnit: '℃',
                baseId: '',
                electricEnergy: '',
                electricEnergyUnit: 'mV',
                equipmentId: '',
                equipmentWorking: '',
                humidity: '',
                humidityUnit: '%',
                illumination: '' ,
                illuminationUnit: 'Lux',
                rain: '',
                rainUnit: 'mm' ,
                soilMoisture: '',
                soiMoistureUnit: '%',
                soilTemperature: '',
                soilTemperatureUnit: '℃',
                windDirect: '',
                windDirectUnit: '度',
                windSpeed: '',
                windSpeedUnit: 'm/s'
            },
            // -----------关于添加阈值对话框的属性——end

            // -----------关于编辑阈值参数对话框的属性——start

            // 控制修改预警阈值的对话框显示与隐藏
            editDialogVisible: false,
            // editForm用于存放所修改对象信息
            editForm: {},
            // -----------关于编辑阈值参数对话框的属性——end

            // -----------关于预警列表的属性——start
            // warningList数组 用于存放请求来的预警信息
            warningList:[],
            // -----------关于预警列表的属性——end

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
    methods:{
        // 获取预警信息列表
        async getwarningList(id) {
            const {data:res} = await this.$meteorologicalData.post(`search/${this.page_index}/${this.page_size}`,{
                equipmentId:this.id
            })
            if(res.statusCode!==20000) {
                return this.$message.error('获取设备阈值信息失败！')
            }
            console.log(this.id);
            this.warningList = res.data.records
            this.page_total = res.data.total
        },
        // 添加阈值 点击显示添加阈值对话框 
        ShowAddDialog() {
            this.addDialogVisible = true
        },
        // 用于添加阈值对话框的确定按钮 点击提交表单并关闭对话框
        async addwarning() {
            this.addeForm.acquisitionTime = this.checkTime(this.addeForm.acquisitionTime)
            this.addeForm.equipmentId = this.equipmentId
            this.addeForm.baseId = this.baseId
            const {data:res} = await this.$meteorologicalData.post('',this.addeForm)
            if(res.statusCode!==20000) {
                this.aditDialogClosed()
                return this.$message.error('添加失败！')
            }
            this.getwarningList()
            this.$message.success('添加成功！')
            this.aditDialogClosed()
            this.addDialogVisible = false
        },
        // 监听添加对话框的关闭事件,关闭时对表单进行重置 并清除第一个选项 即addForm.channelName中的数据
        addDialogClosed() {
        // 表单方法：resetFields：对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
            this.$refs.addeFormRef.resetFields()
            this.addeForm.channelName = ''
        },
        // 页码改变
        pageChange(page) {
            this.page_index = page.pageindex
            this.page_size = page.pagesize
            this.getwarningList()
        },
        // 用于编辑按钮 点击展示修改对话框
        async showEditDialog(id) {
            const {data:res} = await this.$meteorologicalData.get(`${id}`)
            this.editForm = res.data
            this.editDialogVisible = true
        },
        // 监听修改对话框的关闭事件 进行重置
        aditDialogClosed() {
            this.$refs.editFormRef.resetFields()
            this.addeForm.channelName = ''
        },
        // editwarningInfo用于修改对话框的确定按钮 点击提交修改信息并关闭对话框
        async editwarningInfo() {
            const {data:res} = await this.$meteorologicalData.put(`${this.editForm.id}`,this.editForm)
            if(res.statusCode!==20000) {
                return this.$message.error('修改信息失败！')
            }
            this.getwarningList()
            this.$message.success('修改成功')
            this.editDialogVisible = false
        },
      // 根据id删除设备
       async deletemessage(id) {
           const confirmResult = await this.$confirm('此操作将永久删除该阈值, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch((err) => {
               return err         
            });
            if (confirmResult !== 'confirm') {
                return this.$message.info('已取消删除')
            }
            const {data:res} = await this.$meteorologicalData.delete(`${id}`)
            if(res.statusCode!==20000) {
           return this.$message.error('删除设备失败！')
          }
            this.$message.success('删除设备成功！')
            this.getwarningList()
        },
        // 格式化时间
        checkTime(date) {
            if (!date) return ''
            date = date.toString()
            const d = new Date(date)
            const month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
            const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
            const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
            const min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
            const sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
            const times = d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec
            console.log(times);
            return times
        },
    }
}
</script>

<style lang="less" scoped>
.formSwitchClass{
  line-height: 25px;
}
.demo-table-expand {
    font-size: 0;
  }
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>