<template>
        <el-card class="box-card">
            <el-row>
                <el-col :span="20"><span>修改参数</span></el-col>
                <el-col :span="4"><el-button type="primary" size="mini" @click="sendfrom">预测</el-button></el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <el-row style="margin-bottom:14px">
                    <el-form :model="forecaseForm" :rules="forecaseFormRules" ref="forecaseFormRef">
                        <div style="margin-top:20px">
                            <el-row>
                            <!--设备名称-->
                            <el-form-item label="当前设备" prop="equipmentName">
                                        <el-select value-key="id" v-model="forecaseForm.equipment" disabled>
                                            <el-option v-for="item in equipmentList" :key="item.id" :label="item.equipmentName" :value="item"></el-option>
                                        </el-select>
                            </el-form-item>
                            <!--需要预测的项目-->
                            <el-form-item label="检测项" prop="checkItemName" label-width="78px">
                                <el-select v-model="forecaseForm.checkItemName" placeholder="请选择检测项">
                                    <el-option v-for="item in forecaseForm.typeId=='1'?pondCheckItemName:weatherCheckItemName" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <!--使用的算法模型-->
                            <el-form-item label="算法模型" prop="arithmetic">
                                <el-select v-model="forecaseForm.arithmetic" placeholder="请选择算法模型">
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
                        </div>
                    </el-form>
                </el-row>
            </el-row>
        </el-card>
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
        },
        forecaseForm: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            // 预测表单的验证规则对象
            forecaseFormRules: {
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
            }
        }
    },
    methods: {
        sendfrom() {
            this.$refs.forecaseFormRef.validate(async valid => {
                if(!valid) return false
                this.$emit('getForecastData',this.forecaseForm)
            })
        },
    }
}
</script>

<style lang="stylus" scoped>
</style>