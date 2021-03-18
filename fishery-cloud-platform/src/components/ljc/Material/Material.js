module.exports = class {
    constructor(vue) {
        this.vue = vue;
    }

    /* 标签开始 */
    labels = {
        id: "ID",
        // baseId: "基地ID",
        materialId: "原料ID",
        materialName: "原料名称",
        materialWeight: "原料质量/kg",
        supplierBase: "原料供应商所属基地名称",
        // processingFactoryId: "所属加工厂id",
        supplierName: "原料供应商名称",
    }
    /* 标签结束 */

    formRules = {
    }

    /* 获取数据开始 */
    getAllInfo(id, page, size) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/processing/material/${id}/${page}/${size}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 获取数据结束 */
}