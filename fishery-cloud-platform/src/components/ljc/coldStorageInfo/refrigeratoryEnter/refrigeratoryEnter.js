module.exports = class {
    constructor(vue) {
        this.vue = vue;
    }
    /* 标签 */
    labels = {
        productId: "产品编号",
        productName: "产品名称",
        productWeight: "产品质量（kg）",
        suppliersSource: "产品供应商所属基地名称",
        supplierName: "产品供应商名称"
    }

    /* 表单验证规则对象 */
    formRules = {
        refrigeratoryId: [
            { required: true, message: `请输入${this.labels.refrigeratoryId}`, trigger: "blur" },
        ],
        warehousingPerson: [
            { required: true, message: `请输入${this.labels.warehousingPerson}`, trigger: "blur" },
        ],
        productWeight: [
            { required: true, message: `请输入${this.labels.productWeight}`, trigger: "blur" },
        ],
    }

    /* 获取数据开始 */
    getAllInfo(page, size) {
        return new Promise((resolve) => {
            this.vue.$storage.get(`/refrigeratoryEnter/in/${this.vue.$store.state.userInfo.baseId}/${page}/${size}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }

    // 添加产品入库
    addInfo(form) {
        return new Promise((resolve) => {
            this.vue.$storage.post(`/refrigeratoryEnter/inRefrigeratory`, form)
                .then((res) => {
                    resolve(res);
                })
        })
    }
}