export default [
    {
        // 订单管理
        path: '/management-order',
        component: () => import(/* webpackChunkName:"ManagementOrder" */'../views/order_logistics/ManagementOrder.vue')
    },
    {
        // 物流信息
        path: '/info-logistics',
        component: () => import(/* webpackChunkName:"InfoLogistics" */'../views/order_logistics/InfoLogistics.vue')
    },
    {
        path:'/B-code-web',
        component: () => import(/* webpackChunkName:"BcodeWeb" */'../components/cgx/ManagementOrder/BackPage/BcodeWeb.vue')
    }
    
]
