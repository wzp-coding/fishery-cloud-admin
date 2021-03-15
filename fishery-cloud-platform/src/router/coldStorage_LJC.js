export default [
    {
        // 冷库
        path: '/cold-storage',
        component: () => import('../views/aquaculture_production/ColdStorage.vue')
    },
    {
        // 冷库信息
        path: '/cold-storageInfo',
        component: () => import('../components/ljc/coldStorageInfo/coldStorageInfo.vue')
    },
]