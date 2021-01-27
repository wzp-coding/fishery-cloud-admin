<template>
    <el-row>
        <el-card shadow="never">
          <el-row style="font-size:14px; font-weight:bold"><i class="el-icon-plus"></i><span> 监控设备</span></el-row>
          <el-row>
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
              <el-col :span="8">
                  <el-form-item label="基地名称" prop="baseName">
                      <el-select v-model="addForm.baseName" placeholder="请选择">
                          <el-option v-for="item in baseList" :key="item.id" :label="item.baseName" :value="item.baseName"></el-option>
                      </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="摄像头监控位置" prop="monitoringLocation"><el-input v-model="addForm.monitoringLocation" style="width:200px"></el-input></el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="设备序列号" prop="deviceSerial"><el-input v-model="addForm.deviceSerial" style="width:200px"></el-input></el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="设备验证码" prop="validateCode"><el-input v-model="addForm.validateCode" style="width:200px"></el-input></el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="创建者" prop="createBy"><el-input v-model="addForm.createBy" style="width:200px"></el-input></el-form-item>
              </el-col>
            </el-form>
            <!--按钮区域——start-->
            <el-col :span="4" :push="4">
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
            baseId:'1248910886228332544',
            baseList:[],
            // 存放添加表单数据
            addForm: {
                baseId: '',
                baseName: '',
                monitoringLocation: '',
                createBy: '',
                deviceSerial: '',
                validateCode: '',
                statusCode: '1',
                createDate: ''
            },
            // 添加表单的验证规则对象
            addFormRules: {
                monitoringLocation: [
                    { required: true, message: '请输入位置', trigger: 'blur' }
                ],
                deviceSerial: [
                    { required: true, message: '请输入序列号', trigger: 'blur' }
                ],
                validateCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                createBy: [
                    { required: true, message: '请输入创建者', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
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
            this.$emit('ShowAddDevice',false)
            this.$refs.addFormRef.resetFields()
        },
        // adddevice用于添加按钮
        adddevice() {
            this.addForm.baseId = this.baseId
            this.addForm.createDate = this.getnowtime()
            console.log(this.addForm);
            this.$monitor.post('add',this.addForm).then(res  => {
                if(res.data.statusCode!==20000) {
                    return this.$message.error('添加失败！')
                }
                this.$emit('ShowAddDevice',false)
                this.$emit('getequipmentList')
                this.$message.success('添加成功！')
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