module.exports = class {
    constructor(vue) {
        this.vue = vue;
    }
    /* 标签开始 */
    labels = {
        germchitId: "种苗编号",
        gmtCreate: "创建时间",
        gmtModified: "修改时间",
        id: "出入库编号id",
        refrigeratoryInDescription: "入库描述",
        refrigeratoryInTime: "入库时间",
        refrigeratoryOutDescription: "出库时间",
        refrigeratoryOutTime: "出库描述",
        refrigeratory_id: "冷库id",
        warehousingPersonId: "管理人员id"
    }
    /* 标签结束 */

    /* 表单验证规则对象开始 */
    formRules = {
        germchitId: [
            { required: true, message: `请输入${this.labels.germchitId}`, trigger: "blur" },
        ],
        gmtCreate: [
            { required: true, message: `请输入${this.labels.gmtCreate}`, trigger: "blur" },
        ],
        gmtModified: [
            { required: true, message: `请输入${this.labels.gmtModified}`, trigger: "blur" },
        ],
        refrigeratoryInDescription: [
            { required: true, message: `请输入${this.labels.refrigeratoryInDescription}`, trigger: "blur" },
        ],
        refrigeratoryInTime: [
            { required: true, message: `请输入${this.labels.refrigeratoryInTime}`, trigger: "blur" },
        ],
    }
    /* 表单验证规则对象结束 */


    /* 获取数据开始 */
    getAllInfo(id, page, size) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/refrigeratory/refrigeratoryAccessInfo/get/RefrigeratoryAccessInfoByrefrigeratoryId/${id}/${page}/${size}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 获取数据结束 */

    /* 添加开始 */
    addInfo(addFrom) {
        return new Promise((resolve) => {
            this.vue.$plant.post("/refrigeratory/refrigeratoryAccessInfo/in", addFrom)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 添加结束 */

    /* 根据ID查询信息开始 */
    getInfoById(id) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/refrigeratory/refrigeratoryAccessInfo/get/RefrigeratoryAccessInfo/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 根据ID查询信息结束 */

    /* 修改开始 */
    editInfo(editForm) {
        return new Promise((resolve) => {
            this.vue.$plant.put(`/refrigeratory/refrigeratoryAccessInfo/in`, editForm)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 修改结束 */
}