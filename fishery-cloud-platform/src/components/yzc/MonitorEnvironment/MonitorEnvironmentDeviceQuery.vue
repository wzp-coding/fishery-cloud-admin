<template>
    <el-card>
        <!--标题——start-->
        <el-row class="globalHeader" style="margin-bottom:20px;padding-bottom:45px">
            <el-col :span="22">
                <i class="el-icon-search"></i>
                <span>数据查询</span>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" round @click="SwitchingFunction">环境预测</el-button>
            </el-col>
        </el-row>
        <!--标题——end-->

        <!--查询区域(主要内容)——start-->
        <el-row style="margin-bottom:0px">
            <el-card shadow="hover" style="border:0">
                <el-row style="margin-bottom:0px">

                    <!--查询表单区域——start-->
                    <el-col :span="19" :push="5">
                        <el-form :model="searchForm" :rules="searchFormRules" ref="searchFormRef" label-width="100px">
                            <el-row style="margin-bottom:0px">
                                <el-col :span="8">
                                    <el-form-item label="设备名称" prop="equipmentName">
                                        <el-select v-model="searchForm.equipmentId" value-key="id" placeholder="请选择要查询的设备">
                                            <el-option v-for="item in equipmentList" :key="item.id" :label="item.equipmentName" :value="item.equipmentId"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-col>
                    <!--查询表单区域——start-->

                    <!--搜索按钮区域——start-->
                    <el-col :span="5" :pull="4">
                        <el-button round type="primary" icon="el-icon-search" @click="searchDevice" >搜索</el-button>
                        <el-button round type="primary" icon="el-icon-close" @click="CloseTable" >关闭</el-button>
                    </el-col>
                    <!--搜索按钮区域——end-->

                </el-row>
                <!--查询表单区域——end-->

                <!--查询结果表格——start-->
                <el-row style="margin-bottom:0">
                    <WeatherData ref="weather" v-show="ShowWeatherData"></WeatherData>
                    <WaterData ref="water" v-show="ShowWaterData"></WaterData>
                </el-row>
                <!--查询结果表格——end-->

            </el-card>
        <!--查询区域(主要内容)——start-->
        </el-row>
    </el-card>
</template>

<script>
import WaterData from './WaterData.vue'
import WeatherData from './WeatherData.vue'
export default {
    components: {
        WeatherData,
        WaterData
    },
    // 接收父组件传递的值
    props: {
        equipmentList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            //-----------查询设备表单内容——start
            // 需要查询的设备信息
            searchForm: {
                equipmentId: '',
                typeId: '',
            },
            // 查询表单的验证规则
            searchFormRules: {
                equipmentName: [
                    { required: true, message: '请选择设备名称', trigger: 'blur' }
                ]
            },
            // 显示气象还是水质设备
            ShowWeatherData: false,
            ShowWaterData: false,
            //-----------查询设备表单内容——end
            test: {}
        }
    },
    methods: {
        // 获取对应的typeId
        gettypeId(id) {
            const data = this.equipmentList.filter(value => {
                return value.equipmentId == id
            })
            this.searchForm.typeId = data[0].typeId
        },
        // 用于环境预测按钮 调用父组件方法切换到环境预测功能模块 子组件通过自定义事件向父组件传递信息 父组件监听子组件的事件
        SwitchingFunction() {
            this.$emit('showDeviceQuery',false)
            this.$emit('showEnvironmentalPrediction',true)
        },
        // 用于搜索按钮
        searchDevice() {
            this.gettypeId(this.searchForm.equipmentId)
            this.ShowWeatherData = false
            this.ShowWaterData = false
            if(this.searchForm.typeId == '0') {
                this.ShowWeatherData = true
                this.$refs.weather.getwarningList(this.searchForm.equipmentId)
            }
            if(this.searchForm.typeId == '1') {
                this.ShowWaterData = true
                this.$refs.water.getwarningList(this.searchForm.equipmentId)
            }
        },
        // 关闭
        CloseTable() {
            this.ShowWeatherData = false
            this.ShowWaterData = false
            this.searchForm.equipmentId = ''
        }
    }
}
</script>

<style lang="less" scoped>
</style>