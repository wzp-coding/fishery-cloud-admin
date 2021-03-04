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

        amount: '数量',
        money: "金额(万元)",
        phoneNumber: " 收货联系电话",
        receiveAddress: "收货地址",
        refrigeratoryOutDescription: "购买留言",
        refrigeratoryOutTime: "出库时间",
        targetId: "目标",
        targetName: "客户名称 ",
        targetType: "客户类型",
        type: "目标的类型",
        warehousingPersonId: "管理人员id ",
        weight: " 产品重量",

    }
    /* 标签结束 */

    /* 表单验证规则对象开始 */
    formRules = {
        inputName: [
            { required: true, message: `请输入${this.labels.inputName}`, trigger: "blur" },
            {
                min: 2,
                max: 10,
                message: `${this.labels.inputName}的长度在2~10个字符之间`,
                trigger: "blur",
            },
        ],
        validity: [
            { required: true, message: `请输入${this.labels.validity}`, trigger: "blur" },
        ],
        inputPicture: [
            { required: true, message: `请输入${this.labels.inputPicture}`, trigger: "blur" },
        ],
        inspector: [
            { required: true, message: `请输入${this.labels.inspector}`, trigger: "blur" },
        ],
        specification: [
            { required: true, message: `请输入${this.labels.specification}`, trigger: "blur" },
        ],
        supplierAddr: [
            { required: true, message: `请输入${this.labels.supplierAddr}`, trigger: "blur" },
        ],
        supplierLicense: [
            { required: true, message: `请输入${this.labels.supplierLicense}`, trigger: "blur" },
        ],
        supplierName: [
            { required: true, message: `请输入${this.labels.supplierName}`, trigger: "blur" },
        ],
        supplierPhone: [
            { required: true, message: `请输入${this.labels.supplierPhone}`, trigger: "blur" },
        ],
    }
    /* 表单验证规则对象结束 */

    // 冷库创建订单
    orderStorage(form) {
        return new Promise((resolve) => {
            this.vue.$storage.post(`/refrigeratoryOutInfo/createOrder`, form)
                .then((res) => {
                    resolve(res);
                })
        })
    }

    // 加工厂创建订单
    orderPlant(form) {
        return new Promise((resolve) => {
            this.vue.$plant.put(`/processingFactory/product/order`, form)
                .then((res) => {
                    resolve(res);
                })
        })
    }
}