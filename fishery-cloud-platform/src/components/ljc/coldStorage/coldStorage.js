module.exports = class {
    constructor(vue) {
        this.vue = vue;
    }
    /* 标签开始 */
    labels = {
        baseId: "基地Id",
        refrigeratoryName: "冷库名称",
        createPersonId: "创建者Id",
        gmtCreate: "创建时间",
        gmtModified: "修改时间",
        id: "冷库Id",
        refrigeratoryArea: "冷库面积(平方米)",
        refrigeratoryAddress: "冷库地址",
        refrigeratoryIntroduce: "冷库介绍",
        refrigeratoryPositionLatitude: "冷库地址经度",
        refrigeratoryPositionLongitude: "冷库地址纬度",
        refrigeratoryTemperature: "冷库温度(度)",
        refrigeratoryUsedCapacity:　"冷库已用容量(kg)",
        refrigeratoryCapacity: "冷库总容量(kg)",
        
    }
    /* 标签结束 */

    /* 表单验证规则对象开始 */
    formRules = {
        // 冷库
        refrigeratoryName: [
            { required: true, message: `请输入${this.labels.refrigeratoryName}`, trigger: "blur" },
            {
                min: 2,
                max: 10,
                message: `${this.labels.refrigeratoryName}的长度在2~10个字符之间`,
                trigger: "blur",
            },
        ],
        // 创建者ID
        createPersonId: [
            { required: true, message: `请输入创建者`, trigger: "blur" },
        ],
        // 创建时间
        gmtCreate: [
            { required: true, message: `请输入${this.labels.gmtCreate}`, trigger: "blur" },
        ],
        // 冷库地址
        refrigeratoryAddress: [
            { required: true, message: `请输入${this.labels.refrigeratoryAddress}`, trigger: "blur" },
        ],
        // 冷库介绍
        refrigeratoryIntroduce: [
            { required: true, message: `请输入${this.labels.refrigeratoryIntroduce}`, trigger: "blur" },
        ],
        // 冷库容量
        refrigeratoryTemperature: [
            { required: true, message: `请输入${this.labels.refrigeratoryTemperaturel}`, trigger: "blur" },
        ],
        // 冷库温度
        refrigeratoryCapacity: [
            { required: true, message: `请输入${this.labels.refrigeratoryCapacity}`, trigger: "blur" },
        ],
        // 冷库面积
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