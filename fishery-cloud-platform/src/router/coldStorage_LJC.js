import ColdStorage from '../views/aquaculture_production/ColdStorage.vue';
import ColdStorageInfo from '../components/ljc/coldStorageInfo/coldStorageInfo.vue'

export default [
    {
        // 冷库
        path: '/cold-storage',
        component: ColdStorage
    },
    {
        // 冷库信息
        path: '/cold-storageInfo',
        component: ColdStorageInfo
    },
]