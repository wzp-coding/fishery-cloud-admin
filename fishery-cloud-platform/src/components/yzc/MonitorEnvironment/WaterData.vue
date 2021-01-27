<template>
    <div>
        <el-card shadow="never" style="border:0">
        <!--头部区域 标题and按钮 start-->
        <el-row :gutter="30" class="globalHeader" style="margin-bottom:20px;padding-bottom:45px">
        <el-col :span="21">
             <div class="grid-content bg-purple">
                <i class="el-icon-s-custom"></i>
                <span>水质数据</span>
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
                <el-form-item label="溶解氧 %">
                    <el-input v-model="addeForm.dissolvedOxygen"></el-input>
                </el-form-item>
                <el-form-item label="电导率 (μS/cm)">
                    <el-input v-model="addeForm.conductivity"></el-input>
                </el-form-item>
                <el-form-item label="藻密度 cells/L">
                    <el-input v-model="addeForm.algalDensity"></el-input>
                </el-form-item>
                <el-form-item label="叶绿素α mg/L">
                    <el-input v-model="addeForm.chlorophyll"></el-input>
                </el-form-item>
                <el-form-item label="氨氮 %">
                    <el-input v-model="addeForm.ammoniaNitrogen"></el-input>
                </el-form-item>
                <el-form-item label="水质传感器工作状态">
                    <el-select v-model="addeForm.waterQualityWorking" placeholder="请选择">
                        <el-option v-for="item in Wqstatus" :key="item.value" :label="item.text" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="压力传感器状态">
                    <el-select v-model="addeForm.pressureSensorStatus" placeholder="请选择">
                        <el-option v-for="item in PSstatus" :key="item.value" :label="item.text" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="浮球阀状态">
                    <el-select v-model="addeForm.floatValveStatus" placeholder="请选择">
                        <el-option v-for="item in FVstatus" :key="item.value" :label="item.text" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="总氮 mg/L">
                    <el-input v-model="addeForm.nitrogen"></el-input>
                </el-form-item>
                <el-form-item label="高猛酸盐指数 mg/L">
                    <el-input v-model="addeForm.permanganateIndex"></el-input>
                </el-form-item>
                <el-form-item label="PH值 PH">
                    <el-input v-model="addeForm.phValue"></el-input>
                </el-form-item>
                <el-form-item label="总磷 mg/L">
                    <el-input v-model="addeForm.phosphorus"></el-input>
                </el-form-item>
                <el-form-item label="浊度 NTU">
                    <el-input v-model="addeForm.turbidity"></el-input>
                </el-form-item>
                <el-form-item label="水位 m">
                    <el-input v-model="addeForm.waterLevel"></el-input>
                </el-form-item>
                <el-form-item label="水温 ℃">
                    <el-input v-model="addeForm.waterTemperature"></el-input>
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
                <el-form-item label="溶解氧 %">
                    <el-input v-model="editForm.dissolvedOxygen"></el-input>
                </el-form-item>
                <el-form-item label="电导率 (μS/cm)">
                    <el-input v-model="editForm.conductivity"></el-input>
                </el-form-item>
                <el-form-item label="藻密度 cells/L">
                    <el-input v-model="editForm.algalDensity"></el-input>
                </el-form-item>
                <el-form-item label="叶绿素α mg/L">
                    <el-input v-model="editForm.chlorophyll"></el-input>
                </el-form-item>
                <el-form-item label="氨氮 %">
                    <el-input v-model="editForm.ammoniaNitrogen"></el-input>
                </el-form-item>
                <el-form-item label="水质传感器工作状态">
                    <el-select v-model="editForm.waterQualityWorking" placeholder="请选择">
                        <el-option v-for="item in Wqstatus" :key="item.value" :label="item.text" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="压力传感器状态">
                    <el-select v-model="editForm.pressureSensorStatus" placeholder="请选择">
                        <el-option v-for="item in PSstatus" :key="item.value" :label="item.text" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="浮球阀状态">
                    <el-select v-model="editForm.floatValveStatus" placeholder="请选择">
                        <el-option v-for="item in FVstatus" :key="item.value" :label="item.text" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="总氮 mg/L">
                    <el-input v-model="editForm.nitrogen"></el-input>
                </el-form-item>
                <el-form-item label="高猛酸盐指数 mg/L">
                    <el-input v-model="editForm.permanganateIndex"></el-input>
                </el-form-item>
                <el-form-item label="PH值 PH">
                    <el-input v-model="editForm.phValue"></el-input>
                </el-form-item>
                <el-form-item label="总磷 mg/L">
                    <el-input v-model="editForm.phosphorus"></el-input>
                </el-form-item>
                <el-form-item label="浊度 NTU">
                    <el-input v-model="editForm.turbidity"></el-input>
                </el-form-item>
                <el-form-item label="水位 m">
                    <el-input v-model="editForm.waterLevel"></el-input>
                </el-form-item>
                <el-form-item label="水温 ℃">
                    <el-input v-model="editForm.waterTemperature"></el-input>
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
                          <el-form-item label="藻密度"><span>{{scope.row.algalDensity }} {{scope.row.algalDensityUnit }}</span></el-form-item>
                          <el-form-item label="氨氮"><span>{{scope.row.ammoniaNitrogen}} {{scope.row.ammoniaNitrogenUnit}}</span></el-form-item>
                          <el-form-item label="叶绿素α"><span>{{scope.row.chlorophyll}} {{scope.row.chlorophyllUnit}}</span></el-form-item>
                          <el-form-item label="电导率"><span>{{scope.row.conductivity}} {{scope.row.conductivityUnit}}</span></el-form-item>
                          <el-form-item label="总氮"><span>{{scope.row.nitrogen}} {{scope.row.nitrogenUnit}}</span></el-form-item>
                          <el-form-item label="高猛酸盐指数"><span>{{scope.row.permanganateIndex}} {{scope.row.permanganateIndexUnit}}</span></el-form-item>
                          <el-form-item label="PH值"><span>{{scope.row.phValue}} {{scope.row.phValueUnit}}</span></el-form-item>
                          <el-form-item label="总磷"><span>{{scope.row.phosphorus}} {{scope.row.phosphorusUnit}}</span></el-form-item>
                          <el-form-item label="浊度"><span>{{scope.row.turbidity}} {{scope.row.turbidityUnit}}</span></el-form-item>
                          <el-form-item label="水位"><span>{{scope.row.waterLevel}} {{scope.row.waterLevelUnit}}</span></el-form-item>
                          <el-form-item label="水温"><span>{{scope.row.waterTemperature}} {{scope.row.waterTemperatureUnit}}</span></el-form-item>
                      </el-form>
                  </template>
              </el-table-column>
              <el-table-column prop="id" label="编号"></el-table-column>
              <el-table-column prop="acquisitionTime" label="添加时间">
                  <template slot-scope="scope">
                  <i class="el-icon-time"></i> {{scope.row.acquisitionTime}}
                  </template>
                  </el-table-column>
              <el-table-column prop="equipmentWorking" label="水质传感器工作状态">
              <template slot-scope="scope">
                  <el-tag v-if="scope.row.equipmentWorking == '1'" type="success">工作中</el-tag>
                  <el-tag type="danger" v-else-if="scope.row.equipmentWorking == '0' ">关闭</el-tag>
                  <el-tag type="warning" v-else-if="scope.row.equipmentWorking == '2' ">故障</el-tag>
                  <el-tag type="info" v-else-if="scope.row.equipmentWorking == null">状态未知</el-tag>
                  <el-tag type="info" v-else-if="scope.row.equipmentWorking == '' ">状态未知</el-tag>
              </template>
              </el-table-column>
              <el-table-column prop="floatValveStatus" label="浮球阀状态">
                  <template slot-scope="scope">
                        <el-tag v-if="scope.row.floatValveStatus == '1'" type="success">开启</el-tag>
                        <el-tag type="danger" v-else-if="scope.row.floatValveStatus == '0' ">关闭</el-tag>
                        <el-tag type="info" v-else-if="scope.row.floatValveStatus == null">状态未知</el-tag>
                        <el-tag type="info" v-else-if="scope.row.floatValveStatus == '' ">状态未知</el-tag>
                  </template>
              </el-table-column>
              <el-table-column prop="floatValveStatus" label="压力传感器状态">
                  <template slot-scope="scope">
                        <el-tag v-if="scope.row.pressureSensorStatus == '1'" type="success">开启</el-tag>
                        <el-tag type="danger" v-else-if="scope.row.pressureSensorStatus == '0' ">关闭</el-tag>
                        <el-tag type="info" v-else-if="scope.row.pressureSensorStatus == null">状态未知</el-tag>
                        <el-tag type="info" v-else-if="scope.row.pressureSensorStatus == '' ">状态未知</el-tag>
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
            // 设备的编号
            equipmentId: '',
            baseId:'1248910886228332544',
            // -----------关于添加阈值对话框的属性——start
            // 控制对话框的显示隐藏 默认隐藏
            addDialogVisible: false,
            // 水质传感器状态
            Wqstatus: [
                { value:0, text:'关闭' },
                { value:1, text:'开启' },
                { value:2, text:'故障' }
            ],
            // 压力传感器状态
            PSstatus: [
                { value:0, text:'关闭' },
                { value:1, text:'开启' }
            ],
            // 浮球阀状态
            FVstatus: [
                { value:0, text:'关闭' },
                { value:1, text:'开启' }
            ],
            // 添加表单的数据
            addeForm: {
                acquisitionTime: '',
                algalDensity: '',
                algalDensityUnit: 'cells/L',
                baseId: '',
                ammoniaNitrogen: '',
                ammoniaNitrogenUnit: '%',
                equipmentId: '',
                waterQualityWorking: '',
                chlorophyll: 0,
                chlorophyllUnit: 'mg/L',
                conductivity: '' ,
                conductivityUnit: '(μS/cm)',
                dissolvedOxygen: '',
                dissolvedOxygenUnit: '%' ,
                floatValveStatus: '',
                nitrogen: '',
                nitrogenUnit: 'mg/L',
                permanganateIndex: '',
                permanganateIndexUnit: 'mg/L',
                phValue: '',
                phValueUnit: 'PH',
                phosphorus: '',
                phosphorusUnit: 'mg/L',
                pressureSensorStatus:'',
                turbidity: '',
                turbidityUnit: 'NTU',
                updateTime: '',
                waterTemperature: '',
                waterTemperatureUnit: '℃'
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
        // 获取信息列表
        async getwarningList(id) {
            this.equipmentId = id
            const {data:res} = await this.$waterData.post(`search/${this.page_index}/${this.page_size}`,{
                equipmentId:this.id
            })
            if(res.statusCode!==20000) {
                return this.$message.error('获取设备水质数据失败！')
            }
            this.$message.success('查询成功！')
            this.warningList = res.data.records
            this.page_total = res.data.total
        },
        // 点击显示添加对话框 
        ShowAddDialog() {
            this.addDialogVisible = true
        },
        // 用于添加对话框的确定按钮 点击提交表单并关闭对话框
        async addwarning() {
            this.addeForm.acquisitionTime = this.checkTime(this.addeForm.acquisitionTime)
            this.addeForm.equipmentId = this.equipmentId
            this.addeForm.baseId = this.baseId
            console.log(this.addeForm);
            const {data:res} = await this.$waterData.post('',this.addeForm)
            console.log(res);
            if(res.statusCode!==20000) {
                this.addDialogClosed()
                this.addDialogVisible = false
                return this.$message.error('添加失败！')
            }
            this.getwarningList()
            this.$message.success('添加成功！')
            this.addDialogClosed()
            this.addDialogVisible = false
        },
        // 监听添加对话框的关闭事件,关闭时对表单进行重置 并清除第一个选项 即addForm.channelName中的数据
        addDialogClosed() {
        // 表单方法：resetFields：对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
            this.$refs.addeFormRef.resetFields()
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