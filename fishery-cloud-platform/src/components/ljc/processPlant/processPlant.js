module.exports = class {
    constructor(vue) {
        this.vue = vue;
    }
    /* 标签开始 */
    labels = {
        id: "加工厂编号",
        baseId: "基地ID",
        processingFactoryName: "名称",
        processingFactoryAddress: "地址",
        processingFactoryArea: "占地面积(㎡)",
        processingFactoryPositionLatitude: "厂家地址纬度",
        processingFactoryPositionLongitude: "厂家地址经度",
        processingType: "主营加工品类",
        createPersonId: "创建者编号",
        createPerson: "创建者"
    }
    /* 标签结束 */

    /* 表单验证规则对象开始 */
    formRules = {
        processingFactoryName: [
            { required: true, message: `请输入${this.labels.processingFactoryName}`, trigger: "blur" },
            {
                min: 2,
                max: 10,
                message: `${this.labels.processingFactoryName}的长度在2~10个字符之间`,
                trigger: "blur",
            },
        ],
        processingFactoryAddress: [
            { required: true, message: `请输入${this.labels.processingFactoryAddress}`, trigger: "blur" },
            {
                min: 2,
                message: `${this.labels.processingFactoryAddress}至少两个字符以上`,
                trigger: "blur",
            },
        ],
        createPersonId: [
            { required: true, message: `请输入创建者`, trigger: "blur" },
        ],
        processingFactoryArea: [
            { required: true, message: `请输入${this.labels.processingFactoryArea}`, trigger: "blur" },
        ],
        processingType: [
            { required: true, message: `请输入${this.labels.processingType}`, trigger: "blur" },
        ],
    }
    /* 表单验证规则对象结束 */


    /* 获取数据开始 */
    getAllInfo(baseId, pageNum, pageSize) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/processingFactory/factory/baseFactory/${baseId}/${pageNum}/${pageSize}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 获取数据结束 */

    /* 添加开始 */
    addInfo(addFrom) {
        return new Promise((resolve) => {
            this.vue.$plant.post("/processingFactory/factory/", addFrom)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 添加结束 */

    /* 根据ID查询信息开始 */
    getInfoById(id) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/processingFactory/factory/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 根据ID查询信息结束 */

    /* 修改开始 */
    editInfo(editForm) {
        return new Promise((resolve) => {
            this.vue.$plant.put(`/processingFactory/factory/`, editForm)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 修改结束 */
}