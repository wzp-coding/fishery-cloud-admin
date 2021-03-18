module.exports = class {
    constructor(vue) {
        this.vue = vue;
    }

    /* 标签开始 */
    labels = {
        id: "ID",
        jobId: "加工作业ID",
        weight: "重量",
    }
    /* 标签结束 */

    // 表单标签
    formLabels = {
        addressLatitude: "收货地址纬度",
        addressLongitude: "收货地址经度",
        amount: "数量",
        baseId: "基地ID",
        money: "金额(万元)",
        phoneNumber: "收货联系电话",
        productId: "产品编号",
        productName: "产品名",
        receiveAddress: "收货地址",
        targetId: "目标",
        targetName: "目标名",
        type: "目标类型",
        weight: "产品重量"
    }

    formRules = {
        jobDescription: [
            { required: true, message: `请输入${this.labels.jobDescription}`, trigger: "blur" },
        ],
    }

    /* 获取数据 */
    getAllInfo(id, page, size) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/processing/batch/${id}/${page}/${size}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }

    /* 根据ID查询信息 */
    getInfoById(id) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/processing/batch/before/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }

    /* 创建订单 */
    addOrder(form) {
        return new Promise((resolve) => {
            this.vue.$plant.put(`/processing/batch/order`, form)
                .then((res) => {
                    resolve(res);
                })
        })
    }



}