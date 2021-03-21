module.exports = class {
    constructor(vue) {
        this.vue = vue;
    }

    /* 标签 */
    labels = {
        amount: "数量",
        baseId: "基地编号",
        money: "金额（万元）",
        phoneNumber: "收货联系电话",
        productId: "产品编号",
        productName: "产品名",
        receiveAddress: "收货地址",
        sourceType: "发货方类型",
        targetId: "目标",
        targetName: "目标名称",
        targetType: "目标类型",
        weight: "产品重量"
    }

    /* 表单验证规则对象开始 */
    formRules = {
        target: [
            { required: true, message: `请输入客户`, trigger: "blur" },
        ],
        amount: [
            { required: true, message: `请输入${this.labels.amount}`, trigger: "blur" },
        ],
        money: [
            { required: true, message: `请输入${this.labels.money}`, trigger: "blur" },
        ],
        productId: [
            { required: true, message: `请输入${this.labels.productId}`, trigger: "blur" },
        ],
        productName: [
            { required: true, message: `请输入${this.labels.productName}`, trigger: "blur" },
        ],
        targetType: [
            { required: true, message: `请输入${this.labels.targetType}`, trigger: "blur" },
        ],
    }
    /* 表单验证规则对象结束 */

    // 冷库创建订单
    createOrder(form) {
        return new Promise((resolve) => {
            this.vue.$orderLjc.post(`/order`, form)
                .then((res) => {
                    resolve(res);
                })

        })
    }
}