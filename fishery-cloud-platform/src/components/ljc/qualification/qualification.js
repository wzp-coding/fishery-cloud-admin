module.exports = class {
    constructor(vue) {
        this.vue = vue;
    }

    // 标签
    labels = {
        id: "产品资质编号",
        inspectionReport: "质检部门检验报告",
        license: "产品生产许可证 ",
        productInfo: "产品信息",
        productId: "产品编号",
        qualityCertificate: "质量管理体系认证书",
        safetyCertificate: "食品安全管理体系认证书",
        standard: "采用标准"
    }

    // 上传路径
    uploadUrl = "http://119.23.218.131:9103/base/file/upload"

    // 表单验证规则
    formRules = {
        inspectionReport: [
            { required: true, message: `请输入${this.labels.inspectionReport}`, trigger: "blur" },
        ],
        license: [
            { required: true, message: `请输入${this.labels.license}`, trigger: "blur" },
        ],
        productInfo: [
            { required: true, message: `请输入${this.labels.productInfo}`, trigger: "blur" },
        ],
        productId: [
            { required: true, message: `请输入${this.labels.productId}`, trigger: "blur" },
        ],
        qualityCertificate: [
            { required: true, message: `请输入${this.labels.qualityCertificate}`, trigger: "blur" },
        ],
        safetyCertificate: [
            { required: true, message: `请输入${this.labels.safetyCertificate}`, trigger: "blur" },
        ],
        standard: [
            { required: true, message: `请输入${this.labels.standard}`, trigger: "blur" },
        ],
    }

    /* 添加 */
    addInfo(addForm) {
        return new Promise((resolve) => {
            this.vue.$plant.post(`/processingFactory/qualification/`, addForm)
                .then((res) => {
                    resolve(res);
                })
        })
    }

    /* 修改 */
    editInfo(editForm) {
        return new Promise((resolve) => {
            this.vue.$plant.put(`/processingFactory/qualification/`, editForm)
                .then((res) => {
                    resolve(res);
                })
        })
    }

    /* 根据加工产品ID查询信息 */
    getInfoById(id) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/processingFactory/qualification/productQualification/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
}