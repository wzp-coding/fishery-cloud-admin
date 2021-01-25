module.exports = class {
    constructor(vue) {
        this.vue = vue;
    }
    /* 标签开始 */
    labels = {
        id: "加工厂编号",
        processingFactoryName: "加工厂名称",
        processingFactoryAddress: "加工厂地址",
        createPersonId: "创建者编号",
        createPerson: "创建者"
    }
    /* 标签结束 */

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

    /* 删除开始 */
    removeById(id) {
        return new Promise((resolve) => {
            this.vue.$plant.delete(`/processingFactory/factory/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 删除结束 */

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