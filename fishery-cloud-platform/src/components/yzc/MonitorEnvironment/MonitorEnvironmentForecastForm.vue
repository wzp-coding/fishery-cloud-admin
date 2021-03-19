<template>
<div>
    <el-card class="box-card">
        <el-row><span>预测内容</span></el-row>
        <!--表单内容区域——start-->
        <el-row>
            <el-form :model="forecaseForm" :rules="forecaseFormRules" ref="forecaseFormRef">
                <el-row>
                <!--设备名称-->
                <el-form-item label="设备名称" prop="equipmentName">
                    <el-select v-model="forecaseForm.equipment" value-key="id" placeholder="请选择要预测的设备" @change="getForecaseEquipment">
                        <el-option v-for="item in equipmentList" :key="item.id" :label="item.equipmentName" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <!--需要预测的项目-->
                <el-form-item label="检测项" prop="checkItemName" label-width="78px">
                    <el-select v-model="forecaseForm.checkItemName" placeholder="请选择检测项" @change="getCheckItemName">
                        <el-option v-for="item in forecaseForm.typeId=='1'?pondCheckItemName:weatherCheckItemName" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <!--使用的算法模型-->
                <el-form-item label="算法模型" prop="arithmetic">
                    <el-select v-model="forecaseForm.arithmetic" placeholder="请选择算法模型" @change="getArithmetic">
                        <el-option v-for="item in forecaseForm.typeId=='1'?pondarithmetic:weatherarithmetic" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <!--预测的开始结束日期-->
                <el-form-item label="开始日期" prop="startTime">
                    <el-date-picker v-model="forecaseForm.startTime" type="date" placeholder="开始日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="endTime">
                    <el-date-picker v-model="forecaseForm.endTime" type="date" placeholder="开始日期"></el-date-picker>
                </el-form-item>
                </el-row>
            </el-form>
        </el-row>
        <!--表单内容区域——end-->
        <!--按钮区域——start-->
        <el-row>
            <el-col :push="15">
                <el-button type="primary" @click="sendfrom">开始预测</el-button>
            </el-col>
        </el-row>
        <!--按钮区域——end-->
    </el-card>
</div>
</template>

<script>
export default {
    props: {
        equipmentList: {
            type: Array,
            required: true
        },
        pondarithmetic: {
            type: Array,
            required: true
        },
        weatherarithmetic: {
            type: Array,
            required: true
        },
        pondCheckItemName: {
            type: Array,

            required: true
        },
        weatherCheckItemName: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            // forecaseForm用于存放需要预测的信息
            forecaseForm: {
                equipment: ' ',
                equipmentName: '',
                checkItemName: '',
                arithmetic: '',
                startTime: '',
                endTime: '',
                typeId: '1'
            },
            // 预测表单的验证规则对象
            forecaseFormRules: {
                equipmentName:[
                    { required: true, message: '请选择设备名称', trigger: 'blur' }
                ],
                checkItemName: [
                    { required: true, message: '请选择检测项', trigger: 'blur' }
                ],
                arithmetic: [
                    { required: true, message: '请选择算法', trigger: 'blur' }
                ],
                startTime: [
                    { required: true, message: '请选择开始时间', trigger: 'blur' }
                ],
                endTime: [
                    { required: true, message: '请选择结束时间', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        // 填入填入表单
        getForecaseEquipment(value) {
            this.forecaseForm.typeId = value.typeId
            this.forecaseForm.equipmentName = value.equipmentName
            this.forecaseForm.checkItemName = ''
            this.forecaseForm.arithmetic = ''
        },
        sendfrom() {
             this.$refs.forecaseFormRef.validate(async valid => {
                if(!valid) return false
                this.$emit('getForecastData',this.forecaseForm)
            //     this.$emit('showfrom',false)
            //     this.$emit('showforecast',false)
            //     setTimeout(() => {
            //     this.$emit('showother',true)
            // },500)
            })
        },
        // 清空表单
        empty() {
            for(var key in this.forecaseForm) {
                this.forecaseForm[key] = ''
            }
        },
        getCheckItemName(value) {
            if (this.forecaseForm.typeId === '') {
                alert('请先选择设备')
                this.forecaseForm.checkItemName = ''
                return
            }
            this.forecaseForm.checkItemName = value
        },
        getArithmetic(value) {
            if (this.forecaseForm.typeId === '') {
                alert('请先选择设备')
                this.forecaseForm.checkItemName = ''
                return
            }
            this.forecaseForm.arithmetic = value
        }
    }
}
</script>

<style lang="less" scoped>
</style>