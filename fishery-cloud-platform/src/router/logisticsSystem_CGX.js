import ManagementOrder from '../views/ManagementOrder.vue';
import InfoLogistics from '../views/InfoLogistics.vue';
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
    },
    // 下面这四个具体问佳成
    // {
    //     // 物流二维码
    //     path: '/qrcode-logistics',
    //     component: QRCodeLogistics
    // },
    // {
    //     // 溯源二维码
    //     path: '/qrcode-origin',
    //     component: QRCodeOrigin
    // },
    // {
    //     // 是否确认收货
    //     path: '/qrcode-logistics-arrive',
    //     component: QRCodeLogisticsArrive
    // },
    // {
    //     path: '/qrcode-origin-arrive',
    //     component: QRCodeOriginArrive
    // }
]