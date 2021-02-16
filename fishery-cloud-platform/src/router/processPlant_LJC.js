import InfoProduct from '../views/aquaculture_production/InfoProduct.vue';
import ProcessPlant from '../views/aquaculture_production/ProcessPlant.vue';
import InfoPlant from '../views/aquaculture_production/InfoPlant.vue';
import InfoCraft from '../views/aquaculture_production/InfoCraft.vue';
import InfoInput from '../views/aquaculture_production/InfoInput.vue';
import ManagementInputsClassification from '../views/management_base/ManagementInputsClassification.vue';
export default [
    {
        // 产品信息
        path: '/info-product',
        component: InfoProduct
    },
    {
        // 加工厂
        path: '/process-plant',
        component: ProcessPlant
    },
    {
        // 加工信息
        path: '/info-plant',
        component: InfoPlant
    },
    {
        // 加工产品的工艺信息
        path: '/info-craft',
        component: InfoCraft
    },
    {
        // 加工工艺的投入品信息
        path: "/info-input",
        component: InfoInput,
    },
    {
        // 投入品分类管理
        path: '/management-inputs-classification',
        component: ManagementInputsClassification
    },
]