import DigitalBase from '../views/my_base/DigitalBase.vue'     //
import SeedPurchase from '../views/SeedPurchase.vue'    //
import InfoSeed from '../views/InfoSeed.vue'           //
import InfoCustomer from '../views/InfoCustomer.vue'   //客户管理
import InfoSupplies from '../views/InfoSupplies.vue'    //
import InfoBase from '../views/InfoBase.vue'
import InfoPond from '../views/InfoPond.vue'
import ManagementStaff from '../views/ManagementStaff.vue'      //
import ManagementSupplies from '../views/ManagementSupplies.vue'       //
import ManagementPond from '../views/ManagementPond.vue'    //
import ManagementAuthority from '../views/management_base/ManagementAuthority.vue'    //权限管理
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
    {
        // 池塘信息
        path: '/info-pond',
        component: InfoPond
    },
    {
        // 权限管理
        path: '/management-authority',
        component: ManagementAuthority
    }
]