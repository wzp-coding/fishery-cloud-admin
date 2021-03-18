export default [
    {
        // 加工厂
        path: '/process-plant',
        component: ()=>import(/* webpackChunkName:"ProcessPlant" */ '../views/aquaculture_production/ProcessPlant.vue')
    },
    {
        // 加工信息
        path: '/info-plant',
        component: ()=>import(/* webpackChunkName:"InfoPlant" */ '../views/aquaculture_production/InfoPlant.vue')
    },
    {
        // 加工产品的工艺信息
        path: '/info-craft',
        component: ()=>import(/* webpackChunkName:"InfoCraft" */ '../views/aquaculture_production/InfoCraft.vue')
    },
    {
        // 加工工艺的投入品信息
        path: "/info-input",
        component: ()=>import(/* webpackChunkName:"InfoInput" */ '../views/aquaculture_production/InfoInput.vue'),
    },
    {
        // 投入品分类管理
        path: '/management-inputs-classification',
        component: ()=>import(/* webpackChunkName:"ManagementInputsClassification" */ '../views/management_base/ManagementInputsClassification.vue')
    },
]