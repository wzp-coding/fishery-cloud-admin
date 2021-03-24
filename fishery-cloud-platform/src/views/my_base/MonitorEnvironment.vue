<template>
    <div>
        <!-- 面包屑导航区域——start -->
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
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
                    <el-button type="primary" @click="SwitchingFunction">数据查询</el-button>
                </el-col>
            </el-row>
            <!--标题区域——end-->

            <el-row :gutter="8">

                <!--左边的表单区域——start-->
                <transition name="el-zoom-in-top">
                <el-col :span="7" v-show="showfrom">
                    <MonitorEnvironmentForecastForm 
                    ref="ForecastForm"
                    @ChartInit="ChartInit"
                    @getForecastData="getForecastData"
                    :equipmentList="equipmentList" 
                    :pondarithmetic="pondarithmetic" 
                    :weatherarithmetic="weatherarithmetic" 
                    :pondCheckItemName="pondCheckItemName" 
                    :weatherCheckItemName="weatherCheckItemName" 
                    v-on:showother="showother=$event"
                    v-on:showfrom="showfrom=$event"
                    v-on:showforecast="showforecast=$event"
                    >
                    </MonitorEnvironmentForecastForm>
                </el-col>
                </transition>
                <!--左边的表单区域——end-->

                <!--预测图表区域——start-->
                <transition name="el-zoom-in-top">
                <el-col :span="15" v-show="showforecast">
                    <el-row :gutter="10">
                        <el-col :span="24"><el-card class="box-card" :body-style="{ padding: '15px' }"><span style="margin-left:8px">预警--{{this.warn}}</span></el-card></el-col>
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
                    @getForecastData="getForecastData"
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
import MonitorEnvironmentDeviceQuery from '../../components/yzc/MonitorEnvironment/MonitorEnvironmentDeviceQuery'
import MonitorEnvironmentForecastForm from '../../components/yzc/MonitorEnvironment/MonitorEnvironmentForecastForm'
import MonitorEnvironmentForecastFormrevise from '../../components/yzc/MonitorEnvironment/MonitorEnvironmentForecastFormrevise'
import Breadcrumb from '../../components/public_components/Breadcrumb'
import { mapState } from 'vuex'
export default {
    components: {
        MonitorEnvironmentDeviceQuery,
        MonitorEnvironmentForecastForm,
        MonitorEnvironmentForecastFormrevise,
        Breadcrumb
    },
    mounted() {
        this.$nextTick(function() {
            this.ChartInit()
        })
    },
    created() {
        this.GetEquipmentList()
    },
    data() {
        return {
            interval: '',
            breadcrumbs:["我的基地","环境监测"],
            warn: '无',
            //----------预测内容表单相关属性——start
            baseId:this.$store.state.userInfo.baseId,
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
            showEnvironmentalPrediction: true, // 控制环境预测功能模块
            chartVM: undefined
        }
    },
    watch:{
        "userInfo.theme":{
            handler(val){
                this.chartVM.dispose();
                this.getForecastData(this.forecaseForm);
            }
        }
    },
    computed:{
        ...mapState(['userInfo'])
    },
    methods: {
        // 获取设备信息
        async GetEquipmentList() {
            const { data:res } = await this.$equipment.post(`/search`,{
                baseId:this.baseId
            })
            this.equipmentList = res.data
        },
        // 用于预测结果卡片中的预测按钮 关闭预测closeforecast 清空接收预测信息的对象 在关闭预测后预测内容区域表单置空
        closeforecast() {
            this.showfrom = true
            this.showother = false
            this.closedisabled = true
            this.showforecast = false
            this.warn = '无'
            this.$refs.ForecastForm.empty()
        },
        // 控制功能的切换 即环境预测与设备查询
        SwitchingFunction() {
            this.showDeviceQuery = !this.showDeviceQuery
            this.showEnvironmentalPrediction = !this.showEnvironmentalPrediction 
        },
        getTimeLength(start, end) {
            const stamp = new Date(end).getTime() - new Date(start).getTime()
            let time = (stamp / 1000)
            if (time !== null && time !== '') {
            time = parseInt(time)
         }
           this.interval = this.forecaseForm.typeId === '1' ? 10 * 60 : 30 * 60
           const length = Math.floor(time / this.interval)
           return length
        },
        makeEchartXData(start, Timer, length) {
            const lists = []
            for (let j = 0; j < length; j++) {
            const seconds = Date.parse(start) // 标准时间转毫秒数
            const totals = j * Timer * 1000 + seconds // 固定时间间隔+开始时间的总毫秒数    分钟递增在*60 分小时 递增*60*60
            const res = new Date(totals).toString() // 毫秒数转字符串，截取，取值
            lists.push(this.checkTime(res))
            }
            return lists
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
            return times
        },
        // 获取预测数据
        async getForecastData(forecaseForm) {
            this.forecaseForm = forecaseForm
            forecaseForm.startTime = this.checkTime(forecaseForm.startTime)
            forecaseForm.endTime = this.checkTime(forecaseForm.endTime)
            let myflag = ''
            if(forecaseForm.arithmetic === 'arima') {
                myflag = 'arima'
            }else if(forecaseForm.arithmetic === 'lstmrnn') {
                myflag = 'lstmrnn'
            }else {
                myflag = 'water/' + forecaseForm.arithmetic
            }
            const form = {
                equipmentId: forecaseForm.equipment.equipmentId,
                checkItemName: forecaseForm.checkItemName,
                startTime: forecaseForm.startTime,
                endTime: forecaseForm.endTime,
                typeId: forecaseForm.typeId,
                baseId: forecaseForm.equipment.baseId
            }
            let Unit = ''
            let arrUnitList = forecaseForm.typeId === '0' ? this.weatherCheckItemName : this.pondCheckItemName
            Unit = arrUnitList.find(item => item.value === forecaseForm.checkItemName )
            Unit = Unit.label
            const {data: res} = await this.$forecast.post(`/${myflag}/1/500`,form)
            if(res.statusCode !== 20000) {
                return this.elMessage.error(('预测失败'))
            }
            if (res.data.orgindata.length === 0) {
                return this.elMessage.info('查无数据')
            }
            this.elMessage.success('预测成功')
            this.warn = res.data.warn === true?'预测到接下来一段时间内，当前通道值可能会超出或低于阀值，请及时做出相应处理':'无'
            const length = this.getTimeLength(forecaseForm.startTime, forecaseForm.endTime)
            const xData = this.makeEchartXData(forecaseForm.startTime, this.interval, length)
            xData.length = 700
            res.data.predictdata = [...res.data.orgindata, ...res.data.predictdata]
            this.ChartInit(xData, res.data.orgindata, res.data.predictdata, Unit)
            this.showfrom = false
            this.showforecast = false
            setTimeout(()=> {
                this.showother = true
            })
        },
        // 绘制预测图表
        ChartInit(xData, orgindata, predictdata, unit) {
            const chart = this.$refs.chart
            if (chart) {
                const myChart = this.$echarts.init(chart,this.userInfo.theme)
                this.chartVM = myChart
                const option = {
                    tooltip: {
                      trigger: 'axis'
                    },
                    legend: {
                      data: ['实际值', '预测值']
                    },
                    xAxis: {
                      type: 'category',
                      boundaryGap: false,
                      data: xData
                      // data: ['2019-09-01 08:00:00', '2019-09-01 08:30:00', '2019-09-01 09:00:00', '2019-09-01 09:30:00', '2019-09-01 10:00:00', '2019-09-01 10:30:00', '2019-09-01 11:00:00', '2019-09-01 11:30:00', '2019-09-01 12:00:00', '2019-09-01 12:30:00', '2019-09-01 13:00:00', '2019-09-01 13:30:00', '2019-09-01 14:00:00', '2019-09-01 14:30:00', '2019-09-01 15:00:00', '2019-09-01 15:30:00', '2019-09-01 16:00:00', '2019-09-01 16:30:00', '2019-09-01 17:00:00', '2019-09-01 17:30:00', '2019-09-01 18:00:00', '2019-09-01 18:30:00', '2019-09-01 19:00:00', '2019-09-01 19:30:00', '2019-09-01 20:00:00', '2019-09-01 20:30:00', '2019-09-01 21:00:00', '2019-09-01 21:30:00', '2019-09-01 22:00:00', '2019-09-01 22:30:00', '2019-09-01 23:00:00', '2019-09-01 23:30:00', '2019-09-02 00:00:00', '2019-09-02 00:30:00', '2019-09-02 01:00:00', '2019-09-02 01:30:00', '2019-09-02 02:00:00', '2019-09-02 02:30:00', '2019-09-02 03:00:00', '2019-09-02 03:30:00', '2019-09-02 04:00:00', '2019-09-02 04:30:00', '2019-09-02 05:00:00', '2019-09-02 05:30:00', '2019-09-02 06:00:00', '2019-09-02 06:30:00', '2019-09-02 07:00:00', '2019-09-02 07:30:00', '2019-09-02 08:00:00', '2019-09-02 08:30:00', '2019-09-02 09:00:00', '2019-09-02 09:30:00', '2019-09-02 10:00:00', '2019-09-02 10:30:00', '2019-09-02 11:00:00', '2019-09-02 11:30:00', '2019-09-02 12:00:00', '2019-09-02 12:30:00', '2019-09-02 13:00:00', '2019-09-02 13:30:00', '2019-09-02 14:00:00', '2019-09-02 14:30:00', '2019-09-02 15:00:00', '2019-09-02 15:30:00', '2019-09-02 16:00:00', '2019-09-02 16:30:00', '2019-09-02 17:00:00', '2019-09-02 17:30:00', '2019-09-02 18:00:00', '2019-09-02 18:30:00', '2019-09-02 19:00:00', '2019-09-02 19:30:00', '2019-09-02 20:00:00', '2019-09-02 20:30:00', '2019-09-02 21:00:00', '2019-09-02 21:30:00', '2019-09-02 22:00:00', '2019-09-02 22:30:00', '2019-09-02 23:00:00', '2019-09-02 23:30:00', '2019-09-03 00:00:00', '2019-09-03 00:30:00', '2019-09-03 01:00:00', '2019-09-03 01:30:00', '2019-09-03 02:00:00', '2019-09-03 02:30:00', '2019-09-03 03:00:00', '2019-09-03 03:30:00', '2019-09-03 04:00:00', '2019-09-03 04:30:00', '2019-09-03 05:00:00', '2019-09-03 05:30:00', '2019-09-03 06:00:00', '2019-09-03 06:30:00', '2019-09-03 07:00:00', '2019-09-03 07:30:00', '2019-09-03 08:00:00', '2019-09-03 08:30:00', '2019-09-03 09:00:00', '2019-09-03 09:30:00']
                    },
                    yAxis: {
                      name: unit,
                      type: 'value',
                      // axisLabel: {
                      //   formatter: '{value} '
                      // }
                      min: function(value) {
                        return value.min
                      }
                    },
                    series: [{
                      name: '预测值',
                      type: 'line',
                      data: predictdata,
                      scale: true,
                      // data: [4128.4, 4135.7, 4147.4, 4131.3, 4156.2, 4156.2, 4122.5, 4115.2, 4148.9, 4147.4, 4147.4, 4144.5, 4144.5, 4141.6, 4140.1, 4140.1, 4138.6, 4135.7, 4134.2, 4135.7, 4144.5, 4163.5, 4178.2, 4182.6, 4181.1, 4154.7, 4160.6, 4165, 4154.7, 4160.6, 4165, 4153.3, 4151.8, 4182.6, 4153.3, 4154.7, 4153.3, 4156.2, 4150.3, 4181.1, 4137.2, 4137.2, 4151.8, 4134.2, 4143, 4166.5, 4135.7, 4128.4, 4132.8, 4159.1, 4129.8, 4119.6, 4128.4, 4151.8, 4119.6, 4147.4, 4147.4, 4146, 4144.5, 4144.5, 4141.6, 4141.6, 4138.6, 4137.2, 4135.7, 4135.7, 4134.2, 4140.1, 4157.7, 4181.1, 4182.6, 4181.1, 4172.3, 4156.2, 4160.6, 4181.1, 4157.7, 4181.1, 4172.3, 4153.3, 4153.3, 4182.6, 4151.8, 4184, 4162.1, 4184, 4147.4, 4178.2, 4138.6, 4140.1, 4153.3, 4134.2, 4132.8, 4167.9, 4144.5, 4129.8, 4125.4, 4160.6, 4122.5, 4128.4],
                      markPoint: {
                        data: [{
                          type: 'max',
                          name: '最大值'
                        },
                        {
                          type: 'min',
                          name: '最小值'
                        }
                        ]
                      },
                      markLine: {
                        data: [{
                          type: 'average',
                          name: '平均值'
                        }]
                      }
                    },
                    {
                      name: '实际值',
                      type: 'line',
                      data: orgindata,
                      scale: true,
                      // data: [4128.4, 4135.7, 4147.4, 4131.3, 4156.2, 4156.2, 4122.5, 4115.2, 4148.9, 4147.4, 4147.4, 4144.5, 4144.5, 4141.6, 4140.1, 4140.1, 4138.6, 4135.7, 4134.2, 4135.7, 4144.5, 4163.5, 4178.2, 4182.6, 4181.1, 4154.7, 4160.6, 4165, 4154.7, 4160.6, 4165, 4153.3, 4151.8, 4182.6, 4153.3, 4154.7, 4153.3, 4156.2, 4150.3, 4181.1, 4137.2, 4137.2, 4151.8, 4134.2, 4143, 4166.5, 4135.7, 4128.4, 4132.8, 4159.1, 4129.8, 4119.6, 4128.4, 4151.8, 4119.6, 4147.4, 4147.4, 4146, 4144.5, 4144.5, 4141.6, 4141.6, 4138.6, 4137.2, 4135.7, 4135.7, 4134.2, 4140.1, 4157.7, 4181.1, 4182.6, 4181.1, 4172.3, 4156.2, 4160.6, 4181.1, 4157.7, 4181.1, 4172.3, 4153.3, 4153.3, 4182.6, 4151.8, 4184, 4162.1, 4184, 4147.4, 4178.2, 4138.6, 4140.1, 4153.3, 4134.2, 4132.8, 4167.9, 4144.5, 4129.8, 4125.4, 4160.6, 4122.5, 4128.4],
                      markPoint: {
                        data: [{
                          name: '最低',
                          value: -2,
                          xAxis: 1,
                          yAxis: -1.5
                        }]
                      },
                      markLine: {
                        data: [{
                          type: 'average',
                          name: '平均值'
                        },
                        [{
                          symbol: 'none',
                          x: '90%',
                          yAxis: 'max'
                        },
                        {
                          symbol: 'circle',
                          label: {
                            position: 'start',
                            formatter: '最大值'
                          },
                          type: 'max',
                          name: '最高点'
                        }]
                        ]
                      }
                    }
                ]
             }
             myChart.setOption(option)
            }
        },
        Chage() {
            setTimeout(()=> {
                this.showforecast = true
            },400)
        }
    },
    watch: {
        showforecast: function() {
            this.Chage()
        }
    }
}
</script>

<style lang="less" scoped>
.el-row span {
    line-height: 20px;
    font-weight: bold;
    font-size: 14px;
}
.fs {
    font-weight: bold;
    font-size: 14px;
}
</style>