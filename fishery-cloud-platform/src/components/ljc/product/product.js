module.exports = class {
    constructor(vue) {
        this.vue = vue;
    }

    /* 标签开始 */
    labels = {
        id: "产品编号",
        productName: "产品名称",
        germchitId: "种苗编号",
        processingFactoryId: "加工厂编号",
    }
    /* 标签结束 */

    /* 种苗编号初始值(有接口后删除)开始 */
    germchitIds = [
        {
            name: "蔬菜",
            id: "1111"
        },
        {
            name: "水果",
            id: "2222"
        }
    ]
    /* 种苗编号初始值(有接口后删除)结束 */

    /* 表单验证规则对象开始 */
    formRules = {
        productName: [
            { required: true, message: "请输入产品名称", trigger: "blur" },
            {
                min: 2,
                max: 10,
                message: "产品名称的长度在2~10个字符之间",
                trigger: "blur",
            },
        ],
        germchitId: [
            { required: true, message: "请输入原料", trigger: "blur" },
        ],
    }
    /* 表单验证规则对象结束 */


    /* 获取数据开始 */
    getAllInfo(id, page, size) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/processingFactory/product/factoryProduct/${id}/${page}/${size}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 获取数据结束 */

    /* 添加开始 */
    addInfo(addFrom) {
        return new Promise((resolve) => {
            this.vue.$plant.post("/processingFactory/product/", addFrom)
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
            this.vue.$plant.delete(`/processingFactory/product/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 删除结束 */
}