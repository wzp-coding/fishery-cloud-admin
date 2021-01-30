module.exports = class {
    constructor(vue) {
        this.vue = vue;
    }

    /* 标签开始 */
    labels = {
        id: "投入品编号",
        inputExpireDate: "到期时间",
        inputProduceDate: "生产日期",
        inputName: "投入品名称",
        inputPicture: "投入品图片",
        inspector: "校验人",
        processingFactoryId: "加工厂编号",
        specification: "规格(mm)",
        supplierName: "供应商名称",
        supplierAddr: "供应商地址",
        supplierPhone: "供应商电话",
        supplierLicense: "供应商许可证",
        validity: "有效期"
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


    /* 获取数据开始 */
    getAllInfo(id, page, size) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/processingFactory/input/craftInput/${id}/${page}/${size}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 获取数据结束 */

    /* 添加开始 */
    addInfo(addFrom) {
        return new Promise((resolve) => {
            this.vue.$plant.post(`/processingFactory/craft/${addFrom.craftId}/${addFrom.id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 添加结束 */

    /* 获取所有的投入品信息开始 */
    getInputInfo(id) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/processingFactory/input/factoryInput/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 获取所有的投入品信息结束 */
}