module.exports = class {
    constructor(vue) {
        this.vue = vue;
    }
    /* 标签开始 */
    labels = {
        id: "入库Id",
        processingBaseId: "加工产品编号",
        productName: "产品名称",
        refrigeratoryId: "冷库Id",
        refrigeratoryInCapacity: "入库容量",
        refrigeratoryInDescription: "入库描述",
        refrigeratoryInTime: "入库时间",
        warehousingPersonId: "管理人员Id"
    }
    /* 标签结束 */

    /* 表单验证规则对象开始 */
    formRules = {
        refrigeratoryName: [
            { required: true, message: `请输入${this.labels.refrigeratoryName}`, trigger: "blur" },
            {
                min: 2,
                max: 10,
                message: `${this.labels.refrigeratoryName}的长度在2~10个字符之间`,
                trigger: "blur",
            },
        ],
        createPersonId: [
            { required: true, message: `请输入创建者`, trigger: "blur" },
        ],
        gmtCreate: [
            { required: true, message: `请输入${this.labels.gmtCreate}`, trigger: "blur" },
        ],
        refrigeratoryAddress: [
            { required: true, message: `请输入${this.labels.refrigeratoryAddress}`, trigger: "blur" },
        ],
        refrigeratoryIntroduce: [
            { required: true, message: `请输入${this.labels.refrigeratoryIntroduce}`, trigger: "blur" },
        ],
        refrigeratoryTemperature: [
            { required: true, message: `请输入${this.labels.refrigeratoryTemperaturel}`, trigger: "blur" },
        ],
        refrigeratoryCapacity: [
            { required: true, message: `请输入${this.labels.refrigeratoryCapacity}`, trigger: "blur" },
        ],
        refrigeratoryArea: [
            { required: true, message: `请输入${this.labels.refrigeratoryArea}`, trigger: "blur" },
        ],



    }
    /* 表单验证规则对象结束 */


    /* 获取数据开始 */
    getAllInfo(baseId, page, size) {
        return new Promise((resolve) => {
            this.vue.$storage.get(`/refrigeratory/RefrigeratoryInfo/get/PageRefrigeratoryByBaseId/${baseId}/${page}/${size}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 获取数据结束 */

    /* 添加开始 */
    addInfo(addFrom) {
        console.log(addFrom);
        return new Promise((resolve) => {
            this.vue.$storage.post("/refrigeratory/RefrigeratoryInfo/in", addFrom)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 添加结束 */

    /* 根据ID查询信息开始 */
    getInfoById(id) {
        return new Promise((resolve) => {
            this.vue.$storage.get(`/refrigeratory/RefrigeratoryInfo/get/Refrigeratory/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 根据ID查询信息结束 */

    /* 修改开始 */
    editInfo(editForm) {
        return new Promise((resolve) => {
            this.vue.$storage.put(`/refrigeratory/RefrigeratoryInfo/in`, editForm)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 修改结束 */
}