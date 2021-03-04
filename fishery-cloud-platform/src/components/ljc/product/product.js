module.exports = class {
    constructor(vue) {
        this.vue = vue;
    }

    /* 标签开始 */
    labels = {
        id: "产品编号",
        productName: "产品名称",
        commodityId: "水产品/冷库产品编号 ",
        inventory: "库存/件",
        processingFactoryId: "加工厂编号",
    }
    /* 标签结束 */

    /* 表单验证规则对象 */
    formRules = {
        productName: [
            { required: true, message: `请输入${this.labels.productName}`, trigger: "blur" },
            {
                min: 2,
                max: 10,
                message: `${this.labels.productName}的长度在2~10个字符之间`,
                trigger: "blur",
            },
        ],
        commodityId: [
            { required: true, message: `请输入${this.labels.commodityId}`, trigger: "blur" },
        ],
        inventory: [
            { required: true, message: `请输入${this.labels.inventory}`, trigger: "blur" },
        ],
    }


    /* 获取数据开始 */
    getAllInfo(id, page, size) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/processingFactory/product/factoryProduct/${id}/${page}/${size}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 获取数据结束 */

    /* 添加开始 */
    addInfo(addFrom) {
        return new Promise((resolve) => {
            this.vue.$plant.post("/processingFactory/product/", addFrom)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 添加结束 */

    /* 根据ID查询信息开始 */
    getInfoById(id) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/processingFactory/product/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 根据ID查询信息结束 */

    /* 修改开始 */
    editInfo(editForm) {
        return new Promise((resolve) => {
            this.vue.$plant.put(`/processingFactory/product/`, editForm)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 修改结束 */
}