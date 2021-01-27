import InfoProduct from '../views/InfoProduct.vue';
import ProcessPlant from '../views/ProcessPlant.vue';
import InfoPlant from '../views/InfoPlant.vue';
import InfoCraft from '../views/InfoCraft.vue';
import InfoInput from '../views/InfoInput.vue';
import ManagementInputsClassification from '../views/ManagementInputsClassification.vue';
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