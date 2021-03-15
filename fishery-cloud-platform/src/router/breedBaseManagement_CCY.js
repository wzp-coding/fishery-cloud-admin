export default [
    {
        // 数字基地
        path: '/digital-base',
        name: 'digital-base',
        // component: DigitalBase
        component: () => import('../views/my_base/DigitalBase.vue')
    },
    {
        // 种苗进货
        path: '/seed-purchase',
        name: 'seed-purchase',
        // component: SeedPurchase
        component: () => import('../views/management_fishery/SeedPurchase.vue')
    },
    {
        // 种苗信息
        path: '/info-seed',
        // component: InfoSeed
        component: () => import('../views/management_fishery/InfoSeed.vue')
    },
    {
        // 员工管理
        path: '/management-staff',
        // component: ManagementStaff
        component: () => import('../views/management_base/ManagementStaff.vue')
    },
    {
        // 客户信息
        path: '/info-customer',
        // component: InfoCustomer
        component: () => import('../views/management_base/InfoCustomer.vue')
    },
    {
        // 农资管理
        path: '/management-supplies',
        // component: ManagementSupplies
        component: () => import('../views/management_fishery/ManagementSupplies.vue')
    },
    {
        // 投入品管理
        path: '/info-supplies',
        // component: InfoSupplies
        component: () => import('../views/management_fishery/InfoSupplies.vue')
    },
    {
        // 基地信息
        path: '/info-base',
        // component: InfoBase
        component: () => import('../views/management_base/InfoBase.vue')
    },
    {
        // 池塘管理
        path: '/management-pond',
        // component: ManagementPond
        component: () => import('../views/management_fishery/ManagementPond.vue')
    },
    // {
    //     // 池塘信息
    //     path: '/info-pond',
        // component: InfoPond
    //     component: ()=>import('')
    // },
    {
        // 养殖建议
        path: '/management-advise',
        // component:ManagementAdvise
        component: () => import('../views/management_fishery/ManagementAdvise.vue')
    },
    {
        // 备忘录
        path: '/node-pad',
        // component:NodePad
        component: () => import('../views/management_base/NodePad.vue')
    },
    {
        // 权限管理
        path: '/management-authority',
        // component: ManagementAuthority
        component: () => import('../views/management_base/ManagementAuthority.vue')
    },
    {
        //领导仓
        path:'/leader-warehouse',
        // component:leaderWarehouse
        component: () => import('../views/leader_warehouse/leaderWarehouse.vue')
    },
]