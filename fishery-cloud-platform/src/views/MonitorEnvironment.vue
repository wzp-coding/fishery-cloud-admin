<template>
    <div>
        <!-- 面包屑导航区域——start -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>我的基地</el-breadcrumb-item>
            <el-breadcrumb-item>环境检测</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑导航区域——end -->

        <transition name="el-zoom-in-top">
        <el-card v-show="showEnvironmentalPrediction">
            <!--环境检测卡片区域——start-->

            <!--标题区域——start-->
            <el-row class="globalHeader" style="margin-bottom:20px;padding-bottom:45px">
                <el-col :span="22">
                    <i class="el-icon-s-custom"></i>
                    <span>环境预测</span>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" round @click="SwitchingFunction">数据查询</el-button>
                </el-col>
            </el-row>
            <!--标题区域——end-->

            <el-row :gutter="8">

                <!--左边的表单区域——start-->
                <transition name="el-zoom-in-top">
                <el-col :span="7" v-show="showfrom">
                    <MonitorEnvironmentForecastForm 
                    :equipmentList="equipmentList" 
                    :pondarithmetic="pondarithmetic" 
                    :weatherarithmetic="weatherarithmetic" 
                    :pondCheckItemName="pondCheckItemName" 
                    :weatherCheckItemName="weatherCheckItemName" 
                    v-on:forecaseForm="forecaseForm=$event" 
                    v-on:showother="showother=$event"
                    v-on:showfrom="showfrom=$event"
                    v-on:showforecast="showforecast=$event">
                    </MonitorEnvironmentForecastForm>
                </el-col>
                </transition>
                <!--左边的表单区域——end-->

                <!--预测图表区域——start-->
                <transition name="el-zoom-in-top">
                <el-col :span="15" v-show="showforecast">
                    <el-row :gutter="10">
                        <el-col :span="24"><el-card class="box-card" :body-style="{ padding: '15px' }"><span style="margin-left:8px">设备--</span></el-card></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-card shadow="hover">
                                <el-row>
                                    <el-col :span="22"><span>预测结果</span></el-col>
                                    <el-col :span="2">
                                        <el-button type="primary" size="mini" :disabled="showfrom==false?false:true" @click="closeforecast">关闭</el-button>
                                    </el-col>
                                </el-row>
                                <el-divider></el-divider>
                                <el-row>
                                    <div class="fs" style="height:275px" ref="chart"> </div>
                                </el-row>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-col>
                </transition>
                <!--预测图表区域——end-->

                <!--修改参数(始预测后科修改某些参数(除设备外)重新提交表单得到预测结果)——start-->
                <transition name="el-zoom-in-bottom">
                    <el-col :span="7" v-show="showother">
                    <MonitorEnvironmentForecastFormrevise 
                    :equipmentList="equipmentList" 
                    :pondarithmetic="pondarithmetic" 
                    :weatherarithmetic="weatherarithmetic"
                    :pondCheckItemName="pondCheckItemName"
                    :weatherCheckItemName="weatherCheckItemName"
                    :forecaseForm="forecaseForm">
                    </MonitorEnvironmentForecastFormrevise>
                    </el-col>
                </transition>
                <!--修改参数(始预测后科修改某些参数重新提交表单得到预测结果)——end-->

            </el-row>
            <!--环境检测卡片区域——end-->
        </el-card>
        </transition>

        <!--查询设备组件区域——start-->
        <MonitorEnvironmentDeviceQuery 
        :equipmentList='equipmentList' 
        v-show="showDeviceQuery" 
        v-on:showDeviceQuery='showDeviceQuery = $event' 
        v-on:showEnvironmentalPrediction='showEnvironmentalPrediction = $event'>
        </MonitorEnvironmentDeviceQuery>
        <!--查询设备组件区域——end-->

    </div>
</template>                                                                                                                                                 

<script>
// 引入子组件
import MonitorEnvironmentDeviceQuery from '../components/yzc/MonitorEnvironment/MonitorEnvironmentDeviceQuery'
import MonitorEnvironmentForecastForm from '../components/yzc/MonitorEnvironment/MonitorEnvironmentForecastForm'
import MonitorEnvironmentForecastFormrevise from '../components/yzc/MonitorEnvironment/MonitorEnvironmentForecastFormrevise'
export default {
    components: {
        MonitorEnvironmentDeviceQuery,
        MonitorEnvironmentForecastForm,
        MonitorEnvironmentForecastFormrevise
    },
    mounted() {
        this.$nextTick(function() {
            this.MakeChart()
        })
    },
    created() {
        this.GetEquipmentList()
    },
    data() {
        return {
            //----------预测内容表单相关属性——start
            baseId:'1248910886228332544',
            // 表单内容是否显示
            showfrom: true,
            // forecaseForm用于存放需要预测的信息(从预测表单子组件获得)
            forecaseForm: {},
            // equipmentList用于存放预测的检测项
            equipmentList:[],
            // 算法选项  pondarithmetic为水池算法选项 weatherarithmetic为天气算法选项
            pondarithmetic: [
                { value: 'svm', label: 'svm' },
                { value: 'LR', label: 'LR' },
                { value: 'DT', label: 'DT' },
                { value: 'RF', label: 'RF'}
            ],
            weatherarithmetic: [
                { value: 'arima', label: 'arima' },
                { value: 'lstmrnn', label: 'lstmrnn' }
            ],
            // 预测的项目 其中pondCheckItemName为水质设备的 weatherCheckItemName为气象设备的
            pondCheckItemName: [
                { value: 'dissolvedOxygen', label: '溶解氧/%' },
                { value: 'waterTemperature', label: '水温/℃' },
                { value: 'phValue', label: 'pH/pH' },
                { value: 'ammoniaNitrogen', label: '氨氮/%' },
                { value: 'conductivity', label: '电导率/(μS/cm)' },
                { value: 'turbidity', label: '浊度/NTU' },
                { value: 'permanganateIndex', label: '高猛酸盐指数/(mg/L)' },
                { value: 'phosphorus', label: '总磷/(mg/L)' },
                { value: 'nitrogen', label: '总氮/(mg/L)' },
                { value: 'chlorophyll', label: '叶绿素α/(mg/L)' },
                { value: 'algalDensity', label: '藻密度/(cells/L)' },
                { value: 'waterLevel', label: '水位/m' }
            ],
            weatherCheckItemName: [
                { value: 'electricEnergy', label: '电能/mV' },
                { value: 'illumination', label: '光照/Lux' },
                { value: 'windSpeed', label: '风速/(m/s)' },
                { value: 'windDirect', label: '风向/度' },
                { value: 'airTemperature', label: '气温/℃' },
                { value: 'humidity', label: '湿度/%' },
                { value: 'rain', label: '雨量/mm' },
                { value: 'soilTemperature', label: '土温/℃' },
                { value: 'soilMoisture', label: '土湿/%' },
            ],

            //----------预测内容表单相关属性——end

            showforecast: true,
            // 控制预测结果其他信息
            showother: false,
            // showDeviceQuery showEnvironmentalPrediction通过它们来决定显示那个功能模块 环境预测or设备查询
            showDeviceQuery: false, // 控制设备查询模块
            showEnvironmentalPrediction: true // 控制环境预测功能模块
        }
    },
    methods: {
        // 获取设备信息
        async GetEquipmentList() {
            const { data:res } = await this.$equipment.post(`/search`,{
                baseId:this.baseId
            })
            this.equipmentList = res.data
            console.log(this.equipmentList)
        },
        // 用于预测结果卡片中的预测按钮 关闭预测closeforecast
        closeforecast() {
            this.showfrom = true
            this.showother = false
            this.closedisabled = true
            this.showforecast = false
            this.EmptyForecaseForm()
        },
        // 清空接收预测信息的对象 在关闭预测后预测内容区域表单置空
        EmptyForecaseForm() {
            for(var key in this.forecaseForm) {
                this.forecaseForm[key] = ''
            }
        },
        // 控制功能的切换 即环境预测与设备查询
        SwitchingFunction() {
            this.showDeviceQuery = !this.showDeviceQuery
            this.showEnvironmentalPrediction = !this.showEnvironmentalPrediction 
        },
        // 绘制预测图表
        MakeChart() {
            const chart = this.$refs.chart
            // 初始化echart实例
            const mychart = this.$echarts.init(chart)
            // 绘制图表
            mychart.setOption({
                title: {
                    text: '先放点东西'
                },
                xAxis: {
                    data:['aa','bb','cc','dd','ff','hh']
                },
                yAxis: {},
                series: [{
                    name: '温度',
                    type: 'bar',
                    data: [5,20,25,14,12,1]
                }]
            })
        },
        test() {
            setTimeout(()=> {
                this.showforecast = true
            },400)
        }
    },
    watch: {
        showforecast: function() {
            this.test()
        }
    }
}
</script>

<style lang="less" scoped>
.el-row span {
    line-height: 20px;
    font-weight: bold;
    font-size: 14px;
    color: #555555;
}
.fs {
    font-weight: bold;
    font-size: 14px;
    color: #555555;
}
</style>