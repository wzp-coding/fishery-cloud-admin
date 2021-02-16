import MonitorLive from '../views/my_base/MonitorLive.vue'
import MonitorEquipment from '../views/management_device/MonitorEquipment.vue'
import MonitorEnvironment from '../views/my_base/MonitorEnvironment.vue'
import ManagementWaterQualityWarn from '../views/my_base/ManagementWaterQualityWarn.vue'
import ManagementWeatherWarn from '../views/my_base/ManagementWeatherWarn.vue'
import InfoWeather from '../views/management_device/InfoWeather.vue'
import InfoWaterQuality from '../views/management_device/InfoWaterQuality.vue'
import DiseaseDiagnosis from '../views/my_base/DiseaseDiagnosis.vue'
export default [
    {
        // 实况监控
        path: '/monitor-live',
        component: MonitorLive
    },
    {
        // 监控设备
        path: '/monitor-equipment',
        component: MonitorEquipment
    },
    {
        // 环境监测
        path: '/monitor-environment',
        component: MonitorEnvironment
    },
    {
        // 气象设备
        path: '/info-weather',
        component: InfoWeather
    },
    {
        // 设置水质阀值
        path: '/management-water-quality-warn',
        component: ManagementWaterQualityWarn
    },
    {
        // 设置环境阀值
        path: '/management-weather-warn',
        component: ManagementWeatherWarn
    },
    {
        // 水质设备
        path: '/info-water-quality',
        component: InfoWaterQuality
    },
    {
        // 疾病诊断
        path: '/disease-diagnosis',
        component: DiseaseDiagnosis
    }
]