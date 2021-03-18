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


}