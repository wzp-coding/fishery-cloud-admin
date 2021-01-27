module.exports = class {
    constructor(vue) {
        this.vue = vue;
    }

    /* 标签开始 */
    labels = {
        id: "工艺编号",
        craftName: "工艺名称",
        craftDescription: "工艺描述",
        craftResponsible: "工艺负责人",
        craftTime: "工艺耗时/s",
        processingFactoryId: "所属工厂编号",
        sort: "排序"
    }
    /* 标签结束 */

    /* 表单验证规则对象开始 */
    formRules = {
        craftName: [
            { required: true, message: "请输入工艺名称", trigger: "blur" },
            {
                min: 2,
                max: 10,
                message: "工艺名称的长度在2~10个字符之间",
                trigger: "blur",
            },
        ],
        craftDescription: [
            { required: true, message: "请输入工艺描述", trigger: "blur" },
        ],
        craftResponsible: [
            { required: true, message: "请输入工艺负责人", trigger: "blur" },
        ],
        craftTime: [
            { required: true, message: "请输入工艺耗时", trigger: "blur" },
        ]
    }
    /* 表单验证规则对象结束 */


    /* 获取数据开始 */
    getAllInfo(id, page, size) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/processingFactory/craft/factoryCraft/${id}/${page}/${size}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 获取数据结束 */

    /* 添加开始 */
    addInfo(addFrom) {
        return new Promise((resolve) => {
            this.vue.$plant.post("/processingFactory/craft/", addFrom)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 添加结束 */

    /* 根据ID查询信息开始 */
    getInfoById(id) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/processingFactory/product/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 根据ID查询信息结束 */

    /* 修改开始 */
    editInfo(editForm) {
        return new Promise((resolve) => {
            this.vue.$plant.put(`/processingFactory/product/`, editForm)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 修改结束 */

    /* 删除开始 */
    removeById(id) {
        return new Promise((resolve) => {
            this.vue.$plant.delete(`/processingFactory/craft/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 删除结束 */
}