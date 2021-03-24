export default [
    {
        // 冷库
        path: '/cold-storage',
        component: () => import(/* webpackChunkName:"ColdStorage" */'../views/aquaculture_production/ColdStorage.vue')
    },
    {
        // 冷库信息
        path: '/cold-storageInfo',
        component: () => import(/* webpackChunkName:"coldStorageInfo" */'../components/ljc/coldStorageInfo/coldStorageInfo.vue')
    },
]