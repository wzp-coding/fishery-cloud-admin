module.exports = class {
    constructor(vue) {
        this.vue = vue;
    }

    /* 标签开始 */
    labels = {
        id: "投入品编号",
        inputExpireDate: "到期时间",
        inputName: "投入品名称",
        inputPicture: "投入品图片",
        inputProduceDate: "生产日期",
        inspector: "校验人",
        processingFactoryId: "加工厂编号",
        specification: "规格",
        supplierAddr: "供应商地址",
        supplierLicense: "供应商许可证",
        supplierName: "供应商名称",
        supplierPhone: "供应商电话"
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
        inputExpireDate: [
            { required: true, message: `请输入${this.labels.inputExpireDate}`, trigger: "blur" },
        ],
        inputPicture: [
            { required: true, message: `请输入${this.labels.inputPicture}`, trigger: "blur" },
        ],
        inputProduceDate: [
            { required: true, message: `请输入${this.labels.inputProduceDate}`, trigger: "blur" },
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
            this.vue.$plant.get(`/processingFactory/input/factoryInput/${id}/${page}/${size}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 获取数据结束 */

    /* 添加开始 */
    addInfo(addFrom) {
        return new Promise((resolve) => {
            this.vue.$plant.post("/processingFactory/input/", addFrom)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 添加结束 */

    /* 根据ID查询信息开始 */
    getInfoById(id) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/processingFactory/input/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 根据ID查询信息结束 */

    /* 修改开始 */
    editInfo(editForm) {
        return new Promise((resolve) => {
            this.vue.$plant.put(`/processingFactory/input/`, editForm)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 修改结束 */

    /* 删除开始 */
    removeById(id) {
        return new Promise((resolve) => {
            this.vue.$plant.delete(`/processingFactory/input/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 删除结束 */
}