export default [
    {
        // 实况监控
        path: '/monitor-live',
        component: () => import(/* webpackChunkName:"MonitorLive" */'../views/my_base/MonitorLive.vue')
    },
    {
        // 监控设备
        path: '/monitor-equipment',
        component: () => import(/* webpackChunkName:"MonitorEquipment" */'../views/management_device/MonitorEquipment.vue')
    },
    {
        // 环境监测
        path: '/monitor-environment',
        component: () => import(/* webpackChunkName:"MonitorEnvironment" */'../views/my_base/MonitorEnvironment.vue')
    },
    {
        // 气象设备
        path: '/info-weather',
        component: () => import(/* webpackChunkName:"ManagementWaterQualityWarn" */'../views/my_base/ManagementWaterQualityWarn.vue')
    },
    {
        // 设置水质阀值
        path: '/management-water-quality-warn',
        component: () => import(/* webpackChunkName:"ManagementWeatherWarn" */'../views/my_base/ManagementWeatherWarn.vue')
    },
    {
        // 设置环境阀值
        path: '/management-weather-warn',
        component: () => import(/* webpackChunkName:"InfoWeather" */'../views/management_device/InfoWeather.vue')
    },
    {
        // 水质设备
        path: '/info-water-quality',
        component: () => import(/* webpackChunkName:"InfoWaterQuality" */'../views/management_device/InfoWaterQuality.vue')
    },
    {
        // 疾病诊断
        path: '/disease-diagnosis',
        component: () => import(/* webpackChunkName:"DiseaseDiagnosis" */'../views/my_base/DiseaseDiagnosis.vue')
    }
]