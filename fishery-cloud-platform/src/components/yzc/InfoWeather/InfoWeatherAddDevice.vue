<template>
    <el-row>
        <el-card shadow="never">
          <el-row style="font-size:14px; font-weight:bold"><i class="el-icon-plus"></i><span> 气象设备</span></el-row>
          <el-row>
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
              <el-col :span="8">
                  <el-form-item label="设备名称" prop="equipmentName"><el-input v-model="addForm.equipmentName" style="width:200px"></el-input></el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="用户名称" prop="username"><el-input v-model="addForm.username" style="width:200px"></el-input></el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="基地名称" prop="baseName">
                      <el-select v-model="addForm.baseName" placeholder="请选择">
                          <el-option v-for="item in baseList" :key="item.id" :label="item.baseName" :value="item.baseName"></el-option>
                      </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="设备编号" prop="equipmentId"><el-input v-model="addForm.equipmentId" style="width:200px"></el-input></el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="备注信息" prop="remarks"><el-input v-model="addForm.remarks" style="width:200px"></el-input></el-form-item>
              </el-col>
            </el-form>
            <!--按钮区域——start-->
            <el-col :span="8" :push="3">
                <el-button @click="HideAddDevice">取消</el-button>
                <el-button type="primary" @click="adddevice">添加</el-button>
            </el-col>
            <!--按钮区域——end-->
          </el-row>
        </el-card>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            // 基地信息
            baseList:[],
            baseId:'1248910886228332544',
            // 存放添加表单数据
            addForm: {
                id:'',
                typeId:'0',
                equipmentName: '',
                equipmentId: '',
                username: '',
                baseId: '',
                baseName: '',
                remarks: '',
                updateTime: ''
            },
            // 添加表单的验证规则对象
            addFormRules: {
                equipmentName: [
                    { required: true, message: '请输入设备名称', trigger: 'blur' }
                ],
                username: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' }
                ],
                baseName: [
                    { required: true, message: '请输入基地名称', trigger: 'blur' }
                ],
                equipmentId: [
                    { required: true, message: '请填写设备编号', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        // 获取基地名称
        this.getbasename()
    },
    methods: {
        // 查询基地名称
        async getbasename() {
            const { data:res } = await this.$base.post('search',{
                baseId:this.baseId
            })
            this.baseList = res.data
        },
        // 该方法改变父组件中的ShowAddDevice来控制自身的显示隐藏 同时调用表单方法清除addFrom中数据
        HideAddDevice() {
            console.log(this.addForm);
            this.$emit('ShowAddDevice',false)
            this.$refs.addFormRef.resetFields()
        },
        // adddevice用于添加按钮
        async adddevice() {
            this.$refs.addFormRef.validate( async valid => {
                if(!valid) return false
                this.addForm.baseId = this.baseId
                this.addForm.updateTime = this.getnowtime()
                const {data:res} = await this.$equipment.post('',this.addForm)
                if(res.statusCode!==20000) {
                    return this.$message.error('添加失败！')
                }
                this.$message.success('添加成功！')
                // 触发父组件重新获取列表
                this.$emit('getequipmentList')
                this.HideAddDevice()
            })
        },
        // 获取当前时间 用于添加设备是的添加时间
        getnowtime() {
            const date = new Date()
            const year = date.getFullYear()
            const month = date.getMonth()+1
            const day = date.getDate()
            const hour = date.getHours()
            const minute = date.getMinutes()
            const second = date.getSeconds()
            const time = year + '-' + this.addZero(month) + '-' + this.addZero(day) + ' ' + this.addZero(hour) + ':' + this.addZero(minute) + ':' + this.addZero(second)
            return time
        },
        addZero(t) {
            return t < 10? '0'+t:t
        }
    }
}
</script>

<style lang="less" scoped>
</style>