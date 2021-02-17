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
        productName: [
            { required: true, message: `请输入${this.labels.productName}`, trigger: "blur" },
            {
                min: 2,
                max: 10,
                message: `${this.labels.productName}的长度在2~10个字符之间`,
                trigger: "blur",
            },
        ],
        refrigeratoryInCapacity: [
            { required: true, message: `请输入${this.labels.refrigeratoryInCapacity}`, trigger: "blur" },
        ],
        refrigeratoryInDescription: [
            { required: true, message: `请输入${this.labels.refrigeratoryInDescription}`, trigger: "blur" },
        ],
        refrigeratoryInTime: [
            { required: true, message: `请输入${this.labels.refrigeratoryInTime}`, trigger: "blur" },
        ],
        refrigeratoryTemperature: [
            { required: true, message: `请输入${this.labels.refrigeratoryTemperaturel}`, trigger: "blur" },
        ],
        warehousingPersonId: [
            { required: true, message: `请输入${this.labels.warehousingPersonId}`, trigger: "blur" },
        ],
    }
    /* 表单验证规则对象结束 */


    /* 获取数据开始 */
    getAllInfo(id, page, size) {
        return new Promise((resolve) => {
            this.vue.$storage.get(`/refrigeratoryInInfo/selectPageInfoByRefrigeratoryId/${id}/${page}/${size}`)
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
            this.vue.$storage.post("/refrigeratoryInInfo/in", addFrom)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 添加结束 */

    /* 根据ID查询信息开始 */
    getInfoById(id) {
        return new Promise((resolve) => {
            this.vue.$storage.get(`/refrigeratoryInInfo/in/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 根据ID查询信息结束 */

    /* 修改开始 */
    editInfo(editForm) {
        return new Promise((resolve) => {
            this.vue.$storage.put(`/refrigeratoryInInfo/in`, editForm)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 修改结束 */
}