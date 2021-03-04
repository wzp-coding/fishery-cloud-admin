module.exports = class {
    constructor(vue) {
        this.vue = vue;
    }

    /* 标签开始 */
    labels = {
        gmtCreate: "创建时间",
        productName: "产品名",
        baseId: "基地编号 ",
        refrigeratoryInId: "入库编号id",
        addressLatitude: "收货地址纬度",
        addressLongitude: "收货地址经度",
        productId: "产品编号",
        status: "订单状态",
        phoneNumber: " 收货联系电话",
        receiveAddress: "收货地址",
        targetId: "客户",
        target: "客户",
        targetName: "客户名称 ",
        targetType: "客户类型",
        type: "客户类型",
        amount: '数量',
        money: "金额(万元)",
        refrigeratoryOutDescription: "购买留言",
        refrigeratoryOutTime: "出库时间",
        warehousingPersonId: "管理人员id ",
        weight: " 产品重量",

    }
    /* 标签结束 */

    /* 表单验证规则对象开始 */
    formRules = {
        targetId: [
            { required: true, message: `请输入${this.labels.targetId}`, trigger: "blur" },
        ],
        weight: [
            { required: true, message: `请输入${this.labels.weight}`, trigger: "blur" },
        ],
        warehousingPersonId: [
            { required: true, message: `请输入${this.labels.warehousingPersonId}`, trigger: "blur" },
        ],
        refrigeratoryOutDescription: [
            { required: true, message: `请输入${this.labels.refrigeratoryOutDescription}`, trigger: "blur" },
        ],
        money: [
            { required: true, message: `请输入${this.labels.money}`, trigger: "blur" },
        ],
        amount: [
            { required: true, message: `请输入${this.labels.amount}`, trigger: "blur" },
        ],
    }
    /* 表单验证规则对象结束 */

    // 冷库创建订单
    createOrder(form, tag) {
        return new Promise((resolve) => {
            if (tag == "storage") {
                this.vue.$storage.post(`/refrigeratoryOutInfo/createOrder`, form)
                    .then((res) => {
                        resolve(res);
                    })
            } else {
                this.vue.$plant.put(`/processingFactory/product/order`, form)
                    .then((res) => {
                        resolve(res);
                    })

            }
        })
    }
}