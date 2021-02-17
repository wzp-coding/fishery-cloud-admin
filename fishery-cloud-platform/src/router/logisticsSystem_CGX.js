import ManagementOrder from '../views/order_logistics/ManagementOrder.vue';
import InfoLogistics from '../views/order_logistics/InfoLogistics.vue';
export default [
    {
        // 订单管理
        path: '/management-order',
        component: ManagementOrder
    },
    {
        // 物流信息
        path: '/info-logistics',
        component: InfoLogistics
    }
]