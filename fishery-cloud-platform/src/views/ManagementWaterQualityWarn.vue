<template>
    <div>
        <!-- 面包屑导航区域——start -->
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <!-- 面包屑导航区域——end -->

        <el-card class="box-card">

        <!--头部区域 标题and按钮 start-->
        <el-row :gutter="30" class="globalHeader" style="margin-bottom:20px;padding-bottom:45px">
        <el-col :span="16">
             <div class="grid-content bg-purple">
                <i class="el-icon-s-custom"></i>
                <span>水质预警阀值</span>
             </div>
        </el-col>
         <el-col :span="6" :push="4">
             <div class="grid-content bg-purple">
                 <el-button type="primary" round @click="ShowAddDialog()">添加阈值</el-button>
                 <el-button type="primary" round @click="back()">返回</el-button>
             </div>
         </el-col>
        </el-row>
        <!--头部区域 标题and按钮 end-->

        <!--添加阈值的对话框——start-->
        <el-dialog title="水质预警" :visible.sync="addDialogVisible" width="35%" @close="addDialogClosed">
            
            <!--表单内容——start-->
            <el-form :model="addeForm" :rules="addeFormRules" ref="addeFormRef" label-width="100px">
                <el-form-item label="通道的名称">
                    <el-select v-model="addeForm.channelName" placeholder="请选择通道的名称">
                        <el-option v-for="item in equipmentOptions" :key="item.value" :label="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单位" prop="unit">
                    <el-input v-model="addeForm.unit"></el-input>
                </el-form-item>
                <el-form-item label="最大值" prop="maxValues">
                    <el-input v-model="addeForm.maxValues"></el-input>
                </el-form-item>
                <el-form-item label="最小值" prop="minValues">
                    <el-input v-model="addeForm.minValues"></el-input>
                </el-form-item>
                <el-form-item label="更新时间">
                    <el-date-picker v-model="addeForm.updateDate" type="datetime" placeholder="选择更新时间"></el-date-picker>
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
        <!--添加阈值的对话框——end-->

        <!--修改水质预警阈值设置对话框——start-->
        <el-dialog title="编辑信息" :visible.sync="editDialogVisible" width="35%">

            <!--表单内容——start-->
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
                <el-form-item label="通道的名称">
                    <el-select v-model="editForm.channelName" placeholder="请选择通道的名称">
                        <el-option v-for="item in equipmentOptions" :key="item.value" :label="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单位" prop="unit">
                    <el-input v-model="editForm.unit"></el-input>
                </el-form-item>
                <el-form-item label="最大值" prop="maxValues">
                    <el-input v-model="editForm.maxValues"></el-input>
                </el-form-item>
                <el-form-item label="最小值" prop="minValues">
                    <el-input v-model="editForm.minValues"></el-input>
                </el-form-item>
                <el-form-item label="更新时间">
                    <el-date-picker v-model="editForm.updateDate" type="datetime" placeholder="选择更新时间"></el-date-picker>
                </el-form-item>
            </el-form>
            <!--表单内容——end-->

            <!--底部按钮区域——start-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="aditDialogClosed()">取 消</el-button>
                <el-button type="primary" @click="editwarningInfo">确 定</el-button>
            </span>
            <!--底部按钮区域——end-->
        </el-dialog>
        <!--修改水质预警阈值设置对话框——end-->

        <!--预警列表区域——start-->
        <el-table :data="warningList" border stripe>
            <el-table-column type="index" label="序号" width="50px"> </el-table-column>
            <el-table-column prop="updateDate" label="添加时间" width-min>
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    {{scope.row.updateDate}}
                </template>
            </el-table-column>
            <el-table-column prop="channelName" label="通道的名称" width="180"></el-table-column>
            <el-table-column prop="maxValues" label="最大值" width="120"></el-table-column>
            <el-table-column prop="minValues" label="最小值" width="120"></el-table-column>
            <el-table-column prop="unit" label="单位" width="120"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope" width="200px">
                    <div>
                    <!--状态按钮-->
                    <span style="margin:15px">
                        <el-switch v-model="scope.row.isUse" active-value='1' inactive-value='0' active-color="#13ce66" inactive-color="#ff4949" active-text="启动" inactive-text="关闭"  @change="changeCode(scope.row)"></el-switch>
                    </span>
                    <!--修改参数按钮-->
                    <span style="margin:15px">
                        <el-button type="primary" icon="el-icon-edit" circle @click="showEditDialog(scope.row)"></el-button>
                    </span>
                    <!--删除按钮-->
                    <span style="margin:15px">
                        <el-button type="danger" icon="el-icon-delete" circle @click="deletemessage(scope.row.id)"></el-button>
                    </span>
                    </div>
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
import Pagination from '../components/yzc/pagination'
import Breadcrumb from '../components/public_components/Breadcrumb'
export default {
    components: {
        Pagination,
        Breadcrumb
    },
    data() {
        return {
            breadcrumbs:["设备管理","水质设备","水质预警阈值"],
            equipmentId: '',
            // -----------关于添加阈值对话框的属性——start
            // 控制对话框的显示隐藏 默认隐藏
            addDialogVisible: false,
            // 水质设备的参数：溶解氧、水温、pH、氨氮、电导率、浊度、高猛酸盐指数、总磷、总氮、叶绿素α、藻密度、水位
            equipmentOptions: [
                {value: '溶解氧'},
                {value: '水温'},
                {value: 'pH'},
                {value: '氨氮'},
                {value: '电导率'},
                {value: '浊度'},
                {value: '高猛酸盐指数'},
                {value: '总磷'},
                {value: '总氮'},
                {value: '叶绿素α'},
                {value: '藻密度'},
                {value: '水位'}
            ],
            // 添加表单的数据
            addeForm: {
                channelName: '',
                unit: '',
                maxValues: '',
                minValues: '',
                updateDate: '',
                isUse: '0',
            },
            // 添加表单的验证规则对象
            addeFormRules: {
                channelName: [
                    { required: true, message: '请输入通道的名称', trigger: 'blur' }
                ],
                maxValues: [
                    { required: true, message: '请输入最大值', trigger: 'blur' }
                ],
                minValues: [
                    { required: true, message: '请输入最小值', trigger: 'blur' }
                ],
                unit: [
                    { required: true, message: '请输入单位', trigger: 'blur' }
                ],
                updateDate: [
                    { required: true, message: '请选择时间', trigger: 'blur' }
                ]
            },
            // -----------关于添加阈值对话框的属性——end

            // -----------关于编辑阈值参数对话框的属性——start
            // 控制修改预警阈值的对话框显示与隐藏
            editDialogVisible: false,
            // editForm用于存放所修改对象信息
            editForm: {},
            // 修改预警阈值表单的验证规则
            editFormRules: {
                channelName: [
                    { required: true, message: '请输入通道的名称', trigger: 'blur' }
                ],
                maxValues: [
                    { required: true, message: '请输入最大值', trigger: 'blur' }
                ],
                minValues: [
                    { required: true, message: '请输入最小值', trigger: 'blur' }
                ],
                unit: [
                    { required: true, message: '请输入单位', trigger: 'blur' }
                ],
                updateDate: [
                    { required: true, message: '请选择时间', trigger: 'blur' }
                ]
            },
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
    mounted() {
        this.equipmentId = this.$route.query.equipmentId
        this.getwarningList()
    },
    watch: {
        editForm: function() {
            console.log(this.editForm);
        }
    },
    methods:{
        // 获取预警信息
        async getwarningList() {
            const {data:res} = await this.$warning.post(`search/${this.page_index}/${this.page_size}`,{
                equipmentId:this.equipmentId
            })
            if(res.statusCode!==20000) {
                return this.$message.error('获取信息列表失败！')
            }
            console.log(res.data.records);
            this.warningList = res.data.records
            this.page_total = res.data.total
        },
        // 返回按钮 返回水质设备页面
        back() {
            this.$router.push('/info-water-quality')
        },
        // 添加阈值 点击显示添加阈值对话框 
        ShowAddDialog() {
            this.addDialogVisible = true
        },
        // 用于添加阈值对话框的确定按钮 点击提交表单并关闭对话框
        async addwarning() {
            this.$refs.addeFormRef.validate(async valid => {
                if(!valid) return false
                this.addeForm.equipmentId = this.equipmentId
                this.addeForm.updateDate = this.checkTime(this.addeForm.updateDate)
                const {data:res} = await this.$warning.post('',this.addeForm)
                if(res.statusCode!==20000) {
                    return this.$message.error('添加失败！')
                }
                this.$message.success('添加成功！')
                this.getwarningList()
                this.addDialogVisible = false
            })
        },
        // 监听添加对话框的关闭事件,关闭时对表单进行重置 并清除第一个选项 即addForm.channelName中的数据
        addDialogClosed() {
        // 表单方法：resetFields：对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
            this.$refs.addeFormRef.resetFields()
            this.addeForm.channelName = ''
            this.addeForm.updateDate = ''
        },
        // 用于编辑按钮 点击展示修改对话框
        showEditDialog(info) {
            this.editForm = info
            this.editDialogVisible = true
        },
        // 监听修改对话框的关闭事件 进行重置
        aditDialogClosed() {
            this.$refs.editFormRef.resetFields()
            this.addeForm.channelName = ''
            this.editDialogVisible = false
        },
        async editwarningInfo() {
            this.editForm.updateDate = this.checkTime(this.editForm.updateDate)
            this.$refs.editFormRef.validate(async valid => {
                if(!valid) return false
                const {data:res} = await this.$warning.put(`${this.editForm.id}`,this.editForm)
                if(res.statusCode!==20000) {
                    return this.$message.error('修改状态失败！')
                }
                this.$message.success('修改成功')
                this.getwarningList()
            })
            this.editDialogVisible = false
            this.aditDialogClosed()
        },
        // 修改设备状态
        async changeCode(info) {
            const {data:res} = await this.$warning.put(`${info.id}`,info)
            if(res.statusCode!==20000) {
                return this.$message.error('修改状态失败！')
            }
            this.$message.success('修改成功')
            this.getwarningList()
        },
        // 页码改变
        pageChange(page) {
            this.page_index = page.pageindex
            this.page_size = page.pagesize
            this.getwarningList()
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
            const {data:res} = await this.$warning.delete(`${id}`)
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
</style>