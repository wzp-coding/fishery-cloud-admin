import DigitalBase from '../views/my_base/DigitalBase.vue'     //
import SeedPurchase from '../views/management_fishery/SeedPurchase.vue'    //
import InfoSeed from '../views/management_fishery/InfoSeed.vue'           //
import InfoCustomer from '../views/management_base/InfoCustomer.vue'   //客户管理
import InfoSupplies from '../views/management_fishery/InfoSupplies.vue'    //
import InfoBase from '../views/management_base/InfoBase.vue'
// import InfoPond from '../views/management_fishery/InfoPond.vue'
import ManagementStaff from '../views/management_base/ManagementStaff.vue'      //
import ManagementSupplies from '../views/management_fishery/ManagementSupplies.vue'       //
import ManagementPond from '../views/management_fishery/ManagementPond.vue'    //
import ManagementAuthority from '../views/management_base/ManagementAuthority.vue'    //权限管理
import leaderWarehouse from "../views/leader_warehouse/leaderWarehouse.vue"
import ManagementAdvise from "../views/management_fishery/ManagementAdvise.vue"   //养殖建议卡
import NodePad from "../views/management_base/NodePad.vue"
export default [
    {
        // 数字基地
        path: '/digital-base',
        name: 'digital-base',
        component: DigitalBase
    },
    {
        // 种苗进货
        path: '/seed-purchase',
        name: 'seed-purchase',
        component: SeedPurchase
    },
    {
        // 种苗信息
        path: '/info-seed',
        component: InfoSeed
    },
    {
        // 员工管理
        path: '/management-staff',
        component: ManagementStaff
    },
    {
        // 客户信息
        path: '/info-customer',
        component: InfoCustomer
    },
    {
        // 农资管理
        path: '/management-supplies',
        component: ManagementSupplies
    },
    {
        // 投入品管理
        path: '/info-supplies',
        component: InfoSupplies
    },
    {
        // 基地信息
        path: '/info-base',
        component: InfoBase
    },
    {
        // 池塘管理
        path: '/management-pond',
        component: ManagementPond
    },
    // {
    //     // 池塘信息
    //     path: '/info-pond',
    //     component: InfoPond
    // },
    {
        // 养殖建议
        path: '/management-advise',
        component:ManagementAdvise
    },
    {
        // 备忘录
        path: '/node-pad',
        component:NodePad
    },
    {
        // 权限管理
        path: '/management-authority',
        component: ManagementAuthority
    },
    {
        //领导仓
        path:'/leader-warehouse',
        component:leaderWarehouse
    },
    {
        //备忘录
        path:'/Node-pad',
        component: NodePad
    }
]