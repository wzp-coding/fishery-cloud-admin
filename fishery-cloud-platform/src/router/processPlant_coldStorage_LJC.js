import InfoProduct from '../views/InfoProduct.vue';
import ColdStorage from '../views/ColdStorage.vue';
import ProcessPlant from '../views/ProcessPlant.vue';
import InfoPlant from '../views/InfoPlant.vue';
import InfoCraft from '../views/InfoCraft.vue';
import ManagementInputsClassification from '../views/ManagementInputsClassification.vue';
export default [
    {
        // 产品信息
        path: '/info-product',
        component: InfoProduct
    },
    {
        // 冷库
        path: '/cold-storage',
        component: ColdStorage
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
        // 投入品分类管理
        path: '/management-inputs-classification',
        component: ManagementInputsClassification
    },
]