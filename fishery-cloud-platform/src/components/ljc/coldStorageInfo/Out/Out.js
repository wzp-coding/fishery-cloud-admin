module.exports = class {
    constructor(vue) {
        this.vue = vue;
    }
    /* 标签开始 */
    labels = {
        id: "出库编号",
        productName: "产品名称",
        refrigeratoryId: "冷库Id",
        refrigeratoryInCapacity: "入库容量/kg",
        refrigeratoryInId: "入库编号",
        refrigeratoryOutCapacity: "出库容量/kg",
        refrigeratoryOutDescription: "出库描述",
        refrigeratoryOutTime: "出库时间",
        refrigeratory_product_id: "冷库产品编号",
        warehousingPersonId: "管理人员Id",
        refrigeratoryInUsedCapacity: "已用容量",
        surplusCapacity: "剩余容量"
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
        refrigeratoryOutCapacity: [
            { required: true, message: `请输入${this.labels.refrigeratoryOutCapacity}`, trigger: "blur" },
        ],
        refrigeratoryOutDescription: [
            { required: true, message: `请输入${this.labels.refrigeratoryOutDescription}`, trigger: "blur" },
        ],
        refrigeratoryOutTime: [
            { required: true, message: `请输入${this.labels.refrigeratoryOutTime}`, trigger: "blur" },
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
            this.vue.$storage.get(`/refrigeratoryOutInfo/selectPageInfoByRefrigeratoryId/${id}/${page}/${size}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 获取数据结束 */

    /* 添加开始 */
    addInfo(addFrom) {
        return new Promise((resolve) => {
            this.vue.$storage.post("/refrigeratoryOutInfo/in", addFrom)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 添加结束 */

    /* 根据ID查询信息开始 */
    getInfoByIdOut(id) {
        return new Promise((resolve) => {
            this.vue.$storage.get(`/refrigeratoryOutInfo/in/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 根据ID查询信息结束 */

    /* 根据入库ID查询信息开始 */
    getInfoById(id) {
        return new Promise((resolve) => {
            this.vue.$storage.get(`/refrigeratoryInInfo/in/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 根据入库ID查询信息结束 */



    /* 修改开始 */
    editInfo(editForm) {
        return new Promise((resolve) => {
            this.vue.$storage.put(`/refrigeratoryOutInfo/in`, editForm)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 修改结束 */
}