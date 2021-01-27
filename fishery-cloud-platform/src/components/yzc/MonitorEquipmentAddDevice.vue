<template>
    <el-row>
        <el-card shadow="never">
          <el-row style="font-size:14px; font-weight:bold"><i class="el-icon-plus"></i><span> 监控设备</span></el-row>
          <el-row>
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
              <el-col :span="8">
                  <el-form-item label="基地名称" prop="baseName"><el-input v-model="addForm.baseName" disabled style="width:200px"></el-input></el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="摄像头监控位置" prop="monitoringLocation"><el-input v-model="addForm.monitoringLocation" style="width:200px"></el-input></el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="设备序列号" prop="deviceSerial"><el-input v-model="addForm.deviceSerial" style="width:200px"></el-input></el-form-item>
              </el-col>
              <el-col :span="19">
                  <el-form-item label="设备验证码" prop="validateCode"><el-input v-model="addForm.validateCode" style="width:200px"></el-input></el-form-item>
              </el-col>
            </el-form>
            <!--按钮区域——start-->
            <el-col :span="4">
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
            // 存放添加表单数据
            addForm: {
                baseName: '',
                monitoringLocation: '',
                createBy: '',
                deviceSerial: '',
                validateCode: '',
                statusCode: '1'
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
                ]
            }
        }
    },
    methods: {
        // 该方法改变父组件中的ShowAddDevice来控制自身的显示隐藏 同时调用表单方法清除addFrom中数据
        HideAddDevice() {
            this.$emit('ShowAddDevice',false)
            this.$refs.addFormRef.resetFields()
        },
        // adddevice用于添加按钮
        adddevice() {
            this.$emit('ShowAddDevice',false)
            this.$message.success('添加成功！')
        }
    }
}
</script>

<style lang="less" scoped>
</style>