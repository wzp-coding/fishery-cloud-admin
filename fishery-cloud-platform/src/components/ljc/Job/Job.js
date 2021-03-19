module.exports = class {
    constructor(vue) {
        this.vue = vue;
    }

    /* 标签开始 */
    labels = {
        id: "加工作业id",
        materialId: "所用原料ID",
        materialWeight: "所用原料质量/kg",
        operatorName: "操作员姓名",
        // processingFactoryId: "所属加工厂id",
        productId: "生产产品id",
        productWeight: "成品预估质量/kg",
        jobDescription: "作业描述",
    }
    /* 标签结束 */

    formRules = {
        jobDescription: [
            { required: true, message: `请输入${this.labels.jobDescription}`, trigger: "blur" },
        ],
        materialId: [
            { required: true, message: `请输入${this.labels.materialId}`, trigger: "blur" },
        ],
        materialWeight: [
            { required: true, message: `请输入${this.labels.materialWeight}`, trigger: "blur" },
        ],
        operatorName: [
            { required: true, message: `请输入${this.labels.operatorName}`, trigger: "blur" },
        ],
        productId: [
            { required: true, message: `请输入${this.labels.productId}`, trigger: "blur" },
        ],
        productWeight: [
            { required: true, message: `请输入${this.labels.productWeight}`, trigger: "blur" },
        ],
    }

    /* 获取数据 */
    getAllInfo(id, page, size) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/processing/job/${id}/${page}/${size}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }

    /* 添加 */
    addInfo(addFrom) {
        return new Promise((resolve) => {
            this.vue.$plant.post("/processing/job/", addFrom)
                .then((res) => {
                    resolve(res);
                })
        })
    }

    /* 根据ID查询信息 */
    getInfoById(id) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/processing/job/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }

    /* 修改 */
    editInfo(editForm) {
        return new Promise((resolve) => {
            this.vue.$plant.put(`/processing/job/`, editForm)
                .then((res) => {
                    resolve(res);
                })
        })
    }

    /* 根据id获取原料 */
    getMaterial(id) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/processing/material/info/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
}